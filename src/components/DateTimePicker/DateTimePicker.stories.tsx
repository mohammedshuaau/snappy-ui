import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { addDays } from 'date-fns';
import {DateTimePicker} from './DateTimePicker';

const meta = {
    title: 'Form/DateTimePicker',
    component: DateTimePicker,
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
        timeFormat: {
            control: 'select',
            options: ['12h', '24h'],
        },
    },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    name="datetime"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                />
            </div>
        );
    }
};

export const WithLabel: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Meeting Schedule"
                    name="meetingSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                />
            </div>
        );
    }
};

export const WithHelperText: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Appointment Schedule"
                    helperText="Select your preferred appointment date and time"
                    name="appointmentSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                />
            </div>
        );
    }
};

export const HorizontalLayout: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Event Schedule"
                    helperText="Select event date and time"
                    name="eventSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                />
            </div>
        );
    }
};

export const WithTimeDropdown: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Meeting Schedule"
                    helperText="Select with time dropdown"
                    name="meetingSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                />
            </div>
        );
    }
};

export const TwelveHourFormat: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Event Schedule"
                    name="eventSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                    timeFormat="12h"
                />
            </div>
        );
    }
};

export const WithValue: Story = {
    render: () => {
        const initialDate = new Date();
        initialDate.setHours(14, 30, 0, 0);
        const [datetime, setDatetime] = useState<Date>(initialDate);

        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Selected Schedule"
                    value={datetime}
                    onChange={(newDatetime) => newDatetime && setDatetime(newDatetime)}
                    name="selectedSchedule"
                />
            </div>
        );
    }
};

export const WithMinMaxDates: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        const today = new Date();
        const minDate = today;
        const maxDate = addDays(today, 7);

        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Event Schedule"
                    helperText="Select a date within the next 7 days"
                    minDate={minDate}
                    maxDate={maxDate}
                    name="eventSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                />
            </div>
        );
    }
};

export const WithDisabledDates: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        const today = new Date();
        const disabledDates = [
            addDays(today, 2),
            addDays(today, 3),
            addDays(today, 4),
        ];

        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Available Schedule"
                    helperText="Some dates are unavailable"
                    name="availableSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                    disabledDates={disabledDates}
                />
            </div>
        );
    }
};

export const WithDisabledWeekends: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Business Schedule"
                    helperText="Weekends are disabled"
                    name="businessSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                    disableWeekends
                />
            </div>
        );
    }
};

export const WithTimeStep: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Meeting Schedule"
                    helperText="15-minute interval time slots"
                    name="meetingSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                    timeStep={15}
                />
            </div>
        );
    }
};

export const WithError: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Schedule"
                    variant="error"
                    helperText="Please select a valid date and time"
                    name="errorSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                />
            </div>
        );
    }
};

export const Disabled: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Closed Schedule"
                    disabled
                    helperText="This schedule is not available"
                    name="disabledSchedule"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                />
            </div>
        );
    }
};

export const Sizes: Story = {
    render: () => {
        const [datetimes, setDatetimes] = useState({
            small: undefined as Date | undefined,
            default: undefined as Date | undefined,
            large: undefined as Date | undefined,
        });

        return (
            <div className="space-y-4 w-[600px]">
                <DateTimePicker
                    label="Small"
                    size="sm"
                    name="small"
                    value={datetimes.small}
                    onChange={(datetime) => setDatetimes(prev => ({ ...prev, small: datetime || undefined }))}
                />
                <DateTimePicker
                    label="Default"
                    name="default"
                    value={datetimes.default}
                    onChange={(datetime) => setDatetimes(prev => ({ ...prev, default: datetime || undefined }))}
                />
                <DateTimePicker
                    label="Large"
                    size="lg"
                    name="large"
                    value={datetimes.large}
                    onChange={(datetime) => setDatetimes(prev => ({ ...prev, large: datetime || undefined }))}
                />
            </div>
        );
    }
};

export const CustomStyled: Story = {
    render: () => {
        const [datetime, setDatetime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[600px]">
                <DateTimePicker
                    label="Custom Styled"
                    name="customDatetime"
                    value={datetime}
                    onChange={(datetime) => setDatetime(datetime || undefined)}
                    sx={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        '&:hover': {
                            borderColor: '#3b82f6',
                        },
                    }}
                />
            </div>
        );
    }
}; 