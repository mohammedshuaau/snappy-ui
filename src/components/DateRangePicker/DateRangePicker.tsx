import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import {
    format,
    startOfDay,
    isWeekend,
    isAfter,
    isBefore,
    isValid,
    eachDayOfInterval,
    startOfMonth,
    endOfMonth,
    addMonths,
    subMonths,
    getDay,
    addDays,
    isSameMonth,
    isWithinInterval,
    isSameDay,
} from 'date-fns';
import { useFormContext } from 'react-hook-form';

const dateRangePickerVariants = cva(
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
                default: 'w-[340px]',
                sm: 'w-[300px]',
                lg: 'w-[380px]',
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
                inRange: 'bg-primary-100 text-primary-900 hover:bg-primary-200 dark:bg-primary-900/20 dark:text-primary-100 dark:hover:bg-primary-900/30',
                disabled: 'text-slate-400 cursor-not-allowed dark:text-slate-600',
                today: 'border-2 border-primary-500 dark:border-primary-400',
                outsideMonth: 'text-slate-400 dark:text-slate-600',
            },
        },
        defaultVariants: {
            state: 'default',
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

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

export interface DateRangePickerProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>,
    VariantProps<typeof dateRangePickerVariants> {
    /**
     * The label for the date range picker
     */
    label?: string;
    /**
     * Helper text to be displayed below the date range picker
     */
    helperText?: string;
    /**
     * The selected start date
     */
    startDate?: Date | null;
    /**
     * The selected end date
     */
    endDate?: Date | null;
    /**
     * Callback when dates change
     */
    onStartDateChange?: (date: Date | null) => void;
    /**
     * Callback when dates change
     */
    onEndDateChange?: (date: Date | null) => void;
    /**
     * Callback when both dates change
     */
    onChange?: (startDate: Date | null, endDate: Date | null) => void;
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
    /**
     * Placeholder text
     */
    placeholder?: string;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
    ({
        className,
        variant,
        size,
        label,
        helperText,
        startDate,
        endDate,
        onStartDateChange,
        onEndDateChange,
        onChange,
        minDate,
        maxDate,
        disabledDates = [],
        disableWeekends = false,
        name,
        disabled,
        sx,
        placeholder = 'Select date range',
        ...props
    }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [currentMonth, setCurrentMonth] = useState(new Date());
        const [hoverDate, setHoverDate] = useState<Date | null>(null);
        const [internalStartDate, setInternalStartDate] = useState<Date | null>(startDate || null);
        const containerRef = useRef<HTMLDivElement>(null);

        // Get form context if available
        const formContext = useFormContext();
        const isFormField = formContext && name;

        // Get field state from form context
        const fieldState = isFormField ? formContext.getFieldState(name, formContext.formState) : null;
        const hasError = Boolean(fieldState?.error);
        const errorMessage = fieldState?.error?.message;

        // Generate a unique class name for custom styles
        const dateRangePickerClassName = sx ? `daterangepicker-${Math.random().toString(36).slice(2, 11)}` : '';

        // Convert disabledDates to normalized array of date strings for comparison
        const normalizedDisabledDates = disabledDates.map(date =>
            format(startOfDay(date), 'yyyy-MM-dd')
        );

        const isDateDisabled = (date: Date) => {
            if (!isValid(date)) return true;
            if (disableWeekends && isWeekend(date)) return true;
            if (minDate && isBefore(date, startOfDay(minDate))) return true;
            if (maxDate && isAfter(date, startOfDay(maxDate))) return true;
            const normalizedDate = format(startOfDay(date), 'yyyy-MM-dd');
            return normalizedDisabledDates.includes(normalizedDate);
        };

        const handleDateClick = (date: Date) => {
            if (isDateDisabled(date)) return;

            if (!internalStartDate || (internalStartDate && endDate)) {
                setInternalStartDate(date);
                onStartDateChange?.(date);
                onChange?.(date, null);

                if (isFormField) {
                    formContext.setValue(`${name}-start`, date);
                    formContext.setValue(`${name}-end`, null);
                }
            } else {
                let newStartDate = internalStartDate;
                let newEndDate = date;

                if (isBefore(date, internalStartDate)) {
                    newStartDate = date;
                    newEndDate = internalStartDate;
                }

                setInternalStartDate(null);
                onStartDateChange?.(newStartDate);
                onEndDateChange?.(newEndDate);
                onChange?.(newStartDate, newEndDate);

                if (isFormField) {
                    formContext.setValue(`${name}-start`, newStartDate);
                    formContext.setValue(`${name}-end`, newEndDate);
                }

                setIsOpen(false);
            }
        };

        const getDayState = (date: Date) => {
            if (isDateDisabled(date)) return 'disabled';
            if (!isSameMonth(date, currentMonth)) return 'outsideMonth';
            if (isSameDay(date, new Date())) return 'today';

            if (startDate && endDate) {
                if (isSameDay(date, startDate) || isSameDay(date, endDate)) return 'selected';
                if (isWithinInterval(date, { start: startDate, end: endDate })) return 'inRange';
            } else if (startDate) {
                if (isSameDay(date, startDate)) return 'selected';
                if (hoverDate && isWithinInterval(date, {
                    start: isBefore(hoverDate, startDate) ? hoverDate : startDate,
                    end: isBefore(hoverDate, startDate) ? startDate : hoverDate,
                })) return 'inRange';
            }

            return 'default';
        };

        const formatDateRange = () => {
            if (!startDate) return '';
            if (!endDate) return format(startDate, 'MMM d, yyyy');
            return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
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
            const firstDayOfWeek = getDay(start);
            const previousMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) =>
                subMonths(addDays(start, -firstDayOfWeek + i), 0)
            );

            // Add days from next month to complete the calendar
            const lastDayOfWeek = getDay(end);
            const nextMonthDays = Array.from({ length: 6 - lastDayOfWeek }, (_, i) =>
                addDays(end, i + 1)
            );

            return [...previousMonthDays, ...days, ...nextMonthDays];
        };

        return (
            <div className="w-full" ref={containerRef}>
                {sx && (
                    <style>
                        {`
                            .${dateRangePickerClassName} {
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
                        ref={ref as any}
                        id={name}
                        className={twMerge(
                            dateRangePickerVariants({ variant: hasError ? 'error' : variant, size }),
                            dateRangePickerClassName,
                            className
                        )}
                        value={formatDateRange()}
                        onClick={() => !disabled && setIsOpen(true)}
                        readOnly
                        disabled={disabled}
                        placeholder={placeholder}
                        aria-describedby={helperText || hasError ? `${name}-description` : undefined}
                        aria-invalid={hasError}
                        {...props}
                    />
                    {isOpen && !disabled && (
                        <div className={calendarVariants({ size })} style={{ width: size === 'lg' ? '720px' : '340px' }}>
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
                                        onMouseEnter={() => setHoverDate(date)}
                                        onMouseLeave={() => setHoverDate(null)}
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

DateRangePicker.displayName = 'DateRangePicker';

export default DateRangePicker; 