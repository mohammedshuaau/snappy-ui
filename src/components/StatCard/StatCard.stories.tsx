import type {Meta, StoryObj} from '@storybook/react';
import StatCard from './StatCard';

const meta = {
    title: 'Charts/StatCard',
    component: StatCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A versatile stat card component that can display various types of charts (Sparkline, ProgressCircle, or Gauge) 
along with statistical information. Built with dark mode support and modern UI design principles.

\`\`\`jsx
import { StatCard } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <StatCard
      title="Monthly Revenue"
      value="$12,345"
      chartType="sparkline"
      sparklineData={[1, 5, 2, 8, 3, 7]}
      change={12.5}
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
        chartType: {
            control: 'select',
            options: ['sparkline', 'progress', 'gauge'],
        },
    },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSparklineData = [1, 5, 2, 8, 3, 7, 4, 6, 5, 9];

export const Default: Story = {
    args: {
        title: 'Monthly Revenue',
        value: '$12,345',
        chartType: 'sparkline',
        sparklineData: sampleSparklineData,
        change: 12.5,
    },
};

export const WithProgressCircle: Story = {
    args: {
        title: 'Project Progress',
        value: '75%',
        chartType: 'progress',
        progressValue: 75,
        change: 5.2,
    },
};

export const WithGauge: Story = {
    args: {
        title: 'System Load',
        value: '68%',
        chartType: 'gauge',
        progressValue: 68,
        change: -2.3,
    },
};

export const Variants: Story = {
    args: {
        title: 'Monthly Revenue',
        value: '$12,345',
        chartType: 'sparkline',
        sparklineData: sampleSparklineData,
        change: 12.5,
    },
    render: (args) => (
        <div className="grid grid-cols-2 gap-4 max-w-3xl">
            <StatCard {...args} variant="default" />
            <StatCard {...args} variant="primary" />
            <StatCard {...args} variant="success" />
            <StatCard {...args} variant="warning" />
            <StatCard {...args} variant="error" />
        </div>
    ),
};

export const DifferentChartTypes: Story = {
    args: {
        title: 'Monthly Revenue',
        value: '$12,345',
        chartType: 'sparkline',
        sparklineData: sampleSparklineData,
        change: 12.5,
    },
    render: () => (
        <div className="grid grid-cols-3 gap-4 max-w-4xl">
            <StatCard
                title="Monthly Revenue"
                value="$12,345"
                chartType="sparkline"
                sparklineData={sampleSparklineData}
                change={12.5}
            />
            <StatCard
                title="Project Progress"
                value="75%"
                chartType="progress"
                progressValue={75}
                change={5.2}
                variant="success"
            />
            <StatCard
                title="System Load"
                value="68%"
                chartType="gauge"
                progressValue={68}
                change={-2.3}
                variant="warning"
            />
        </div>
    ),
};

export const NoChart: Story = {
    args: {
        title: 'Total Users',
        value: '1,234',
        change: 8.7,
    },
};

export const NoChange: Story = {
    args: {
        title: 'Total Revenue',
        value: '$54,321',
        chartType: 'sparkline',
        sparklineData: sampleSparklineData,
    },
};

export const CustomStyled: Story = {
    args: {
        title: 'Monthly Revenue',
        value: '$12,345',
        chartType: 'sparkline',
        sparklineData: sampleSparklineData,
        change: 12.5,
        sx: {
            transform: 'translateY(-4px)',
            'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            '&:hover': {
                transform: 'translateY(-6px)',
                'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s ease-in-out',
            },
        },
    },
}; 