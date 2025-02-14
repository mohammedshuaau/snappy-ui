import type { Meta, StoryObj } from '@storybook/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, useFieldArray, useFormContext } from './Form';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

const meta = {
    title: 'Form/Form',
    component: Form,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A flexible form component built on top of react-hook-form with built-in validation support.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        formOptions: {
            description: 'Form configuration options from react-hook-form',
            control: 'object',
            table: {
                type: {
                    summary: 'UseFormProps',
                    detail: 'Configuration options for react-hook-form including mode, defaultValues, resolver, etc.'
                },
            },
        },
        onSubmit: {
            description: 'Function called when the form is submitted with valid data',
            control: false,
            table: {
                type: { summary: '(data: TFieldValues) => void | Promise<void>' },
            },
        },
        onError: {
            description: 'Function called when form validation fails',
            control: false,
            table: {
                type: { summary: '(errors: FieldErrors<TFieldValues>) => void' },
            },
        },
        preventDefault: {
            description: 'Whether to prevent the default form submission',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        sx: {
            description: 'Custom styles using the sx prop',
            control: 'object',
            table: {
                type: { summary: 'object' },
            },
        },
        onInit: {
            description: 'Access to the form methods',
            control: false,
            table: {
                type: { summary: '(methods: UseFormReturn<TFieldValues, TContext>) => void' },
            },
        },
        children: {
            description: 'Render function that receives form methods or React nodes',
            control: false,
            table: {
                type: { summary: 'ReactNode | ((methods: UseFormReturn) => ReactNode)' },
            },
        },
    },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// Types for login form
interface LoginFormValues {
    email: string;
    password: string;
}

// Schema for login form
const loginSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

// Basic login form example with Yup validation
export const Default: Story = {
    render: () => (
        <Form<LoginFormValues>
            formOptions={{
                resolver: yupResolver(loginSchema),
                mode: 'onTouched',
            }}
            onSubmit={(data) => console.log('Form submitted:', data)}
            className="w-[400px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
            {({ formState: { errors } }) => (
                <>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
                        <p className="text-gray-600 dark:text-gray-400">Please enter your credentials</p>
                    </div>
                    <Input
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        required
                        error={errors.email?.message}
                    />
                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        required
                        error={errors.password?.message}
                    />
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </>
            )}
        </Form>
    ),
};

// Types for registration form
interface RegistrationFormValues {
    name: string;
    email: string;
    password: string;
    website?: string | null;
}

// Schema for registration form
const registrationSchema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain letters and numbers'),
    website: yup.string().url('Invalid URL').nullable(),
});

// Form with real-time validation and complex fields
export const WithValidation: Story = {
    render: () => {
        // Component to show password strength
        const PasswordStrength = () => {
            const { watch } = useFormContext<RegistrationFormValues>();
            const password = watch('password');

            const getStrength = (pass: string) => {
                if (!pass) return 0;
                let strength = 0;
                if (pass.length >= 8) strength += 1;
                if (/[A-Z]/.test(pass)) strength += 1;
                if (/[0-9]/.test(pass)) strength += 1;
                if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
                return strength;
            };

            const strength = getStrength(password || '');

            return (
                <div className="mt-1">
                    <div className="flex gap-1 h-1">
                        {[1, 2, 3, 4].map((level) => (
                            <div
                                key={level}
                                className={`flex-1 rounded-full transition-colors ${level <= strength
                                    ? 'bg-primary-500'
                                    : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {strength === 0 && 'Enter a password'}
                        {strength === 1 && 'Weak'}
                        {strength === 2 && 'Fair'}
                        {strength === 3 && 'Good'}
                        {strength === 4 && 'Strong'}
                    </p>
                </div>
            );
        };

        return (
            <Form<RegistrationFormValues>
                formOptions={{
                    resolver: yupResolver(registrationSchema),
                    mode: 'onTouched',
                }}
                onSubmit={(data) => console.log('Form submitted:', data)}
                className="w-[400px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
                {({ formState: { errors } }) => (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Register</h2>
                            <p className="text-gray-600 dark:text-gray-400">Create your account</p>
                        </div>
                        <Input
                            name="name"
                            label="Full Name"
                            placeholder="John Doe"
                            required
                            error={errors.name?.message}
                        />
                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="john@example.com"
                            required
                            error={errors.email?.message}
                        />
                        <div className="space-y-1">
                            <Input
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Create a password"
                                required
                                error={errors.password?.message}
                            />
                            <PasswordStrength />
                        </div>
                        <Input
                            name="website"
                            type="url"
                            label="Website"
                            placeholder="https://example.com"
                            helperText="Optional: Enter your website URL"
                            error={errors.website?.message}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </>
                )}
            </Form>
        );
    },
};

// Types for dynamic form
interface Contact {
    name: string;
    email: string;
}

interface ContactsFormValues {
    contacts: Contact[];
}

// Dynamic form with field array
export const DynamicForm: Story = {
    render: () => {
        const schema = yup.object({
            contacts: yup.array().of(
                yup.object({
                    name: yup.string().required('Name is required'),
                    email: yup.string().email('Invalid email').required('Email is required'),
                })
            ).required().min(1, 'Add at least one contact'),
        });

        return (
            <Form<ContactsFormValues>
                formOptions={{
                    resolver: yupResolver(schema),
                    defaultValues: {
                        contacts: [{ name: '', email: '' }],
                    },
                    mode: 'onTouched',
                }}
                onSubmit={(data) => console.log('Form submitted:', data)}
                className="w-[500px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
                {({ control, formState: { errors } }) => {
                    const { fields, append, remove } = useFieldArray({
                        control,
                        name: 'contacts',
                    });

                    return (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Contact List
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Add multiple contacts
                                </p>
                            </div>

                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="p-4 border rounded-lg relative">
                                        <Input
                                            name={`contacts.${index}.name`}
                                            label="Name"
                                            placeholder="Contact name"
                                            required
                                            error={errors.contacts?.[index]?.name?.message}
                                        />
                                        <Input
                                            name={`contacts.${index}.email`}
                                            label="Email"
                                            placeholder="Contact email"
                                            required
                                            error={errors.contacts?.[index]?.email?.message}
                                        />
                                        {fields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="absolute top-2 right-2"
                                                onClick={() => remove(index)}
                                            >
                                                ✕
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {errors.contacts?.root?.message && (
                                <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                                    {errors.contacts.root.message}
                                </p>
                            )}

                            <Button
                                type="button"
                                variant="outline"
                                className="mt-4 w-full"
                                onClick={() => append({ name: '', email: '' })}
                            >
                                Add Contact
                            </Button>

                            <Button type="submit" className="mt-4 w-full">
                                Save Contacts
                            </Button>
                        </>
                    );
                }}
            </Form>
        );
    },
}; 