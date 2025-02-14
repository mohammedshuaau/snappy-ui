import type { Meta, StoryObj } from '@storybook/react';
import PieChart from './PieChart';
import { DataPoint } from '../../types/chart.types';

const meta = {
    title: 'Charts/PieChart',
    component: PieChart,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A pie chart component built with [Recharts](https://recharts.org/). 
Perfect for showing proportional data or part-to-whole relationships.
We would like to express our gratitude to the Recharts team for their excellent work.

\`\`\`jsx
import { PieChart } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <PieChart
      data={[
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
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
        innerRadius: {
            control: 'number',
        },
        outerRadius: {
            control: 'text',
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
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleData: DataPoint[] = [
    { name: 'Group A', value: 400, variant: 'primary' },
    { name: 'Group B', value: 300, variant: 'success' },
    { name: 'Group C', value: 300, variant: 'warning' },
    { name: 'Group D', value: 200, variant: 'error' },
];

export const Default: Story = {
    args: {
        data: sampleData,
        height: 400,
    },
};

export const Variants: Story = {
    args: {
        data: [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
        ],
        height: 300,
    },
    render: (args) => (
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
            <PieChart {...args} variant="default" />
            <PieChart {...args} variant="primary" />
            <PieChart {...args} variant="success" />
            <PieChart {...args} variant="warning" />
            <PieChart {...args} variant="error" />
        </div>
    ),
};

export const DonutChart: Story = {
    args: {
        data: sampleData,
        innerRadius: 60,
        height: 400,
    },
};

export const WithoutLegend: Story = {
    args: {
        data: sampleData,
        showLegend: false,
        height: 400,
    },
};

export const WithoutTooltip: Story = {
    args: {
        data: sampleData,
        showTooltip: false,
        height: 400,
    },
};

export const WithoutAnimation: Story = {
    args: {
        data: sampleData,
        animate: false,
        height: 400,
    },
};

export const CustomSized: Story = {
    args: {
        data: sampleData,
        outerRadius: 60,
        height: 400,
    },
};

export const CustomStyled: Story = {
    args: {
        data: sampleData,
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