import type {Meta, StoryObj} from '@storybook/react';
import {ProgressCircle} from './ProgressCircle';

const meta = {
    title: 'Charts/ProgressCircle',
    component: ProgressCircle,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A circular progress indicator component built with [Recharts](https://recharts.org/). 
We would like to express our gratitude to the Recharts team for their excellent work 
and making this powerful charting library available to the community.

\`\`\`jsx
import { ProgressCircle } from '@mohammedshuaau/snappy-ui';

function Example() {
  return <ProgressCircle value={75} />;
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
    },
} satisfies Meta<typeof ProgressCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 75,
    },
};

export const Variants: Story = {
    args: {
        value: 75,
    },
    render: (args) => (
        <div className="flex gap-4 items-center">
            <ProgressCircle {...args} variant="default" />
            <ProgressCircle {...args} variant="success" />
            <ProgressCircle {...args} variant="warning" />
            <ProgressCircle {...args} variant="error" />
        </div>
    ),
};

export const Sizes: Story = {
    args: {
        value: 75,
    },
    render: (args) => (
        <div className="flex gap-4 items-center">
            <ProgressCircle {...args} size="sm" />
            <ProgressCircle {...args} size="default" />
            <ProgressCircle {...args} size="lg" />
            <ProgressCircle {...args} size="xl" />
        </div>
    ),
};

export const DifferentValues: Story = {
    args: {
        value: 75,
    },
    render: () => (
        <div className="flex gap-4 items-center">
            <ProgressCircle value={25} />
            <ProgressCircle value={50} />
            <ProgressCircle value={75} />
            <ProgressCircle value={100} />
        </div>
    ),
};

export const DifferentThickness: Story = {
    args: {
        value: 75,
    },
    render: (args) => (
        <div className="flex gap-4 items-center">
            <ProgressCircle {...args} thickness={4} />
            <ProgressCircle {...args} thickness={8} />
            <ProgressCircle {...args} thickness={12} />
            <ProgressCircle {...args} thickness={16} />
        </div>
    ),
};

export const WithoutValue: Story = {
    args: {
        value: 75,
        showValue: false,
    },
};

export const CustomStyled: Story = {
    args: {
        value: 75,
        sx: {
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
            '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
            },
        },
    },
}; 