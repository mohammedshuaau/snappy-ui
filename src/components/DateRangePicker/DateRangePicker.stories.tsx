import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {addDays} from 'date-fns';
import DateRangePicker from './DateRangePicker';

const meta = {
    title: 'Form/DateRangePicker',
    component: DateRangePicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'error'],
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg'],
        },
    },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        return (
            <div className="w-[300px]">
                <DateRangePicker
                    name="dateRange"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                />
            </div>
        );
    }
};

export const WithLabel: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        return (
            <div className="w-[300px]">
                <DateRangePicker
                    label="Date Range"
                    name="dateRange"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                />
            </div>
        );
    }
};

export const WithHelperText: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        return (
            <div className="w-[300px]">
                <DateRangePicker
                    label="Booking Period"
                    helperText="Select your check-in and check-out dates"
                    name="bookingPeriod"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    placeholder="Select booking dates"
                />
            </div>
        );
    }
};

export const WithValue: Story = {
    render: () => {
        const today = new Date();
        const [startDate, setStartDate] = useState<Date>(today);
        const [endDate, setEndDate] = useState<Date>(addDays(today, 7));

        return (
            <div className="w-[300px]">
                <DateRangePicker
                    label="Selected Period"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        if (start) setStartDate(start);
                        if (end) setEndDate(end);
                    }}
                    name="selectedPeriod"
                />
            </div>
        );
    }
};

export const WithMinMaxDates: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        const today = new Date();
        const minDate = today;
        const maxDate = addDays(today, 30);

        return (
            <div className="w-[300px]">
                <DateRangePicker
                    label="Booking Period"
                    helperText="Select dates within the next 30 days"
                    minDate={minDate}
                    maxDate={maxDate}
                    name="bookingPeriod"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    placeholder="Select available dates"
                />
            </div>
        );
    }
};

export const WithDisabledDates: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        const today = new Date();
        const disabledDates = [
            addDays(today, 2),
            addDays(today, 3),
            addDays(today, 4),
        ];

        return (
            <div className="w-[300px]">
                <DateRangePicker
                    label="Available Period"
                    helperText="Some dates are unavailable"
                    name="availablePeriod"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    disabledDates={disabledDates}
                    placeholder="Select available dates"
                />
            </div>
        );
    }
};

export const WithDisabledWeekends: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        return (
            <div className="w-[300px]">
                <DateRangePicker
                    label="Business Period"
                    helperText="Weekends are disabled"
                    name="businessPeriod"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    disableWeekends
                    placeholder="Select business days"
                />
            </div>
        );
    }
};

export const WithError: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        return (
            <div className="w-[300px]">
                <DateRangePicker
                    label="Period"
                    variant="error"
                    helperText="Please select valid dates"
                    name="errorPeriod"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                />
            </div>
        );
    }
};

export const Disabled: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        return (
            <div className="w-[300px]">
                <DateRangePicker
                    label="Closed Period"
                    disabled
                    helperText="This period is not available"
                    name="disabledPeriod"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                />
            </div>
        );
    }
};

export const Sizes: Story = {
    render: () => {
        const [ranges, setRanges] = useState({
            small: { start: null as Date | null, end: null as Date | null },
            default: { start: null as Date | null, end: null as Date | null },
            large: { start: null as Date | null, end: null as Date | null },
        });

        return (
            <div className="space-y-4 w-[300px]">
                <DateRangePicker
                    label="Small"
                    size="sm"
                    name="small"
                    startDate={ranges.small.start}
                    endDate={ranges.small.end}
                    onChange={(start, end) => setRanges(prev => ({
                        ...prev,
                        small: { start, end }
                    }))}
                />
                <DateRangePicker
                    label="Default"
                    name="default"
                    startDate={ranges.default.start}
                    endDate={ranges.default.end}
                    onChange={(start, end) => setRanges(prev => ({
                        ...prev,
                        default: { start, end }
                    }))}
                />
                <DateRangePicker
                    label="Large"
                    size="lg"
                    name="large"
                    startDate={ranges.large.start}
                    endDate={ranges.large.end}
                    onChange={(start, end) => setRanges(prev => ({
                        ...prev,
                        large: { start, end }
                    }))}
                />
            </div>
        );
    }
};

export const CustomStyled: Story = {
    render: () => {
        const [startDate, setStartDate] = useState<Date | null>(null);
        const [endDate, setEndDate] = useState<Date | null>(null);
        return (
            <div className="w-[300px]">
                <DateRangePicker
                    label="Custom Styled"
                    name="customRange"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    sx={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.75rem',
                        padding: '0.5rem',
                        '&:hover': {
                            borderColor: '#3b82f6',
                        },
                    }}
                />
            </div>
        );
    }
}; 