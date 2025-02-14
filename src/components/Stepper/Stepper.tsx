import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

const stepperVariants = cva(
    [
        'w-full',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                horizontal: 'flex flex-row items-center',
                vertical: 'flex flex-col items-start gap-4',
            },
            size: {
                sm: 'text-sm',
                md: 'text-base',
                lg: 'text-lg',
            },
        },
        defaultVariants: {
            variant: 'horizontal',
            size: 'md',
        },
    }
);

const stepVariants = cva(
    [
        'relative flex items-center',
        'group',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                horizontal: 'flex-1',
                vertical: 'w-full',
            },
            status: {
                pending: '',
                current: '',
                completed: '',
            },
        },
        defaultVariants: {
            variant: 'horizontal',
            status: 'pending',
        },
    }
);

const stepIconVariants = cva(
    [
        'flex items-center justify-center',
        'rounded-full',
        'transition-colors duration-200',
        'z-10',
    ],
    {
        variants: {
            size: {
                sm: 'w-6 h-6 text-xs',
                md: 'w-8 h-8 text-sm',
                lg: 'w-10 h-10 text-base',
            },
            status: {
                pending: [
                    'bg-slate-100 text-slate-600',
                    'dark:bg-slate-800 dark:text-slate-400',
                ],
                current: [
                    'bg-primary-100 text-primary-600 ring-2 ring-primary-500 ring-offset-2',
                    'dark:bg-primary-900/20 dark:text-primary-400 dark:ring-primary-400',
                ],
                completed: [
                    'bg-primary-600 text-white',
                    'dark:bg-primary-400 dark:text-slate-900',
                ],
            },
        },
        defaultVariants: {
            size: 'md',
            status: 'pending',
        },
    }
);

const stepConnectorVariants = cva(
    [
        'flex-1 transition-colors duration-200',
    ],
    {
        variants: {
            variant: {
                horizontal: 'h-[1px] mx-4',
                vertical: 'w-[1px] absolute h-full left-4 top-8 ml-[15px]',
            },
            status: {
                pending: [
                    'bg-slate-200',
                    'dark:bg-slate-700',
                ],
                completed: [
                    'bg-primary-600',
                    'dark:bg-primary-400',
                ],
            },
        },
        defaultVariants: {
            variant: 'horizontal',
            status: 'pending',
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface StepItem {
    /** Label for the step */
    label: string;
    /** Optional description */
    description?: string;
    /** Optional icon to override the default number */
    icon?: React.ReactNode;
    /** Optional content for the step */
    content?: React.ReactNode;
}

export interface StepperProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof stepperVariants> {
    /** Array of step items */
    steps: StepItem[];
    /** Current active step (0-based) */
    activeStep: number;
    /** Whether to show step numbers */
    showStepNumbers?: boolean;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
    ({
        className,
        variant,
        size,
        steps,
        activeStep,
        showStepNumbers = true,
        sx,
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const stepperClassName = `stepper-${Math.random().toString(36).slice(2, 11)}`;

        // Convert sx prop to style object
        const styles = sx ? {
            base: Object.entries(sx).reduce((acc, [key, value]) => {
                if (!key.startsWith('&')) {
                    acc[key] = value;
                }
                return acc;
            }, {} as Record<string, unknown>),
            pseudo: Object.entries(sx).reduce((acc, [key, value]) => {
                if (key.startsWith('&')) {
                    acc[key] = value;
                }
                return acc;
            }, {} as Record<string, unknown>),
        } : { base: {}, pseudo: {} };

        const getStepStatus = (index: number) => {
            if (index < activeStep) return 'completed';
            if (index === activeStep) return 'current';
            return 'pending';
        };

        const CheckIcon = () => (
            <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                />
            </svg>
        );

        return (
            <>
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${stepperClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${stepperClassName}${selector.slice(1)} {
                                        ${Object.entries(rules as Record<string, unknown>)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    className={twMerge(stepperVariants({ variant, size }), stepperClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                >
                    {steps.map((step, index) => {
                        const status = getStepStatus(index);
                        const isLast = index === steps.length - 1;

                        return (
                            <div
                                key={index}
                                className={stepVariants({ variant, status })}
                            >
                                <div className="flex items-center">
                                    <div
                                        className={stepIconVariants({ size, status })}
                                        aria-current={status === 'current' ? 'step' : undefined}
                                    >
                                        {status === 'completed' ? (
                                            <CheckIcon />
                                        ) : step.icon || (showStepNumbers && (index + 1))}
                                    </div>
                                    {!isLast && (
                                        <div
                                            className={stepConnectorVariants({
                                                variant,
                                                status: status === 'completed' ? 'completed' : 'pending',
                                            })}
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                                <div className={variant === 'vertical' ? 'ml-4 mt-2' : 'absolute top-10 left-0 w-full text-center'}>
                                    <div className="font-medium text-slate-900 dark:text-white">
                                        {step.label}
                                    </div>
                                    {step.description && (
                                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            {step.description}
                                        </div>
                                    )}
                                </div>
                                {variant === 'vertical' && step.content && status === 'current' && (
                                    <div className="ml-4 mt-4">
                                        {step.content}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
);

Stepper.displayName = 'Stepper'; 