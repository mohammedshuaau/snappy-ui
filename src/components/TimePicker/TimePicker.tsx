import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { format, parse, set, addMinutes } from 'date-fns';
import { useFormContext } from 'react-hook-form';

const timePickerVariants = cva(
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

// Add dropdown variants
const dropdownVariants = cva(
    'absolute z-50 w-full mt-1 overflow-auto bg-white border border-slate-200 rounded-md shadow-lg dark:bg-slate-950 dark:border-slate-700',
    {
        variants: {
            size: {
                default: 'max-h-60',
                sm: 'max-h-40',
                lg: 'max-h-80',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
);

const timeOptionVariants = cva(
    'px-3 py-2 text-sm cursor-pointer transition-colors',
    {
        variants: {
            state: {
                default: 'text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800',
                selected: 'bg-primary-50 text-primary-900 dark:bg-primary-900 dark:text-primary-100',
                disabled: 'text-slate-400 cursor-not-allowed dark:text-slate-600',
            },
        },
        defaultVariants: {
            state: 'default',
        },
    }
);

export interface TimePickerProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>,
    VariantProps<typeof timePickerVariants> {
    /**
     * The label for the time picker
     */
    label?: string;
    /**
     * Helper text to be displayed below the time picker
     */
    helperText?: string;
    /**
     * The selected time
     */
    value?: Date;
    /**
     * Callback when time changes
     */
    onChange?: (time: Date | null) => void;
    /**
     * Time format for display (24h or 12h)
     */
    format?: '24h' | '12h';
    /**
     * Minimum selectable time
     */
    minTime?: Date;
    /**
     * Maximum selectable time
     */
    maxTime?: Date;
    /**
     * Step interval in minutes
     */
    step?: number;
    /**
     * Array of times that should be disabled/unselectable
     */
    disabledTimes?: Date[];
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Whether to show the time dropdown
     */
    showDropdown?: boolean;
}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
    ({
        className,
        variant,
        size,
        label,
        helperText,
        value,
        onChange,
        format: timeFormat = '24h',
        minTime,
        maxTime,
        step = 30,
        disabledTimes = [],
        name,
        disabled,
        sx,
        showDropdown = false,
        ...props
    }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement | null>(null);

        // Get form context if available
        const formContext = useFormContext();
        const isFormField = formContext && name;

        // Get field state from form context
        const fieldState = isFormField ? formContext.getFieldState(name, formContext.formState) : null;
        const hasError = Boolean(fieldState?.error);
        const errorMessage = fieldState?.error?.message;

        // Generate a unique class name for custom styles
        const timePickerClassName = sx ? `timepicker-${Math.random().toString(36).slice(2, 11)}` : '';

        // Register field with form if available
        const registerProps = isFormField ? formContext.register(name, {
            setValueAs: (value: string) => value ? parse(value, 'HH:mm', new Date()) : null,
        }) : {};

        // Convert disabledTimes to normalized array of time strings for comparison
        const normalizedDisabledTimes = disabledTimes.map(time =>
            format(time, 'HH:mm')
        );

        const isTimeDisabled = (time: Date) => {
            const timeString = format(time, 'HH:mm');
            return normalizedDisabledTimes.includes(timeString);
        };

        // Generate time slots
        const generateTimeSlots = () => {
            const slots: Date[] = [];
            const start = minTime || set(new Date(), { hours: 0, minutes: 0 });
            const end = maxTime || set(new Date(), { hours: 23, minutes: 59 });

            let current = start;
            while (current <= end) {
                slots.push(current);
                current = addMinutes(current, step);
            }

            return slots;
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const timeValue = e.target.value;
            if (!timeValue) {
                onChange?.(null);
                return;
            }

            const date = parse(timeValue, 'HH:mm', new Date());

            // Check if time is in disabled times
            if (isTimeDisabled(date)) {
                return;
            }

            // Check min/max constraints
            if (minTime && date < minTime) {
                onChange?.(minTime);
                return;
            }

            if (maxTime && date > maxTime) {
                onChange?.(maxTime);
                return;
            }

            if (isFormField) {
                formContext.setValue(name, date);
            }
            onChange?.(date);
        };

        const handleTimeSelect = (time: Date) => {
            if (!isTimeDisabled(time)) {
                if (isFormField) {
                    formContext.setValue(name, time);
                }
                onChange?.(time);
                setIsOpen(false);
            }
        };

        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target as Node) &&
                    !inputRef.current?.contains(event.target as Node)
                ) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        // Format the value for display
        const formattedValue = value ? format(value, 'HH:mm') : '';

        return (
            <div className="w-full">
                {sx && (
                    <style>
                        {`
                            .${timePickerClassName} {
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
                        type="time"
                        ref={(node) => {
                            if (typeof ref === 'function') {
                                ref(node);
                            } else if (ref) {
                                ref.current = node;
                            }
                            inputRef.current = node;
                        }}
                        id={name}
                        className={twMerge(
                            timePickerVariants({ variant: hasError ? 'error' : variant, size }),
                            timePickerClassName,
                            className
                        )}
                        value={formattedValue}
                        onChange={handleChange}
                        onClick={() => showDropdown && setIsOpen(true)}
                        disabled={disabled}
                        step={step * 60} // Convert minutes to seconds
                        min={minTime ? format(minTime, 'HH:mm') : undefined}
                        max={maxTime ? format(maxTime, 'HH:mm') : undefined}
                        aria-describedby={helperText || hasError ? `${name}-description` : undefined}
                        aria-invalid={hasError}
                        {...registerProps}
                        {...props}
                    />
                    {showDropdown && isOpen && !disabled && (
                        <div
                            ref={dropdownRef}
                            className={dropdownVariants({ size })}
                        >
                            <div className="py-1">
                                {generateTimeSlots().map((time, index) => {
                                    const isDisabled = isTimeDisabled(time);
                                    const isSelected = value && format(time, 'HH:mm') === format(value, 'HH:mm');
                                    const timeState = isDisabled ? 'disabled' : isSelected ? 'selected' : 'default';

                                    return (
                                        <div
                                            key={index}
                                            className={timeOptionVariants({ state: timeState })}
                                            onClick={() => !isDisabled && handleTimeSelect(time)}
                                            role="option"
                                            aria-selected={isSelected}
                                            aria-disabled={isDisabled}
                                        >
                                            {format(time, timeFormat === '12h' ? 'hh:mm a' : 'HH:mm')}
                                        </div>
                                    );
                                })}
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

TimePicker.displayName = 'TimePicker';

export default TimePicker; 