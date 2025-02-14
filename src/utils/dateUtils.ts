import {
    addDays,
    addMonths,
    addYears,
    differenceInDays,
    differenceInMonths,
    differenceInYears,
    endOfDay,
    endOfMonth,
    endOfWeek,
    endOfYear,
    format as formatDateFns,
    isAfter,
    isBefore,
    isEqual,
    isFuture,
    isPast,
    isToday,
    isValid,
    isWeekend,
    parse as parseDateFns,
    startOfDay,
    startOfMonth,
    startOfWeek,
    startOfYear,
    subDays,
    subMonths,
    subYears,
} from 'date-fns';

import {formatInTimeZone, toZonedTime,} from 'date-fns-tz';

export type DateInput = Date | string | number;

/**
 * Formats a date according to the specified format string
 */
export const formatDate = (date: DateInput, formatStr: string = 'yyyy-MM-dd'): string => {
    return formatDateFns(new Date(date), formatStr);
};

/**
 * Parses a date string into a Date object
 */
export const parseDate = (date: DateInput, formatStr: string = 'yyyy-MM-dd'): Date => {
    if (date instanceof Date) return date;
    if (typeof date === 'number') return new Date(date);
    return parseDateFns(date, formatStr, new Date());
};

/**
 * Validates if the input is a valid date
 */
export const isValidDate = (date: DateInput): boolean => {
    return isValid(new Date(date));
};

/**
 * Gets relative time string (e.g., "2 days ago", "in 3 months")
 */
export const getRelativeTimeString = (date: DateInput): string => {
    const now = new Date();
    const diff = differenceInDays(now, new Date(date));

    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff === -1) return 'Tomorrow';
    if (diff > 0) return `${diff} days ago`;
    return `In ${Math.abs(diff)} days`;
};

/**
 * Date manipulation functions
 */
export const dateManipulation = {
    addDays: (date: DateInput, amount: number): Date => addDays(new Date(date), amount),
    addMonths: (date: DateInput, amount: number): Date => addMonths(new Date(date), amount),
    addYears: (date: DateInput, amount: number): Date => addYears(new Date(date), amount),
    subtractDays: (date: DateInput, amount: number): Date => subDays(new Date(date), amount),
    subtractMonths: (date: DateInput, amount: number): Date => subMonths(new Date(date), amount),
    subtractYears: (date: DateInput, amount: number): Date => subYears(new Date(date), amount),
};

/**
 * Date range functions
 */
export const dateRanges = {
    startOfDay: (date: DateInput): Date => startOfDay(new Date(date)),
    endOfDay: (date: DateInput): Date => endOfDay(new Date(date)),
    startOfWeek: (date: DateInput): Date => startOfWeek(new Date(date)),
    endOfWeek: (date: DateInput): Date => endOfWeek(new Date(date)),
    startOfMonth: (date: DateInput): Date => startOfMonth(new Date(date)),
    endOfMonth: (date: DateInput): Date => endOfMonth(new Date(date)),
    startOfYear: (date: DateInput): Date => startOfYear(new Date(date)),
    endOfYear: (date: DateInput): Date => endOfYear(new Date(date)),
};

/**
 * Date comparison functions
 */
export const dateComparison = {
    isAfter: (date: DateInput, dateToCompare: DateInput): boolean => isAfter(new Date(date), new Date(dateToCompare)),
    isBefore: (date: DateInput, dateToCompare: DateInput): boolean => isBefore(new Date(date), new Date(dateToCompare)),
    isEqual: (date: DateInput, dateToCompare: DateInput): boolean => isEqual(new Date(date), new Date(dateToCompare)),
    isFuture: (date: DateInput): boolean => isFuture(new Date(date)),
    isPast: (date: DateInput): boolean => isPast(new Date(date)),
    isToday: (date: DateInput): boolean => isToday(new Date(date)),
    isWeekend: (date: DateInput): boolean => isWeekend(new Date(date)),
};

// Timezone Utils
export const timezoneUtils = {
    /**
     * Format a date in a specific timezone
     */
    formatInTimezone: (date: DateInput, timezone: string, formatStr: string = 'yyyy-MM-dd HH:mm:ss zzz'): string => {
        return formatInTimeZone(new Date(date), timezone, formatStr);
    },

    /**
     * Convert a date to a specific timezone
     */
    toZoned: (date: DateInput, timezone: string): Date => {
        return toZonedTime(new Date(date), timezone);
    },

    /**
     * Get the current timezone offset in minutes
     */
    getCurrentTimezoneOffset: (): number => {
        return new Date().getTimezoneOffset();
    },

    /**
     * Check if a timezone is valid
     */
    isValidTimezone: (timezone: string): boolean => {
        try {
            Intl.DateTimeFormat(undefined, { timeZone: timezone });
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Get a list of all available timezones
     */
    getAvailableTimezones: (): string[] => {
        return Intl.DateTimeFormat().resolvedOptions().timeZone ? 
            [Intl.DateTimeFormat().resolvedOptions().timeZone] : [];
    },
};

// Date differences
export const dateDifferences = {
    differenceInDays: (dateLeft: DateInput, dateRight: DateInput): number => 
        differenceInDays(new Date(dateLeft), new Date(dateRight)),
    differenceInMonths: (dateLeft: DateInput, dateRight: DateInput): number => 
        differenceInMonths(new Date(dateLeft), new Date(dateRight)),
    differenceInYears: (dateLeft: DateInput, dateRight: DateInput): number => 
        differenceInYears(new Date(dateLeft), new Date(dateRight)),
}; 