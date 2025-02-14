import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const calendarVariants = cva(
    [
        'w-full',
        'rounded-lg',
        'border',
        'bg-white dark:bg-slate-900',
        'border-slate-200 dark:border-slate-700',
        'shadow-sm',
    ],
    {
        variants: {
            variant: {
                default: '',
                compact: 'text-sm',
                minimal: 'border-0 shadow-none',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    color?: string;
    description?: string;
}

type BaseCalendarProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>;

export interface CalendarProps extends BaseCalendarProps, VariantProps<typeof calendarVariants> {
    /** Selected date */
    selected?: Date;
    /** Initial month to display */
    month?: Date;
    /** Callback when a date is selected */
    onSelect?: (date: Date) => void;
    /** Callback when month is changed */
    onMonthChange?: (date: Date) => void;
    /** Callback when an event is clicked */
    onEventClick?: (event: CalendarEvent) => void;
    /** Array of events to display */
    events?: CalendarEvent[];
    /** Minimum selectable date */
    minDate?: Date;
    /** Maximum selectable date */
    maxDate?: Date;
    /** Custom styles */
    sx?: React.CSSProperties;
    /** Whether to show week numbers */
    showWeekNumbers?: boolean;
    /** Whether to show events */
    showEvents?: boolean;
    /** Whether to show navigation */
    showNavigation?: boolean;
    /** Whether to show event details on hover */
    showEventDetails?: boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
    (
        {
            selected,
            month: initialMonth,
            onSelect,
            onMonthChange,
            onEventClick,
            events = [],
            minDate,
            maxDate,
            variant,
            sx,
            showWeekNumbers = false,
            showEvents = true,
            showNavigation = true,
            showEventDetails = true,
            className,
            ...props
        },
        ref
    ) => {
        const [currentMonth, setCurrentMonth] = React.useState(initialMonth || new Date());
        const chartClassName = sx ? `calendar-${Math.random().toString(36).slice(2, 11)}` : '';

        const getDaysInMonth = (date: Date) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const days: Date[] = [];

            // Add previous month's days
            for (let i = firstDayOfMonth - 1; i >= 0; i--) {
                days.push(new Date(year, month, -i));
            }

            // Add current month's days
            for (let i = 1; i <= daysInMonth; i++) {
                days.push(new Date(year, month, i));
            }

            // Add next month's days to complete the grid
            const remainingDays = 42 - days.length;
            for (let i = 1; i <= remainingDays; i++) {
                days.push(new Date(year, month + 1, i));
            }

            return days;
        };

        const isDateDisabled = (date: Date) => {
            if (minDate && date < minDate) return true;
            if (maxDate && date > maxDate) return true;
            return false;
        };

        const handlePreviousMonth = () => {
            const newDate = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));
            setCurrentMonth(newDate);
            onMonthChange?.(newDate);
        };

        const handleNextMonth = () => {
            const newDate = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
            setCurrentMonth(newDate);
            onMonthChange?.(newDate);
        };

        const handleDateSelect = (date: Date) => {
            if (!isDateDisabled(date)) {
                onSelect?.(date);
            }
        };

        const getEventForDate = (date: Date) => {
            return events.filter(
                (event) =>
                    event.date.getDate() === date.getDate() &&
                    event.date.getMonth() === date.getMonth() &&
                    event.date.getFullYear() === date.getFullYear()
            );
        };

        const handleToday = () => {
            const today = new Date();
            setCurrentMonth(today);
            onMonthChange?.(today);
            onSelect?.(today);
        };

        const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
            e.stopPropagation(); // Prevent date selection when clicking an event
            onEventClick?.(event);
        };

        const days = getDaysInMonth(currentMonth);
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <div
                ref={ref}
                className={twMerge(calendarVariants({ variant }), chartClassName, className)}
                style={sx}
                {...props}
            >
                {/* Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h2>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleToday}
                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md
                                    text-slate-700 dark:text-slate-300
                                    bg-slate-100 dark:bg-slate-800
                                    hover:bg-slate-200 dark:hover:bg-slate-700
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                                    dark:focus:ring-offset-slate-900"
                            >
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                Today
                            </button>
                            {showNavigation && (
                                <div className="flex space-x-1">
                                    <button
                                        onClick={handlePreviousMonth}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                                        aria-label="Previous month"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                    </button>
                                    <button
                                        onClick={handleNextMonth}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                                        aria-label="Next month"
                                    >
                                        <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="p-4">
                    {/* Week days */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {showWeekNumbers && (
                            <div className="text-center text-sm font-medium text-slate-400 dark:text-slate-500">
                                Wk
                            </div>
                        )}
                        {weekDays.map((day) => (
                            <div
                                key={day}
                                className="text-center text-sm font-medium text-slate-600 dark:text-slate-400"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((date) => {
                            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                            const isSelected =
                                selected &&
                                date.getDate() === selected.getDate() &&
                                date.getMonth() === selected.getMonth() &&
                                date.getFullYear() === selected.getFullYear();
                            const isToday =
                                date.getDate() === new Date().getDate() &&
                                date.getMonth() === new Date().getMonth() &&
                                date.getFullYear() === new Date().getFullYear();
                            const disabled = isDateDisabled(date);
                            const dateEvents = showEvents ? getEventForDate(date) : [];

                            return (
                                <div
                                    key={date.toISOString()}
                                    className={twMerge(
                                        'relative p-2 text-center cursor-pointer',
                                        'text-slate-900 dark:text-slate-100',
                                        'hover:bg-slate-50 dark:hover:bg-slate-800',
                                        !isCurrentMonth && 'text-slate-400 dark:text-slate-600',
                                        isSelected && [
                                            'bg-primary-100 dark:bg-primary-900',
                                            'hover:bg-primary-200 dark:hover:bg-primary-800',
                                            'text-primary-900 dark:text-primary-100',
                                        ],
                                        isToday && [
                                            'font-bold',
                                            'ring-2 ring-primary-500 dark:ring-primary-400',
                                            'ring-offset-2 ring-offset-white dark:ring-offset-slate-900',
                                        ],
                                        disabled && [
                                            'cursor-not-allowed opacity-50',
                                            'hover:bg-transparent dark:hover:bg-transparent',
                                        ]
                                    )}
                                    onClick={() => handleDateSelect(date)}
                                >
                                    <span>{date.getDate()}</span>
                                    {dateEvents.length > 0 && (
                                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                                            {dateEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className={twMerge(
                                                        "w-1.5 h-1.5 rounded-full cursor-pointer",
                                                        showEventDetails && "hover:scale-150 transition-transform"
                                                    )}
                                                    style={{
                                                        backgroundColor: event.color || 'currentColor',
                                                    }}
                                                    title={showEventDetails ? `${event.title}${event.description ? ` - ${event.description}` : ''}` : event.title}
                                                    onClick={(e) => handleEventClick(event, e)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            handleEventClick(event, e as any);
                                                        }
                                                    }}
                                                    tabIndex={0}
                                                    role="button"
                                                    aria-label={`Event: ${event.title}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
);

Calendar.displayName = 'Calendar';

export default Calendar; 