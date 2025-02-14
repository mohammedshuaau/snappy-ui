import type {Meta, StoryObj} from '@storybook/react';
import {Sparkline} from './Sparkline';

const meta = {
    title: 'Charts/Sparkline',
    component: Sparkline,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A sparkline chart component built with [Recharts](https://recharts.org/). 
We would like to express our gratitude to the Recharts team for their excellent work 
and making this powerful charting library available to the community.

\`\`\`jsx
import { Sparkline } from '@mohammedshuaau/snappy-ui';

function Example() {
  return <Sparkline data={[1, 5, 2, 8, 3, 7]} />;
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
        strokeWidth: {
            control: 'number',
            min: 1,
            max: 10,
        },
    },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [1, 5, 2, 8, 3, 7, 4, 6, 5, 9];

export const Default: Story = {
    args: {
        data: sampleData,
    },
};

export const Variants: Story = {
    args: {
        data: sampleData,
    },
    render: (args) => (
        <div className="flex gap-4 items-center">
            <Sparkline {...args} variant="default" />
            <Sparkline {...args} variant="success" />
            <Sparkline {...args} variant="warning" />
            <Sparkline {...args} variant="error" />
        </div>
    ),
};

export const Sizes: Story = {
    args: {
        data: sampleData,
    },
    render: (args) => (
        <div className="flex gap-4 items-center">
            <Sparkline {...args} size="sm" />
            <Sparkline {...args} size="default" />
            <Sparkline {...args} size="lg" />
            <Sparkline {...args} size="xl" />
        </div>
    ),
};

export const WithArea: Story = {
    args: {
        data: sampleData,
        showArea: true,
    },
};

export const WithDots: Story = {
    args: {
        data: sampleData,
        showDots: true,
    },
};

export const DifferentStrokeWidths: Story = {
    args: {
        data: sampleData,
    },
    render: (args) => (
        <div className="flex gap-4 items-center">
            <Sparkline {...args} strokeWidth={1} />
            <Sparkline {...args} strokeWidth={2} />
            <Sparkline {...args} strokeWidth={3} />
            <Sparkline {...args} strokeWidth={4} />
        </div>
    ),
};

export const DifferentDataSets: Story = {
    args: {
        data: [1, 2, 3, 4, 5],
    },
    render: () => (
        <div className="flex gap-4 items-center">
            <Sparkline data={[1, 2, 3, 4, 5]} />
            <Sparkline data={[5, 4, 3, 2, 1]} />
            <Sparkline data={[1, 4, 2, 5, 3]} />
            <Sparkline data={[3, 1, 4, 1, 5]} />
        </div>
    ),
};

export const CustomStyled: Story = {
    args: {
        data: sampleData,
        sx: {
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
            '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
            },
        },
    },
}; 