import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { useFormContext } from 'react-hook-form';

const colorPickerVariants = cva(
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

const popoverVariants = cva(
    'absolute z-50 mt-1 p-4 bg-white border border-slate-200 rounded-lg shadow-lg dark:bg-slate-950 dark:border-slate-700',
    {
        variants: {
            size: {
                default: 'w-[280px]',
                sm: 'w-[240px]',
                lg: 'w-[320px]',
            },
        },
        defaultVariants: {
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

// Predefined color palette
const DEFAULT_COLORS = [
    '#000000', '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7',
    '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
];

export interface ColorPickerProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>,
    VariantProps<typeof colorPickerVariants> {
    /**
     * The label for the color picker
     */
    label?: string;
    /**
     * Helper text to be displayed below the color picker
     */
    helperText?: string;
    /**
     * The selected color value
     */
    value?: string;
    /**
     * Callback when color changes
     */
    onChange?: (color: string) => void;
    /**
     * Format of the color value
     */
    format?: 'hex' | 'rgb' | 'hsl';
    /**
     * Custom color palette
     */
    colors?: string[];
    /**
     * Whether to show opacity control
     */
    showAlpha?: boolean;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
}

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
    ({
        className,
        variant,
        size,
        label,
        helperText,
        value = '#000000',
        onChange,
        format = 'hex',
        colors = DEFAULT_COLORS,
        showAlpha = false,
        name,
        disabled,
        sx
    }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [currentColor, setCurrentColor] = useState(value);
        const [customColor, setCustomColor] = useState(value);
        const containerRef = useRef<HTMLDivElement>(null);

        // Get form context if available
        const formContext = useFormContext();
        const isFormField = formContext && name;

        // Get field state from form context
        const fieldState = isFormField ? formContext.getFieldState(name, formContext.formState) : null;
        const hasError = Boolean(fieldState?.error);
        const errorMessage = fieldState?.error?.message;

        // Generate a unique class name for custom styles
        const colorPickerClassName = sx ? `colorpicker-${Math.random().toString(36).slice(2, 11)}` : '';

        const handleColorChange = (color: string) => {
            setCurrentColor(color);
            setCustomColor(color);
            if (isFormField) {
                formContext.setValue(name, color);
            }
            onChange?.(color);
            setIsOpen(false);
        };

        const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const color = e.target.value;
            setCustomColor(color);
            if (isValidColor(color)) {
                handleColorChange(color);
            }
        };

        const isValidColor = (color: string) => {
            const s = new Option().style;
            s.color = color;
            return s.color !== '';
        };

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        return (
            <div className="w-full" ref={containerRef}>
                {sx && (
                    <style>
                        {`
                            .${colorPickerClassName} {
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
                    <div
                        className={twMerge(
                            colorPickerVariants({ variant: hasError ? 'error' : variant, size }),
                            'flex items-center gap-2 cursor-pointer',
                            disabled && 'cursor-not-allowed',
                            colorPickerClassName,
                            className
                        )}
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                    >
                        <div
                            className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700"
                            style={{ backgroundColor: currentColor }}
                        />
                        <input
                            type="text"
                            className="flex-1 bg-transparent border-none p-0 focus:outline-none focus:ring-0"
                            value={currentColor}
                            readOnly
                            disabled={disabled}
                        />
                    </div>
                    {isOpen && !disabled && (
                        <div className={popoverVariants({ size })}>
                            <div className="grid grid-cols-6 gap-2 mb-4">
                                {colors.map((color, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={twMerge(
                                            'w-8 h-8 rounded border border-slate-200 dark:border-slate-700',
                                            color === currentColor && 'ring-2 ring-primary-500 ring-offset-2'
                                        )}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorChange(color)}
                                    />
                                ))}
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-200">
                                        Custom Color
                                    </label>
                                    <input
                                        type="text"
                                        className={colorPickerVariants({ variant: 'default', size: 'default' })}
                                        value={customColor}
                                        onChange={handleCustomColorChange}
                                        placeholder={format === 'hex' ? '#000000' : format === 'rgb' ? 'rgb(0,0,0)' : 'hsl(0,0%,0%)'}
                                    />
                                </div>
                                {showAlpha && (
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-200">
                                            Opacity
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            className="w-full"
                                            value={100}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
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

ColorPicker.displayName = 'ColorPicker';