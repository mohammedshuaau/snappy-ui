import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Calendar, CalendarEvent} from './Calendar';

const meta = {
    title: 'Advanced/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A feature-rich calendar component with event support, date selection, and customizable styling.

Features:
- Event display with customizable colors and descriptions
- Date selection with range constraints
- Month navigation with "Today" button
- Week numbers display option
- Dark mode support
- Multiple style variants
- Event click handling
- Responsive design

\`\`\`jsx
import { Calendar } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <Calendar
      events={[
        { 
          id: '1', 
          title: 'Meeting', 
          date: new Date(),
          color: '#3b82f6',
          description: 'Team sync meeting'
        }
      ]}
      onSelect={(date) => console.log('Selected:', date)}
      onEventClick={(event) => console.log('Event clicked:', event)}
    />
  );
}
\`\`\`
`,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        // Core props
        selected: {
            control: 'date',
            description: 'Currently selected date',
            table: {
                type: { summary: 'Date' },
                defaultValue: { summary: 'undefined' },
            },
        },
        month: {
            control: 'date',
            description: 'Initial month to display',
            table: {
                type: { summary: 'Date' },
                defaultValue: { summary: 'current month' },
            },
        },
        events: {
            control: 'object',
            description: 'Array of events to display on the calendar',
            table: {
                type: { summary: 'CalendarEvent[]' },
                defaultValue: { summary: '[]' },
            },
        },

        // Callbacks
        onSelect: {
            action: 'selected',
            description: 'Callback when a date is selected',
            table: {
                type: { summary: '(date: Date) => void' },
            },
        },
        onMonthChange: {
            action: 'month changed',
            description: 'Callback when the displayed month changes',
            table: {
                type: { summary: '(date: Date) => void' },
            },
        },
        onEventClick: {
            action: 'event clicked',
            description: 'Callback when an event is clicked',
            table: {
                type: { summary: '(event: CalendarEvent) => void' },
            },
        },

        // Display options
        variant: {
            control: 'select',
            options: ['default', 'compact', 'minimal'],
            description: 'Visual style variant',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
            },
        },
        showWeekNumbers: {
            control: 'boolean',
            description: 'Whether to show week numbers',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        showEvents: {
            control: 'boolean',
            description: 'Whether to show events on the calendar',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        showNavigation: {
            control: 'boolean',
            description: 'Whether to show month navigation controls',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        showEventDetails: {
            control: 'boolean',
            description: 'Whether to show event details in tooltips',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },

        // Constraints
        minDate: {
            control: 'date',
            description: 'Minimum selectable date',
            table: {
                type: { summary: 'Date' },
                defaultValue: { summary: 'undefined' },
            },
        },
        maxDate: {
            control: 'date',
            description: 'Maximum selectable date',
            table: {
                type: { summary: 'Date' },
                defaultValue: { summary: 'undefined' },
            },
        },

        // Styling
        sx: {
            control: 'object',
            description: 'Custom CSS properties',
            table: {
                type: { summary: 'React.CSSProperties' },
                defaultValue: { summary: 'undefined' },
            },
        },
        className: {
            control: 'text',
            description: 'Additional CSS class names',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
            },
        },
    },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to generate sample events
const generateSampleEvents = (): CalendarEvent[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return [
        {
            id: '1',
            title: 'Team Meeting',
            date: today,
            color: '#3b82f6',
            description: 'Weekly team sync meeting',
        },
        {
            id: '2',
            title: 'Project Deadline',
            date: tomorrow,
            color: '#ef4444',
            description: 'Final submission due',
        },
        {
            id: '3',
            title: 'Client Presentation',
            date: nextWeek,
            color: '#10b981',
            description: 'Present Q1 results',
        },
    ];
};

export const Default: Story = {
    args: {
        events: generateSampleEvents(),
    },
};

export const WithEventHandling: Story = {
    args: {
        events: generateSampleEvents(),
        showEventDetails: true,
    },
    render: (args) => {
        const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
        const [lastClickedEvent, setLastClickedEvent] = React.useState<CalendarEvent | undefined>(undefined);

        return (
            <div className="space-y-4">
                <Calendar
                    {...args}
                    selected={selectedDate}
                    onSelect={(date) => {
                        setSelectedDate(date);
                        console.log('Date selected:', date);
                    }}
                    onEventClick={(event) => {
                        setLastClickedEvent(event);
                        console.log('Event clicked:', event);
                    }}
                />
                {lastClickedEvent && (
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                            Last Clicked Event:
                        </h3>
                        <div className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <p><span className="font-medium">Title:</span> {lastClickedEvent.title}</p>
                            <p><span className="font-medium">Date:</span> {lastClickedEvent.date.toLocaleDateString()}</p>
                            {lastClickedEvent.description && (
                                <p><span className="font-medium">Description:</span> {lastClickedEvent.description}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    },
};

export const Variants: Story = {
    args: {
        events: generateSampleEvents(),
    },
    render: (args) => (
        <div className="grid grid-cols-3 gap-8">
            <Calendar {...args} variant="default" />
            <Calendar {...args} variant="compact" />
            <Calendar {...args} variant="minimal" />
        </div>
    ),
};

export const WithWeekNumbers: Story = {
    args: {
        events: generateSampleEvents(),
        showWeekNumbers: true,
    },
};

export const WithoutEvents: Story = {
    args: {
        showEvents: false,
    },
};

export const WithoutNavigation: Story = {
    args: {
        events: generateSampleEvents(),
        showNavigation: false,
    },
};

export const CustomStyled: Story = {
    args: {
        events: generateSampleEvents(),
        sx: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'box-shadow 0.2s ease-in-out',
            '&:hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
        } as React.CSSProperties,
    },
};

export const FullCalendar: Story = {
    args: {
        month: new Date(2024, 2, 1),
        events: generateSampleEvents(),
    },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'A full-width calendar with multiple events, perfect for main calendar views in applications.',
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="p-8 min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="max-w-6xl mx-auto">
                    <Story />
                </div>
            </div>
        ),
    ],
}; 