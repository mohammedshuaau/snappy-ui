import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { format, startOfDay, isWeekend, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { useFormContext } from 'react-hook-form';

const datePickerVariants = cva(
    'w-full rounded-md border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:border-primary-500 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-primary-400 dark:focus:ring-primary-400 dark:ring-offset-slate-900',
                error:
                    'border-red-500 bg-white text-slate-900 placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-red-400 dark:focus:ring-red-400 dark:ring-offset-slate-900',
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

const calendarVariants = cva(
    'absolute z-50 mt-1 p-4 bg-white border border-slate-200 rounded-lg shadow-lg dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100',
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

const dayButtonVariants = cva(
    'w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors',
    {
        variants: {
            state: {
                default: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100',
                selected: 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700',
                disabled: 'text-slate-400 cursor-not-allowed dark:text-slate-600',
                today: 'border-2 border-primary-500 dark:border-primary-400',
                outsideMonth: 'text-slate-400 dark:text-slate-600',
            },
        },
    }
);

type DayState = NonNullable<VariantProps<typeof dayButtonVariants>['state']>;

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

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export interface DatePickerProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>,
    VariantProps<typeof datePickerVariants> {
    /**
     * The label for the date picker
     */
    label?: string;
    /**
     * Helper text to be displayed below the date picker
     */
    helperText?: string;
    /**
     * The selected date
     */
    value?: Date;
    /**
     * Callback when date changes
     */
    onChange?: (date: Date | null) => void;
    /**
     * Date format for display
     */
    format?: string;
    /**
     * Minimum selectable date
     */
    minDate?: Date;
    /**
     * Maximum selectable date
     */
    maxDate?: Date;
    /**
     * Array of dates that should be disabled/unselectable
     */
    disabledDates?: Date[];
    /**
     * Whether to disable weekend dates
     */
    disableWeekends?: boolean;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
    ({
        className,
        variant,
        size,
        label,
        helperText,
        value,
        onChange,
        format: dateFormat = 'yyyy-MM-dd',
        minDate,
        maxDate,
        disabledDates = [],
        disableWeekends = false,
        name,
        disabled,
        sx,
        ...props
    }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [currentMonth, setCurrentMonth] = useState(value || new Date());
        const containerRef = useRef<HTMLDivElement>(null);

        // Get form context if available
        const formContext = useFormContext();
        const isFormField = formContext && name;

        // Get field state from form context
        const fieldState = isFormField ? formContext.getFieldState(name, formContext.formState) : null;
        const hasError = Boolean(fieldState?.error);
        const errorMessage = fieldState?.error?.message;

        // Generate a unique class name for custom styles
        const datePickerClassName = sx ? `datepicker-${Math.random().toString(36).slice(2, 11)}` : '';

        // Convert disabledDates to normalized array of date strings for comparison
        const normalizedDisabledDates = disabledDates.map(date =>
            format(startOfDay(date), 'yyyy-MM-dd')
        );

        const isDateDisabled = (date: Date) => {
            if (disableWeekends && isWeekend(date)) {
                return true;
            }
            if (minDate && date < startOfDay(minDate)) {
                return true;
            }
            if (maxDate && date > startOfDay(maxDate)) {
                return true;
            }
            const normalizedDate = format(startOfDay(date), 'yyyy-MM-dd');
            return normalizedDisabledDates.includes(normalizedDate);
        };

        const handleDateClick = (date: Date) => {
            if (isDateDisabled(date)) {
                return;
            }

            if (isFormField) {
                formContext.setValue(name, date);
            }
            onChange?.(date);
            setIsOpen(false);
        };

        const getDayState = (date: Date): DayState => {
            if (!isSameMonth(date, currentMonth)) return 'outsideMonth';
            if (isDateDisabled(date)) return 'disabled';
            if (value && isSameDay(date, value)) return 'selected';
            if (isSameDay(date, new Date())) return 'today';
            return 'default';
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

        const generateMonthDays = () => {
            const start = startOfMonth(currentMonth);
            const end = endOfMonth(currentMonth);
            const days = eachDayOfInterval({ start, end });

            // Add days from previous month to start on Sunday
            const daysFromPrevMonth = start.getDay();
            if (daysFromPrevMonth > 0) {
                const prevMonthDays = eachDayOfInterval({
                    start: subMonths(start, 1),
                    end: subMonths(end, 1),
                }).slice(-daysFromPrevMonth);
                days.unshift(...prevMonthDays);
            }

            // Add days from next month to complete the calendar
            const remainingDays = 42 - days.length; // 6 rows × 7 days
            if (remainingDays > 0) {
                const nextMonthDays = eachDayOfInterval({
                    start: addMonths(start, 1),
                    end: addMonths(end, 1),
                }).slice(0, remainingDays);
                days.push(...nextMonthDays);
            }

            return days;
        };

        return (
            <div className="w-full" ref={containerRef}>
                {sx && (
                    <style>
                        {`
                            .${datePickerClassName} {
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
                        type="text"
                        ref={ref}
                        id={name}
                        className={twMerge(
                            datePickerVariants({ variant: hasError ? 'error' : variant, size }),
                            datePickerClassName,
                            className
                        )}
                        value={value ? format(value, dateFormat) : ''}
                        onClick={() => !disabled && setIsOpen(true)}
                        readOnly
                        disabled={disabled}
                        aria-describedby={helperText || hasError ? `${name}-description` : undefined}
                        aria-invalid={hasError}
                        {...props}
                    />
                    {isOpen && !disabled && (
                        <div className={calendarVariants({ size })}>
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    type="button"
                                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                    className="p-1 hover:bg-slate-100 rounded-full dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div className="font-semibold text-slate-900 dark:text-slate-100">
                                    {format(currentMonth, 'MMMM yyyy')}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                    className="p-1 hover:bg-slate-100 rounded-full dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {WEEKDAYS.map((day) => (
                                    <div
                                        key={day}
                                        className="text-xs font-medium text-center text-slate-500 dark:text-slate-400"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {generateMonthDays().map((date, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleDateClick(date)}
                                        className={dayButtonVariants({ state: getDayState(date) })}
                                        disabled={isDateDisabled(date)}
                                    >
                                        {format(date, 'd')}
                                    </button>
                                ))}
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

DatePicker.displayName = 'DatePicker';