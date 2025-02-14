import type {Meta, StoryObj} from '@storybook/react';
import {Heatmap} from './Heatmap';

const meta = {
    title: 'Charts/Heatmap',
    component: Heatmap,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A heatmap visualization component that displays data intensity using color gradients.
Perfect for showing patterns in multi-dimensional data, such as activity over time,
temperature variations, or any other metric that benefits from a color-coded matrix representation.

\`\`\`jsx
import { Heatmap } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <Heatmap
      data={[
        { x: 'Mon', y: '9AM', value: 5 },
        { x: 'Mon', y: '12PM', value: 10 },
        { x: 'Mon', y: '3PM', value: 15 },
      ]}
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
        variant: {
            control: 'select',
            options: ['default', 'primary', 'success', 'warning', 'error'],
        },
        showTooltips: {
            control: 'boolean',
        },
        showLabels: {
            control: 'boolean',
        },
        height: {
            control: 'number',
        },
    },
} satisfies Meta<typeof Heatmap>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for the heatmap
const generateWeeklyActivityData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

    return days.flatMap(day =>
        hours.map(hour => ({
            x: day,
            y: hour,
            value: Math.floor(Math.random() * 100),
        }))
    );
};

export const Default: Story = {
    args: {
        data: generateWeeklyActivityData(),
        height: 400,
    },
};

export const Variants: Story = {
    args: {
        data: generateWeeklyActivityData(),
        height: 300,
    },
    render: (args) => (
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
            <Heatmap {...args} variant="default" />
            <Heatmap {...args} variant="primary" />
            <Heatmap {...args} variant="success" />
            <Heatmap {...args} variant="warning" />
            <Heatmap {...args} variant="error" />
        </div>
    ),
};

// Generate monthly data
const generateMonthlyData = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

    return days.flatMap(day =>
        hours.map(hour => ({
            x: day,
            y: hour,
            value: Math.floor(Math.random() * 100),
        }))
    );
};

export const MonthlyView: Story = {
    args: {
        data: generateMonthlyData(),
        height: 600,
    },
};

export const WithoutTooltips: Story = {
    args: {
        data: generateWeeklyActivityData(),
        showTooltips: false,
        height: 300,
    },
};

export const WithoutLabels: Story = {
    args: {
        data: generateWeeklyActivityData(),
        showLabels: false,
        height: 300,
    },
};

// Generate GitHub-style contributions data
const generateContributionsData = () => {
    const weeks = 52;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return Array.from({ length: weeks * 7 }, (_, i) => ({
        x: Math.floor(i / 7),
        y: days[i % 7],
        value: Math.floor(Math.random() * 10),
    }));
};

export const GitHubStyle: Story = {
    args: {
        data: generateContributionsData(),
        variant: 'success',
        height: 200,
        showTooltips: true,
    },
};

export const CustomStyled: Story = {
    args: {
        data: generateWeeklyActivityData(),
        height: 300,
        sx: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            '&:hover': {
                transform: 'scale(1.01)',
                transition: 'transform 0.2s ease-in-out',
            },
        },
    },
}; 