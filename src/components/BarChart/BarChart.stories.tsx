import type {Meta, StoryObj} from '@storybook/react';
import {BarChart} from './BarChart';
import {DataPoint, DataSeries} from '../../types/chart.types.ts';

const meta = {
    title: 'Charts/BarChart',
    component: BarChart,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A bar chart component built with [Recharts](https://recharts.org/). 
Perfect for comparing quantities across categories or showing data distribution.
We would like to express our gratitude to the Recharts team for their excellent work.

\`\`\`jsx
import { BarChart } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <BarChart
      data={[
        { category: 'A', value1: 100, value2: 200 },
        { category: 'B', value1: 150, value2: 300 },
      ]}
      series={[
        { dataKey: 'value1', name: 'Value 1' },
        { dataKey: 'value2', name: 'Value 2' },
      ]}
      xAxisKey="category"
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
        layout: {
            control: 'select',
            options: ['vertical', 'horizontal'],
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
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleData: DataPoint[] = [
    { category: 'Category A', value1: 100, value2: 200, value3: 150 },
    { category: 'Category B', value1: 150, value2: 300, value3: 200 },
    { category: 'Category C', value1: 120, value2: 250, value3: 180 },
    { category: 'Category D', value1: 200, value2: 400, value3: 300 },
    { category: 'Category E', value1: 180, value2: 350, value3: 250 },
];

const sampleSeries: DataSeries[] = [
    { dataKey: 'value1', name: 'Value 1' },
    { dataKey: 'value2', name: 'Value 2', variant: 'primary' },
    { dataKey: 'value3', name: 'Value 3', variant: 'success' },
];

export const Default: Story = {
    args: {
        data: sampleData,
        series: sampleSeries,
        xAxisKey: 'category',
        layout: 'horizontal',
        height: 400,
    },
};

export const Variants: Story = {
    args: {
        data: sampleData.slice(0, 3),
        series: [{ dataKey: 'value1', name: 'Value' }],
        xAxisKey: 'category',
        layout: 'horizontal',
        height: 300,
    },
    render: (args) => (
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
            <BarChart {...args} variant="default" />
            <BarChart {...args} variant="primary" />
            <BarChart {...args} variant="success" />
            <BarChart {...args} variant="warning" />
            <BarChart {...args} variant="error" />
        </div>
    ),
};

export const VerticalLayout: Story = {
    args: {
        data: sampleData,
        series: sampleSeries,
        xAxisKey: 'category',
        layout: 'vertical',
        height: 400,
    },
};

export const StackedBars: Story = {
    args: {
        data: sampleData,
        series: sampleSeries.map(s => ({ ...s, stackId: 'stack1' })),
        xAxisKey: 'category',
        layout: 'horizontal',
        height: 400,
    },
};

export const WithoutGrid: Story = {
    args: {
        data: sampleData,
        series: sampleSeries,
        xAxisKey: 'category',
        layout: 'horizontal',
        showGrid: false,
        height: 400,
    },
};

export const WithoutLegend: Story = {
    args: {
        data: sampleData,
        series: sampleSeries,
        xAxisKey: 'category',
        layout: 'horizontal',
        showLegend: false,
        height: 400,
    },
};

export const WithoutTooltip: Story = {
    args: {
        data: sampleData,
        series: sampleSeries,
        xAxisKey: 'category',
        layout: 'horizontal',
        showTooltip: false,
        height: 400,
    },
};

export const WithoutAnimation: Story = {
    args: {
        data: sampleData,
        series: sampleSeries,
        xAxisKey: 'category',
        layout: 'horizontal',
        animate: false,
        height: 400,
    },
};

export const CustomStyled: Story = {
    args: {
        data: sampleData,
        series: sampleSeries,
        xAxisKey: 'category',
        layout: 'horizontal',
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