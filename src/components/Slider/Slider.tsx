import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export interface Mark {
    value: number;
    label: string;
}

export interface SliderProps extends Omit<React.ComponentProps<typeof RadixSlider.Root>, 'value' | 'defaultValue'> {
    /** The variant of the slider */
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
    /** The size of the slider */
    size?: 'sm' | 'default' | 'lg';
    /** The current value of the slider */
    value?: number | number[];
    /** The default value of the slider */
    defaultValue?: number | number[];
    /** The minimum value of the slider */
    min?: number;
    /** The maximum value of the slider */
    max?: number;
    /** The step value of the slider */
    step?: number;
    /** Whether to show marks on the slider */
    showMarks?: boolean;
    /** Whether to show labels on the slider */
    showLabels?: boolean;
    /** Whether to show tooltip on hover */
    showTooltip?: boolean;
    /** Array of marks to show on the slider */
    marks?: Mark[];
    /** Function to format the value displayed in tooltip and labels */
    formatValue?: (value: number) => string;
    /** Custom styles */
    sx?: { [key: string]: any };
    /** Callback when the value changes */
    onValueChange?: (value: number | number[]) => void;
    /** Whether the slider is disabled */
    disabled?: boolean;
}

const sliderVariants = cva(
    'relative flex items-center select-none touch-none w-full h-[20px]',
    {
        variants: {
            size: {
                sm: '[&_[data-thumb]]:h-3 [&_[data-thumb]]:w-3',
                default: '[&_[data-thumb]]:h-4 [&_[data-thumb]]:w-4',
                lg: '[&_[data-thumb]]:h-5 [&_[data-thumb]]:w-5',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
);

const trackVariants = cva(
    'relative grow h-[3px] rounded-full bg-gray-200 dark:bg-gray-700',
    {
        variants: {
            variant: {
                default: 'bg-gray-200 dark:bg-gray-700',
                primary: 'bg-blue-100 dark:bg-blue-900',
                success: 'bg-green-100 dark:bg-green-900',
                warning: 'bg-yellow-100 dark:bg-yellow-900',
                error: 'bg-red-100 dark:bg-red-900',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const rangeVariants = cva(
    'absolute h-full rounded-full',
    {
        variants: {
            variant: {
                default: 'bg-gray-900 dark:bg-gray-100',
                primary: 'bg-blue-600 dark:bg-blue-400',
                success: 'bg-green-600 dark:bg-green-400',
                warning: 'bg-yellow-600 dark:bg-yellow-400',
                error: 'bg-red-600 dark:bg-red-400',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const thumbVariants = cva(
    [
        'block rounded-full bg-white border-2',
        'transition-colors focus:outline-none',
        'focus:ring-2 focus:ring-offset-2',
        'hover:scale-110',
        'data-[disabled]:opacity-50',
        'cursor-pointer',
    ],
    {
        variants: {
            variant: {
                default: 'border-gray-900 focus:ring-gray-400 dark:border-gray-100 dark:focus:ring-gray-600',
                primary: 'border-blue-600 focus:ring-blue-400 dark:border-blue-400 dark:focus:ring-blue-600',
                success: 'border-green-600 focus:ring-green-400 dark:border-green-400 dark:focus:ring-green-600',
                warning: 'border-yellow-600 focus:ring-yellow-400 dark:border-yellow-400 dark:focus:ring-yellow-600',
                error: 'border-red-600 focus:ring-red-400 dark:border-red-400 dark:focus:ring-red-600',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const tooltipVariants = cva(
    'absolute -top-8 left-1/2 -translate-x-1/2 rounded px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100',
    {
        variants: {
            variant: {
                default: 'bg-gray-900 dark:bg-gray-100 dark:text-gray-900',
                primary: 'bg-blue-600 dark:bg-blue-400',
                success: 'bg-green-600 dark:bg-green-400',
                warning: 'bg-yellow-600 dark:bg-yellow-400',
                error: 'bg-red-600 dark:bg-red-400',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
    ({
        variant = 'default',
        size = 'default',
        min = 0,
        max = 100,
        step = 1,
        showMarks = false,
        showLabels = false,
        showTooltip = false,
        marks = [],
        formatValue = (value: number) => value.toString(),
        sx,
        className,
        value,
        defaultValue = typeof value === 'number' ? value : Array.isArray(value) ? value : 50,
        onValueChange,
        disabled = false,
        ...props
    }, ref) => {
        const isRange = Array.isArray(defaultValue);
        const values = value ?? defaultValue;
        const sliderClassName = sx ? `slider-${Math.random().toString(36).slice(2, 11)}` : '';

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${sliderClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div className={twMerge('w-full', sliderClassName, className)}>
                    <RadixSlider.Root
                        ref={ref}
                        className={sliderVariants({ size })}
                        min={min}
                        max={max}
                        step={step}
                        value={Array.isArray(values) ? values : [values]}
                        onValueChange={(newValues) => {
                            if (onValueChange) {
                                onValueChange(isRange ? newValues : newValues[0]);
                            }
                        }}
                        disabled={disabled}
                        {...props}
                    >
                        <RadixSlider.Track className={trackVariants({ variant })}>
                            <RadixSlider.Range className={rangeVariants({ variant })} />
                        </RadixSlider.Track>

                        {Array.isArray(values) ? (
                            values.map((value, index) => (
                                <RadixSlider.Thumb
                                    key={index}
                                    data-thumb=""
                                    className={twMerge(
                                        thumbVariants({ variant }),
                                        'group'
                                    )}
                                >
                                    {showTooltip && (
                                        <span className={tooltipVariants({ variant })}>
                                            {formatValue(value)}
                                        </span>
                                    )}
                                </RadixSlider.Thumb>
                            ))
                        ) : (
                            <RadixSlider.Thumb
                                data-thumb=""
                                className={twMerge(
                                    thumbVariants({ variant }),
                                    'group'
                                )}
                            >
                                {showTooltip && (
                                    <span className={tooltipVariants({ variant })}>
                                        {formatValue(values)}
                                    </span>
                                )}
                            </RadixSlider.Thumb>
                        )}
                    </RadixSlider.Root>

                    {(showMarks || showLabels) && marks.length > 0 && (
                        <div className="relative mt-4">
                            <div className="absolute w-full">
                                {marks.map(({ value, label }) => {
                                    const position = ((value - min) / (max - min)) * 100;
                                    return (
                                        <div
                                            key={value}
                                            className="absolute"
                                            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                                        >
                                            {showMarks && (
                                                <div className={twMerge(
                                                    'h-1 w-1 rounded-full',
                                                    variant === 'default' && 'bg-gray-400 dark:bg-gray-600',
                                                    variant === 'primary' && 'bg-blue-600 dark:bg-blue-400',
                                                    variant === 'success' && 'bg-green-600 dark:bg-green-400',
                                                    variant === 'warning' && 'bg-yellow-600 dark:bg-yellow-400',
                                                    variant === 'error' && 'bg-red-600 dark:bg-red-400'
                                                )} />
                                            )}
                                            {showLabels && (
                                                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                                    {label}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
);

Slider.displayName = 'Slider'; 