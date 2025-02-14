import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {parse, set} from 'date-fns';
import {TimePicker} from './TimePicker';

const meta = {
    title: 'Form/TimePicker',
    component: TimePicker,
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
        format: {
            control: 'select',
            options: ['12h', '24h'],
        },
        showDropdown: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <TimePicker
                    name="time"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                />
            </div>
        );
    }
};

export const WithLabel: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Meeting Time"
                    name="meetingTime"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                />
            </div>
        );
    }
};

export const WithHelperText: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Appointment Time"
                    helperText="Select your preferred appointment time"
                    name="appointmentTime"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                />
            </div>
        );
    }
};

export const WithDropdown: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Meeting Time"
                    helperText="Click to show time slots"
                    name="meetingTime"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                    showDropdown
                />
            </div>
        );
    }
};

export const WithDropdownAndTimeStep: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Meeting Slot"
                    helperText="15-minute interval slots"
                    name="meetingSlot"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                    step={15}
                    showDropdown
                />
            </div>
        );
    }
};

export const TwelveHourFormat: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Meeting Time"
                    name="meetingTime"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                    format="12h"
                />
            </div>
        );
    }
};

export const WithValue: Story = {
    render: () => {
        const [time, setTime] = useState<Date>(
            parse('14:30', 'HH:mm', new Date())
        );
        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Selected Time"
                    value={time}
                    onChange={(newTime) => newTime && setTime(newTime)}
                    name="selectedTime"
                />
            </div>
        );
    }
};

export const WithMinMaxTimes: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        const today = new Date();
        const minTime = set(today, { hours: 9, minutes: 0 });
        const maxTime = set(today, { hours: 17, minutes: 0 });

        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Business Hours"
                    helperText="Select a time between 9 AM and 5 PM"
                    minTime={minTime}
                    maxTime={maxTime}
                    name="businessHours"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                />
            </div>
        );
    }
};

export const WithDropdownAndMinMaxTimes: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        const today = new Date();
        const minTime = set(today, { hours: 9, minutes: 0 });
        const maxTime = set(today, { hours: 17, minutes: 0 });

        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Business Hours"
                    helperText="Business hours with dropdown"
                    minTime={minTime}
                    maxTime={maxTime}
                    name="businessHoursDropdown"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                    showDropdown
                />
            </div>
        );
    }
};

export const WithDisabledTimes: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        const today = new Date();
        const disabledTimes = [
            set(today, { hours: 12, minutes: 0 }), // Lunch break
            set(today, { hours: 12, minutes: 30 }),
            set(today, { hours: 13, minutes: 0 }),
        ];

        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Available Slots"
                    helperText="Lunch break (12-1 PM) is disabled"
                    name="availableSlot"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                    disabledTimes={disabledTimes}
                    showDropdown
                />
            </div>
        );
    }
};

export const WithError: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Meeting Time"
                    variant="error"
                    helperText="Please select a valid time"
                    name="errorTime"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                />
            </div>
        );
    }
};

export const Disabled: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Closed Time"
                    disabled
                    helperText="This time slot is not available"
                    name="disabledTime"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
                />
            </div>
        );
    }
};

export const Sizes: Story = {
    render: () => {
        const [times, setTimes] = useState({
            small: undefined as Date | undefined,
            default: undefined as Date | undefined,
            large: undefined as Date | undefined,
        });

        return (
            <div className="space-y-4 w-[300px]">
                <TimePicker
                    label="Small"
                    size="sm"
                    name="small"
                    value={times.small}
                    onChange={(time) => setTimes(prev => ({ ...prev, small: time || undefined }))}
                />
                <TimePicker
                    label="Default"
                    name="default"
                    value={times.default}
                    onChange={(time) => setTimes(prev => ({ ...prev, default: time || undefined }))}
                />
                <TimePicker
                    label="Large"
                    size="lg"
                    name="large"
                    value={times.large}
                    onChange={(time) => setTimes(prev => ({ ...prev, large: time || undefined }))}
                />
            </div>
        );
    }
};

export const CustomStyled: Story = {
    render: () => {
        const [time, setTime] = useState<Date | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <TimePicker
                    label="Custom Styled"
                    name="customTime"
                    value={time}
                    onChange={(time) => setTime(time || undefined)}
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