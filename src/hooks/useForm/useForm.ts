import {useCallback, useState} from 'react';

export type ValidationRule<T = any> = {
    /**
     * Validation function
     */
    validate: (value: T) => boolean;
    /**
     * Error message to display
     */
    message: string;
};

export type FieldConfig<T = any> = {
    /**
     * Initial value
     */
    initialValue: T;
    /**
     * Validation rules
     */
    rules?: ValidationRule[];
    /**
     * Whether the field is required
     */
    required?: boolean;
    /**
     * Custom validation function
     */
    validate?: (value: T) => string | undefined;
};

export type FormConfig = {
    [key: string]: FieldConfig;
};

export type FormState<T extends FormConfig> = {
    [K in keyof T]: {
        value: T[K]['initialValue'];
        error?: string;
        touched: boolean;
    };
};

export interface UseFormOptions {
    /**
     * Whether to validate on change
     */
    validateOnChange?: boolean;
    /**
     * Whether to validate on blur
     */
    validateOnBlur?: boolean;
    /**
     * Whether to validate all fields on submit
     */
    validateOnSubmit?: boolean;
}

/**
 * Hook for form state management and validation
 * @param config Form configuration
 * @param options Hook options
 * @returns Form state and handlers
 */
const useForm = <T extends FormConfig>(
    config: T,
    options: UseFormOptions = {}
) => {
    const {
        validateOnChange = false,
        validateOnBlur = true,
        validateOnSubmit = true,
    } = options;

    // Initialize form state
    const initialState = Object.entries(config).reduce(
        (acc, [key, field]) => ({
            ...acc,
            [key]: {
                value: field.initialValue,
                touched: false,
            },
        }),
        {} as FormState<T>
    );

    const [formState, setFormState] = useState<FormState<T>>(initialState);

    // Validate a single field
    const validateField = useCallback(
        (name: keyof T, value: any): string | undefined => {
            const field = config[name];
            
            if (field.required && !value) {
                return 'This field is required';
            }

            if (field.rules) {
                for (const rule of field.rules) {
                    if (!rule.validate(value)) {
                        return rule.message;
                    }
                }
            }

            if (field.validate) {
                return field.validate(value);
            }

            return undefined;
        },
        [config]
    );

    // Handle field change
    const handleChange = useCallback(
        (name: keyof T, value: any) => {
            setFormState(prev => ({
                ...prev,
                [name]: {
                    value,
                    touched: true,
                    error: validateOnChange ? validateField(name, value) : prev[name].error,
                },
            }));
        },
        [validateOnChange, validateField]
    );

    // Handle field blur
    const handleBlur = useCallback(
        (name: keyof T) => {
            if (!validateOnBlur) return;

            setFormState(prev => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    touched: true,
                    error: validateField(name, prev[name].value),
                },
            }));
        },
        [validateOnBlur, validateField]
    );

    // Validate all fields
    const validateForm = useCallback(() => {
        const newState = { ...formState };
        let isValid = true;

        for (const name in config) {
            const error = validateField(name, formState[name].value);
            newState[name] = {
                ...newState[name],
                error,
                touched: true,
            };
            if (error) isValid = false;
        }

        setFormState(newState);
        return isValid;
    }, [config, formState, validateField]);

    // Handle form submission
    const handleSubmit = useCallback(
        (onSubmit: (values: { [K in keyof T]: T[K]['initialValue'] }) => void) => {
            return (e: React.FormEvent) => {
                e.preventDefault();

                if (validateOnSubmit && !validateForm()) {
                    return;
                }

                const values = Object.entries(formState).reduce(
                    (acc, [key, field]) => ({
                        ...acc,
                        [key]: field.value,
                    }),
                    {} as { [K in keyof T]: T[K]['initialValue'] }
                );

                onSubmit(values);
            };
        },
        [formState, validateOnSubmit, validateForm]
    );

    // Reset form to initial state
    const reset = useCallback(() => {
        setFormState(initialState);
    }, [initialState]);

    return {
        formState,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
        validateForm,
        isValid: !Object.values(formState).some(field => field.error),
        isDirty: Object.values(formState).some(field => field.touched),
    };
};

export default useForm; 