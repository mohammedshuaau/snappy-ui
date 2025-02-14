import type {Meta, StoryObj} from '@storybook/react';
import {Gauge} from './Gauge';

const meta = {
    title: 'Charts/Gauge',
    component: Gauge,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A gauge chart component built with [Recharts](https://recharts.org/). 
We would like to express our gratitude to the Recharts team for their excellent work 
and making this powerful charting library available to the community.

\`\`\`jsx
import { Gauge } from '@mohammedshuaau/snappy-ui';

function Example() {
  return <Gauge value={75} label="CPU Usage" />;
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
            options: ['default', 'success', 'warning', 'error'],
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg', 'xl'],
        },
        segments: {
            control: 'number',
            min: 2,
            max: 20,
        },
    },
} satisfies Meta<typeof Gauge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 75,
        label: 'CPU Usage',
    },
};

export const Variants: Story = {
    args: {
        value: 75,
        label: 'Usage',
    },
    render: (args) => (
        <div className="flex gap-4 items-end">
            <Gauge {...args} variant="default" />
            <Gauge {...args} variant="success" />
            <Gauge {...args} variant="warning" />
            <Gauge {...args} variant="error" />
        </div>
    ),
};

export const Sizes: Story = {
    args: {
        value: 75,
        label: 'Usage',
    },
    render: (args) => (
        <div className="flex gap-4 items-end">
            <Gauge {...args} size="sm" />
            <Gauge {...args} size="default" />
            <Gauge {...args} size="lg" />
            <Gauge {...args} size="xl" />
        </div>
    ),
};

export const DifferentValues: Story = {
    args: {
        value: 75,
        label: 'Usage',
    },
    render: (args) => (
        <div className="flex gap-4 items-end">
            <Gauge {...args} value={25} />
            <Gauge {...args} value={50} />
            <Gauge {...args} value={75} />
            <Gauge {...args} value={100} />
        </div>
    ),
};

export const DifferentSegments: Story = {
    args: {
        value: 75,
        label: 'Usage',
    },
    render: (args) => (
        <div className="flex gap-4 items-end">
            <Gauge {...args} segments={3} />
            <Gauge {...args} segments={5} />
            <Gauge {...args} segments={7} />
            <Gauge {...args} segments={10} />
        </div>
    ),
};

export const CustomRange: Story = {
    args: {
        value: 75,
        min: 50,
        max: 150,
        label: 'Custom Range',
    },
};

export const WithoutValue: Story = {
    args: {
        value: 75,
        showValue: false,
        label: 'No Value',
    },
};

export const WithoutLabel: Story = {
    args: {
        value: 75,
        showValue: true,
    },
};

export const CustomStyled: Story = {
    args: {
        value: 75,
        label: 'Styled Gauge',
        sx: {
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
            '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
            },
        },
    },
}; 