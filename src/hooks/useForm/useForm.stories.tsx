import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import useForm from './useForm';

const meta = {
    title: 'Hooks/useForm',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A powerful React hook for form handling with built-in validation and state management.

### Features
- Form state management
- Field-level validation
- Custom validation rules
- Real-time validation
- Touched state tracking
- TypeScript support
- Form submission handling

### Usage

\`\`\`tsx
import { useForm } from '@mohammedshuaau/snappy-ui';

function RegistrationForm() {
    const { state, handleChange, handleBlur, handleSubmit, errors } = useForm({
        username: {
            initialValue: '',
            rules: [
                {
                    validate: (value) => value.length >= 3,
                    message: 'Username must be at least 3 characters'
                }
            ]
        },
        email: {
            initialValue: '',
            rules: [
                {
                    validate: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
                    message: 'Invalid email address'
                }
            ]
        },
        password: {
            initialValue: '',
            rules: [
                {
                    validate: (value) => value.length >= 8,
                    message: 'Password must be at least 8 characters'
                }
            ]
        }
    }, {
        validateOnChange: true,
        validateOnBlur: true
    });

    const onSubmit = (values) => {
        console.log('Form submitted:', values);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    name="username"
                    value={state.username.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.username && <span>{errors.username}</span>}
            </div>
            {/* Similar fields for email and password */}
            <button type="submit">Register</button>
        </form>
    );
}
\`\`\`

### API Reference

\`\`\`tsx
interface ValidationRule<T = any> {
    validate: (value: T) => boolean;
    message: string;
}

interface FieldConfig<T = any> {
    initialValue: T;
    rules?: ValidationRule[];
    required?: boolean;
    validate?: (value: T) => string | undefined;
}

interface FormConfig {
    [key: string]: FieldConfig;
}

interface UseFormOptions {
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    validateOnSubmit?: boolean;
}

function useForm<T extends FormConfig>(
    config: T,
    options?: UseFormOptions
): {
    state: FormState<T>;
    errors: { [K in keyof T]?: string };
    touched: { [K in keyof T]?: boolean };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleSubmit: (onSubmit: (values: { [K in keyof T]: T[K]['initialValue'] }) => void) => (e: React.FormEvent) => void;
    setFieldValue: (name: keyof T, value: any) => void;
    setFieldTouched: (name: keyof T, touched?: boolean) => void;
    resetForm: () => void;
    validateField: (name: keyof T) => string | undefined;
    validateForm: () => boolean;
}
\`\`\`

#### Parameters

- \`config\`: Form configuration object
  - Each key represents a field name
  - Each value is a FieldConfig object with:
    - \`initialValue\`: Initial field value
    - \`rules\`: Array of validation rules
    - \`required\`: Whether the field is required
    - \`validate\`: Custom validation function
- \`options\`: Form options
  - \`validateOnChange\`: Validate on change events
  - \`validateOnBlur\`: Validate on blur events
  - \`validateOnSubmit\`: Validate all fields on submit

#### Returns

- \`state\`: Current form state
- \`errors\`: Form validation errors
- \`touched\`: Fields touched state
- \`handleChange\`: Change event handler
- \`handleBlur\`: Blur event handler
- \`handleSubmit\`: Submit event handler
- \`setFieldValue\`: Set field value manually
- \`setFieldTouched\`: Set field touched state
- \`resetForm\`: Reset form to initial state
- \`validateField\`: Validate single field
- \`validateForm\`: Validate entire form
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DemoComponent: React.FC = () => {
    const {
        formState,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
        isValid,
        isDirty,
    } = useForm(
        {
            username: {
                initialValue: '',
                required: true,
                rules: [
                    {
                        validate: (value: string) => value.length >= 3,
                        message: 'Username must be at least 3 characters',
                    },
                ],
            },
            email: {
                initialValue: '',
                required: true,
                validate: (value: string) => {
                    if (!value.includes('@')) return 'Invalid email format';
                    return undefined;
                },
            },
            age: {
                initialValue: '',
                rules: [
                    {
                        validate: (value: string) => parseInt(value) >= 18,
                        message: 'Must be 18 or older',
                    },
                ],
            },
        },
        { validateOnBlur: true }
    );

    const onSubmit = (values: any) => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Registration Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        value={formState.username.value}
                        onChange={(e) => handleChange('username', e.target.value)}
                        onBlur={() => handleBlur('username')}
                        className={`
                            mt-1 block w-full rounded-md border-gray-300 shadow-sm
                            focus:border-blue-500 focus:ring-blue-500
                            ${formState.username.error ? 'border-red-500' : ''}
                        `}
                    />
                    {formState.username.error && (
                        <p className="mt-1 text-sm text-red-600">
                            {formState.username.error}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formState.email.value}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`
                            mt-1 block w-full rounded-md border-gray-300 shadow-sm
                            focus:border-blue-500 focus:ring-blue-500
                            ${formState.email.error ? 'border-red-500' : ''}
                        `}
                    />
                    {formState.email.error && (
                        <p className="mt-1 text-sm text-red-600">
                            {formState.email.error}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Age
                    </label>
                    <input
                        type="number"
                        value={formState.age.value}
                        onChange={(e) => handleChange('age', e.target.value)}
                        onBlur={() => handleBlur('age')}
                        className={`
                            mt-1 block w-full rounded-md border-gray-300 shadow-sm
                            focus:border-blue-500 focus:ring-blue-500
                            ${formState.age.error ? 'border-red-500' : ''}
                        `}
                    />
                    {formState.age.error && (
                        <p className="mt-1 text-sm text-red-600">
                            {formState.age.error}
                        </p>
                    )}
                </div>

                <div className="flex justify-between items-center pt-4">
                    <div className="text-sm text-gray-500">
                        <p>Valid: {isValid ? '✅' : '❌'}</p>
                        <p>Dirty: {isDirty ? '✅' : '❌'}</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            type="button"
                            onClick={reset}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export const Default: Story = {
    render: () => <DemoComponent />,
};

const ValidateOnChangeDemoComponent: React.FC = () => {
    const { formState, handleChange, handleSubmit, reset } = useForm(
        {
            password: {
                initialValue: '',
                required: true,
                rules: [
                    {
                        validate: (value: string) => value.length >= 8,
                        message: 'Password must be at least 8 characters',
                    },
                    {
                        validate: (value: string) => /[A-Z]/.test(value),
                        message: 'Password must contain an uppercase letter',
                    },
                    {
                        validate: (value: string) => /[0-9]/.test(value),
                        message: 'Password must contain a number',
                    },
                ],
            },
        },
        { validateOnChange: true }
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Password Validation</h2>
            <form onSubmit={handleSubmit(console.log)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        value={formState.password.value}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className={`
                            mt-1 block w-full rounded-md border-gray-300 shadow-sm
                            focus:border-blue-500 focus:ring-blue-500
                            ${formState.password.error ? 'border-red-500' : ''}
                        `}
                    />
                    {formState.password.error && (
                        <p className="mt-1 text-sm text-red-600">
                            {formState.password.error}
                        </p>
                    )}
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={reset}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export const ValidateOnChange: Story = {
    render: () => <ValidateOnChangeDemoComponent />,
}; 