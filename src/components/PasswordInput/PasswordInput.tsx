import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { useFormContext } from 'react-hook-form';

const passwordInputVariants = cva(
    'w-full rounded-md border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:border-primary-500 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-primary-400 dark:focus:ring-primary-400',
                error:
                    'border-red-500 bg-white text-slate-900 placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-red-400 dark:focus:ring-red-400',
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
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const strengthIndicatorVariants = cva('h-1 rounded-full transition-all duration-300', {
    variants: {
        strength: {
            0: 'bg-gray-200 dark:bg-gray-700',
            1: 'bg-red-500',
            2: 'bg-orange-500',
            3: 'bg-yellow-500',
            4: 'bg-green-500',
        },
    },
    defaultVariants: {
        strength: 0,
    },
});

export interface PasswordInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof passwordInputVariants> {
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
     * Show password strength indicator
     */
    showStrength?: boolean;
    /**
     * Custom function to calculate password strength (0-4)
     */
    strengthCheck?: (password: string) => number;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    (
        {
            className,
            variant,
            size,
            label,
            helperText,
            name,
            sx,
            showStrength = false,
            strengthCheck,
            onChange,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const [strength, setStrength] = React.useState(0);

        const formContext = useFormContext();
        const isFormField = formContext && name;

        const fieldState = isFormField ? formContext.getFieldState(name, formContext.formState) : null;
        const hasError = Boolean(fieldState?.error);
        const errorMessage = fieldState?.error?.message;

        const inputClassName = sx ? `password-input-${Math.random().toString(36).slice(2, 11)}` : '';
        const registerProps = isFormField ? formContext.register(name) : {};

        const calculateStrength = (password: string) => {
            if (strengthCheck) {
                return strengthCheck(password);
            }

            if (!password) return 0;

            let score = 0;
            // Length check
            if (password.length >= 8) score++;
            // Uppercase check
            if (/[A-Z]/.test(password)) score++;
            // Numbers check
            if (/[0-9]/.test(password)) score++;
            // Special characters check
            if (/[^A-Za-z0-9]/.test(password)) score++;

            return score;
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (showStrength) {
                setStrength(calculateStrength(e.target.value));
            }

            if (onChange) {
                onChange(e);
            }
        };

        const togglePassword = () => {
            setShowPassword(!showPassword);
        };

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
                        className={labelVariants({ variant: hasError ? 'error' : variant })}
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        id={name}
                        type={showPassword ? 'text' : 'password'}
                        className={twMerge(
                            passwordInputVariants({ variant: hasError ? 'error' : variant, size }),
                            'pr-10',
                            inputClassName,
                            className
                        )}
                        aria-describedby={helperText ? `${name}-description` : undefined}
                        aria-invalid={hasError}
                        onChange={handleChange}
                        {...registerProps}
                        {...props}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={togglePassword}
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                                <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                            </svg>
                        )}
                    </button>
                </div>
                {showStrength && (
                    <div className="mt-1.5 space-y-1">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={twMerge(
                                        'flex-1',
                                        strengthIndicatorVariants({
                                            strength: (level <= strength ? level : 0) as 0 | 1 | 2 | 3 | 4
                                        })
                                    )}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {strength === 0 && 'Enter a password'}
                            {strength === 1 && 'Weak'}
                            {strength === 2 && 'Fair'}
                            {strength === 3 && 'Good'}
                            {strength === 4 && 'Strong'}
                        </p>
                    </div>
                )}
                {(helperText || hasError) && (
                    <p
                        id={`${name}-description`}
                        className={helperTextVariants({ variant: hasError ? 'error' : variant })}
                    >
                        {errorMessage || helperText}
                    </p>
                )}
            </div>
        );
    }
);

PasswordInput.displayName = 'PasswordInput'; 