import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { useFormContext } from 'react-hook-form';

const inputVariants = cva(
    'w-full rounded-md border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:border-primary-500 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-primary-400 dark:focus:ring-primary-400',
                error:
                    'border-red-500 bg-white text-slate-900 placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-red-400 dark:focus:ring-red-400',
                success:
                    'border-green-500 bg-white text-slate-900 placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500 dark:border-green-500 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-green-400 dark:focus:ring-green-400',
            },
            size: {
                default: 'h-10 px-3 py-2',
                sm: 'h-8 px-2 py-1 text-xs',
                lg: 'h-12 px-4 py-3 text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const labelVariants = cva('block text-sm font-medium mb-1.5', {
    variants: {
        variant: {
            default: 'text-slate-700 dark:text-slate-200',
            error: 'text-red-500 dark:text-red-400',
            success: 'text-green-500 dark:text-green-400',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const helperTextVariants = cva('text-xs mt-1.5', {
    variants: {
        variant: {
            default: 'text-slate-500 dark:text-slate-400',
            error: 'text-red-500 dark:text-red-400',
            success: 'text-green-500 dark:text-green-400',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
    /**
     * The label for the input
     */
    label?: string;
    /**
     * Helper text to be displayed below the input
     */
    helperText?: string;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Icon to be displayed on the left side of the input
     */
    leftIcon?: React.ReactNode;
    /**
     * Icon to be displayed on the right side of the input
     */
    rightIcon?: React.ReactNode;
    /**
     * Error message to display below the input
     */
    error?: string;
    /**
     * Success message to display below the input
     */
    success?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = 'text',
            variant,
            size,
            label,
            helperText,
            name,
            sx,
            leftIcon,
            rightIcon,
            error,
            success,
            ...props
        },
        ref
    ) => {
        // Get form context if available
        const formContext = useFormContext();
        const isFormField = formContext && name;

        // Get field state from form context
        const fieldState = isFormField ? formContext.getFieldState(name, formContext.formState) : null;
        const formError = fieldState?.error?.message;

        // Determine the variant based on error/success states
        const inputVariant = error ? 'error' : success ? 'success' : variant;

        // Get the message to display (prioritize form error over prop error)
        const displayMessage = formError || error || success || helperText;

        // Generate a unique class name for custom styles
        const inputClassName = sx ? `input-${Math.random().toString(36).slice(2, 11)}` : '';

        // Register field with form if available
        const registerProps = isFormField ? formContext.register(name) : {};

        return (
            <div className="w-full">
                {sx && (
                    <style>
                        {`
                            .${inputClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                {label && (
                    <label
                        htmlFor={name}
                        className={labelVariants({ variant: inputVariant })}
                    >
                        {label}
                        {props.required && (
                            <span className="ml-1 text-red-500 dark:text-red-400" aria-hidden="true">
                                *
                            </span>
                        )}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={name}
                        type={type}
                        className={twMerge(
                            inputVariants({ variant: inputVariant, size }),
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            inputClassName,
                            className
                        )}
                        aria-describedby={displayMessage ? `${name}-description` : undefined}
                        aria-invalid={Boolean(error || formError)}
                        aria-required={props.required}
                        {...registerProps}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {displayMessage && (
                    <p
                        id={`${name}-description`}
                        className={helperTextVariants({ variant: inputVariant })}
                    >
                        {displayMessage}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';