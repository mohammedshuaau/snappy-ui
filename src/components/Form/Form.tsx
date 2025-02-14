import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
    useForm,
    FormProvider,
    UseFormProps,
    FieldValues,
    UseFormReturn,
    SubmitHandler,
    SubmitErrorHandler
} from 'react-hook-form';

type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError' | 'children'>;

export interface FormProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
> extends BaseFormProps {
    /**
     * Form configuration options from react-hook-form
     */
    formOptions?: UseFormProps<TFieldValues, TContext>;
    /**
     * Function called when the form is submitted with valid data
     */
    onSubmit?: SubmitHandler<TFieldValues>;
    /**
     * Function called when form validation fails
     */
    onError?: SubmitErrorHandler<TFieldValues>;
    /**
     * Whether to prevent the default form submission
     * @default true
     */
    preventDefault?: boolean;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Access to the form methods
     */
    onInit?: (methods: UseFormReturn<TFieldValues, TContext>) => void;
    /**
     * Render function that receives form methods or React nodes
     */
    children?: React.ReactNode | ((methods: UseFormReturn<TFieldValues, TContext>) => React.ReactNode);
}

export const Form = Object.assign(
    React.forwardRef(
        <TFieldValues extends FieldValues = FieldValues, TContext = any>(
            {
                className,
                formOptions,
                onSubmit,
                onError,
                preventDefault = true,
                sx,
                children,
                onInit,
                ...props
            }: FormProps<TFieldValues, TContext>,
            ref: React.Ref<HTMLFormElement>
        ) => {
            // Initialize form with react-hook-form
            const methods = useForm<TFieldValues, TContext>({
                ...formOptions,
                mode: formOptions?.mode || 'onTouched' // Set default mode to onTouched for better UX
            });

            // Call onInit with form methods if provided
            React.useEffect(() => {
                onInit?.(methods);
            }, [methods, onInit]);

            // Generate a unique class name for custom styles
            const formClassName = sx ? `form-${Math.random().toString(36).slice(2, 11)}` : '';

            return (
                <>
                    {sx && (
                        <style>
                            {`
                                .${formClassName} {
                                    ${Object.entries(sx)
                                    .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                    .join('\n')}
                                }
                            `}
                        </style>
                    )}
                    <FormProvider {...methods}>
                        <form
                            ref={ref}
                            onSubmit={methods.handleSubmit(onSubmit || (() => { }), onError)}
                            className={twMerge('space-y-4', formClassName, className)}
                            noValidate={preventDefault}
                            {...props}
                        >
                            {typeof children === 'function' ? children(methods) : children}
                        </form>
                    </FormProvider>
                </>
            );
        }
    ),
    { displayName: 'Form' }
) as <TFieldValues extends FieldValues = FieldValues, TContext = any>(
    props: FormProps<TFieldValues, TContext> & { ref?: React.Ref<HTMLFormElement> }
) => React.ReactElement;

// Re-export useful hooks and types from react-hook-form
export {
    useForm,
    useFormContext,
    useFieldArray,
    useWatch,
    useFormState,
    useController,
} from 'react-hook-form'; 