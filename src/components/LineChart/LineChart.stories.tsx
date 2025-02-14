import type {Meta, StoryObj} from '@storybook/react';
import {LineChart} from './LineChart';

const meta = {
    title: 'Charts/LineChart',
    component: LineChart,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A line chart component built with [Recharts](https://recharts.org/). 
Perfect for showing trends over time or comparing multiple series of data.
We would like to express our gratitude to the Recharts team for their excellent work.

\`\`\`jsx
import { LineChart } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <LineChart
      data={[
        { month: 'Jan', sales: 100, revenue: 200 },
        { month: 'Feb', sales: 150, revenue: 300 },
      ]}
      series={[
        { dataKey: 'sales', name: 'Sales' },
        { dataKey: 'revenue', name: 'Revenue' },
      ]}
      xAxisKey="month"
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
        showGrid: {
            control: 'boolean',
        },
        showLegend: {
            control: 'boolean',
        },
        showTooltip: {
            control: 'boolean',
        },
        animate: {
            control: 'boolean',
        },
        height: {
            control: 'number',
        },
    },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleData = [
    { month: 'Jan', sales: 100, revenue: 200, profit: 50 },
    { month: 'Feb', sales: 150, revenue: 300, profit: 80 },
    { month: 'Mar', sales: 120, revenue: 250, profit: 60 },
    { month: 'Apr', sales: 200, revenue: 400, profit: 100 },
    { month: 'May', sales: 180, revenue: 350, profit: 90 },
    { month: 'Jun', sales: 250, revenue: 500, profit: 150 },
];

export const Default: Story = {
    args: {
        data: sampleData,
        series: [
            { dataKey: 'sales', name: 'Sales' },
            { dataKey: 'revenue', name: 'Revenue', variant: 'primary' },
            { dataKey: 'profit', name: 'Profit', variant: 'success' },
        ],
        xAxisKey: 'month',
        height: 400,
    },
};

export const Variants: Story = {
    args: {
        data: sampleData,
        series: [{ dataKey: 'sales', name: 'Sales' }],
        xAxisKey: 'month',
        height: 300,
    },
    render: (args) => (
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
            <LineChart {...args} variant="default" />
            <LineChart {...args} variant="primary" />
            <LineChart {...args} variant="success" />
            <LineChart {...args} variant="warning" />
            <LineChart {...args} variant="error" />
        </div>
    ),
};

export const WithoutGrid: Story = {
    args: {
        data: sampleData,
        series: [
            { dataKey: 'sales', name: 'Sales' },
            { dataKey: 'revenue', name: 'Revenue', variant: 'primary' },
        ],
        xAxisKey: 'month',
        showGrid: false,
        height: 400,
    },
};

export const WithoutLegend: Story = {
    args: {
        data: sampleData,
        series: [
            { dataKey: 'sales', name: 'Sales' },
            { dataKey: 'revenue', name: 'Revenue', variant: 'primary' },
        ],
        xAxisKey: 'month',
        showLegend: false,
        height: 400,
    },
};

export const WithoutTooltip: Story = {
    args: {
        data: sampleData,
        series: [
            { dataKey: 'sales', name: 'Sales' },
            { dataKey: 'revenue', name: 'Revenue', variant: 'primary' },
        ],
        xAxisKey: 'month',
        showTooltip: false,
        height: 400,
    },
};

export const WithoutAnimation: Story = {
    args: {
        data: sampleData,
        series: [
            { dataKey: 'sales', name: 'Sales' },
            { dataKey: 'revenue', name: 'Revenue', variant: 'primary' },
        ],
        xAxisKey: 'month',
        animate: false,
        height: 400,
    },
};

export const CustomDots: Story = {
    args: {
        data: sampleData,
        series: [
            { dataKey: 'sales', name: 'Sales', dot: false },
            { dataKey: 'revenue', name: 'Revenue', variant: 'primary', dot: true },
        ],
        xAxisKey: 'month',
        height: 400,
    },
};

export const CustomStrokeWidth: Story = {
    args: {
        data: sampleData,
        series: [
            { dataKey: 'sales', name: 'Sales', strokeWidth: 1 },
            { dataKey: 'revenue', name: 'Revenue', variant: 'primary', strokeWidth: 3 },
        ],
        xAxisKey: 'month',
        height: 400,
    },
};

export const CustomStyled: Story = {
    args: {
        data: sampleData,
        series: [
            { dataKey: 'sales', name: 'Sales' },
            { dataKey: 'revenue', name: 'Revenue', variant: 'primary' },
        ],
        xAxisKey: 'month',
        height: 400,
        sx: {
            padding: '1.5rem',
            'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            '&:hover': {
                'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'box-shadow 0.2s ease-in-out',
            },
        },
    },
}; 