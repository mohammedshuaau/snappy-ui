import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {addDays} from 'date-fns';
import DatePicker from './DatePicker';

const meta = {
    title: 'Form/DatePicker',
    component: DatePicker,
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
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <DatePicker
                    name="date"
                    value={date}
                    onChange={(date) => setDate(date || undefined)}
                    placeholder="Select a date"
                />
            </div>
        );
    }
};

export const WithLabel: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <DatePicker
                    label="Date of Birth"
                    name="dob"
                    value={date}
                    onChange={(date) => setDate(date || undefined)}
                    placeholder="MM/DD/YYYY"
                />
            </div>
        );
    }
};

export const WithHelperText: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <DatePicker
                    label="Event Date"
                    helperText="Please select the date of your event"
                    name="eventDate"
                    value={date}
                    onChange={(date) => setDate(date || undefined)}
                    placeholder="Choose event date"
                />
            </div>
        );
    }
};

export const WithValue: Story = {
    render: () => {
        const [date, setDate] = useState<Date>(new Date('2024-03-15'));
        return (
            <div className="w-[300px]">
                <DatePicker
                    label="Selected Date"
                    value={date}
                    onChange={(newDate) => newDate && setDate(newDate)}
                    name="selectedDate"
                    placeholder="Select a date"
                />
            </div>
        );
    }
};

export const WithMinMaxDates: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <DatePicker
                    label="2024 Date"
                    helperText="Select a date in 2024"
                    minDate={new Date('2024-01-01')}
                    maxDate={new Date('2024-12-31')}
                    name="date2024"
                    value={date}
                    onChange={(date) => setDate(date || undefined)}
                    placeholder="Select date in 2024"
                />
            </div>
        );
    }
};

export const WithDisabledWeekends: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <DatePicker
                    label="Business Days Only"
                    helperText="Weekends are disabled"
                    name="businessDate"
                    value={date}
                    onChange={(date) => setDate(date || undefined)}
                    disableWeekends
                    placeholder="Select business day"
                />
            </div>
        );
    }
};

export const WithDisabledDates: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <DatePicker
                    label="Select Available Date"
                    helperText="Next 4 weekends are disabled"
                    name="availableDate"
                    value={date}
                    onChange={(date) => setDate(date || undefined)}
                    disabledDates={[
                        // Disable next 4 weekends
                        ...Array.from({ length: 4 }, (_, i) => {
                            const saturday = addDays(new Date(), ((6 - new Date().getDay()) % 7) + (i * 7));
                            const sunday = addDays(saturday, 1);
                            return [saturday, sunday];
                        }).flat(),
                    ]}
                    placeholder="Select available date"
                />
            </div>
        );
    }
};

export const WithSpecificDisabledDates: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <DatePicker
                    label="Holiday Booking"
                    helperText="Some dates are unavailable"
                    name="holidayDate"
                    value={date}
                    onChange={(date) => setDate(date || undefined)}
                    disabledDates={[
                        new Date('2024-03-15'), // Specific date
                        new Date('2024-03-16'), // Another specific date
                        new Date('2024-03-17'), // Another specific date
                    ]}
                    minDate={new Date('2024-03-01')}
                    maxDate={new Date('2024-03-31')}
                    placeholder="Select holiday date"
                />
            </div>
        );
    }
};

export const WithError: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <DatePicker
                    label="Due Date"
                    variant="error"
                    helperText="Please select a valid date"
                    name="dueDate"
                    value={date}
                    onChange={(date) => setDate(date || undefined)}
                    placeholder="Select due date"
                />
            </div>
        );
    }
};

export const Disabled: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <DatePicker
                    label="Disabled Date"
                    disabled
                    helperText="This field is not editable"
                    name="disabledDate"
                    value={date}
                    onChange={(date) => setDate(date || undefined)}
                    placeholder="Date selection disabled"
                />
            </div>
        );
    }
};

export const Sizes: Story = {
    render: () => {
        const [dates, setDates] = useState({
            small: undefined as Date | undefined,
            default: undefined as Date | undefined,
            large: undefined as Date | undefined,
        });

        return (
            <div className="space-y-4 w-[300px]">
                <DatePicker
                    label="Small"
                    size="sm"
                    name="small"
                    value={dates.small}
                    onChange={(date) => setDates(prev => ({ ...prev, small: date || undefined }))}
                    placeholder="Small size date"
                />
                <DatePicker
                    label="Default"
                    name="default"
                    value={dates.default}
                    onChange={(date) => setDates(prev => ({ ...prev, default: date || undefined }))}
                    placeholder="Default size date"
                />
                <DatePicker
                    label="Large"
                    size="lg"
                    name="large"
                    value={dates.large}
                    onChange={(date) => setDates(prev => ({ ...prev, large: date || undefined }))}
                    placeholder="Large size date"
                />
            </div>
        );
    }
};

export const CustomStyled: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <DatePicker
                    label="Custom Styled"
                    name="customDate"
                    value={date}
                    onChange={(date) => setDate(date || undefined)}
                    placeholder="Select date"
                    sx={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.75rem',
                        '&:hover': {
                            borderColor: '#3b82f6',
                        },
                    }}
                />
            </div>
        );
    }
}; 