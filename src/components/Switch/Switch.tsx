import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

// Type for sx prop
type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

const switchVariants = cva(
    [
        // Base styles
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        // Transition
        'transition-colors duration-200 ease-in-out',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-slate-200',
                    'hover:bg-slate-300',
                    'focus:ring-primary-500',
                    'data-[state=checked]:bg-primary-600 data-[state=checked]:hover:bg-primary-700',
                    'dark:bg-slate-700',
                    'dark:hover:bg-slate-600',
                    'dark:data-[state=checked]:bg-primary-500 dark:data-[state=checked]:hover:bg-primary-600',
                ],
                error: [
                    'bg-red-100',
                    'hover:bg-red-200',
                    'focus:ring-red-500',
                    'data-[state=checked]:bg-red-600 data-[state=checked]:hover:bg-red-700',
                    'dark:bg-red-900/40',
                    'dark:hover:bg-red-900/60',
                    'dark:data-[state=checked]:bg-red-500 dark:data-[state=checked]:hover:bg-red-600',
                ],
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const thumbVariants = cva(
    [
        'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0',
        'transition duration-200 ease-in-out',
        'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
    ],
    {
        variants: {
            variant: {
                default: [],
                error: [],
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface SwitchProps
    extends Omit<React.InputHTMLAttributes<HTMLButtonElement>, 'type' | 'role' | 'aria-checked' | 'onChange'>,
    VariantProps<typeof switchVariants> {
    /** Label for the switch */
    label?: string;
    /** Description text to display below the label */
    description?: string;
    /** Error message to display */
    error?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Whether the switch is checked */
    checked?: boolean;
    /** Default checked state */
    defaultChecked?: boolean;
    /** Callback when the switch state changes */
    onChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
    ({
        className,
        variant,
        label,
        description,
        error,
        required,
        disabled,
        checked,
        defaultChecked,
        onChange,
        sx,
        ...props
    }, ref) => {
        // Generate a unique ID for the switch
        const id = React.useId();
        const switchClassName = `switch-${Math.random().toString(36).slice(2, 11)}`;

        // Controlled/uncontrolled state handling
        const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);
        const checkedState = checked ?? isChecked;

        // Handle state changes
        const handleToggle = () => {
            if (disabled) return;
            if (onChange) {
                onChange(!checkedState);
            }
            if (checked === undefined) {
                setIsChecked(!isChecked);
            }
        };

        // Convert sx prop to style object
        const generateStyles = () => {
            if (!sx) return { base: {}, pseudo: {} };

            const baseStyles: React.CSSProperties = {};
            const pseudoStyles: { [key: string]: React.CSSProperties } = {};

            Object.entries(sx).forEach(([key, value]) => {
                if (key.startsWith('&')) {
                    pseudoStyles[key] = value as React.CSSProperties;
                } else {
                    (baseStyles as any)[key] = value;
                }
            });

            return {
                base: baseStyles,
                pseudo: pseudoStyles,
            };
        };

        const styles = generateStyles();

        return (
            <div className="relative flex items-start">
                {/* Style tag for custom styles */}
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${switchClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${switchClassName}${selector.slice(1)} {
                                        ${Object.entries(rules)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}

                <div className="flex h-6 items-center">
                    <button
                        type="button"
                        role="switch"
                        ref={ref}
                        id={id}
                        disabled={disabled}
                        aria-checked={checkedState}
                        aria-invalid={!!error}
                        aria-required={required}
                        data-state={checkedState ? 'checked' : 'unchecked'}
                        onClick={handleToggle}
                        className={twMerge(
                            switchVariants({ variant: error ? 'error' : variant }),
                            switchClassName,
                            className
                        )}
                        style={styles.base}
                        {...props}
                    >
                        <span
                            className={thumbVariants({ variant: error ? 'error' : variant })}
                            data-state={checkedState ? 'checked' : 'unchecked'}
                        />
                    </button>
                </div>
                {(label || description || error) && (
                    <div className="ml-3 text-sm">
                        {label && (
                            <label
                                htmlFor={id}
                                className={twMerge(
                                    'font-medium text-slate-900 dark:text-slate-100',
                                    disabled && 'opacity-50 cursor-not-allowed'
                                )}
                            >
                                {label}
                                {required && <span className="ml-1 text-red-500">*</span>}
                            </label>
                        )}
                        {description && (
                            <p className={twMerge(
                                'text-slate-500 dark:text-slate-400',
                                disabled && 'opacity-50'
                            )}>
                                {description}
                            </p>
                        )}
                        {error && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                {error}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Switch.displayName = 'Switch'; 