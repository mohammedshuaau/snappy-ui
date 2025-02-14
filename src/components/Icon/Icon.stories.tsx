import type {Meta, StoryObj} from '@storybook/react';
import {Icon} from './Icon';

const meta = {
    title: 'Media/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A flexible icon component powered by [Tabler Icons](https://tabler-icons.io/), 
a collection of over 4,200 open source icons. We would like to express our gratitude 
to the Tabler Icons team for their excellent work and making these icons available 
to the community.

\`\`\`jsx
import { Icon } from '@mohammedshuaau/snappy-ui';
import { IconHeart } from '@tabler/icons-react';

function Example() {
  return <Icon name="IconHeart" />;
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
            options: ['default', 'primary', 'secondary', 'success', 'warning', 'error'],
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg', 'xl'],
        },
        stroke: {
            control: 'select',
            options: ['thin', 'default', 'medium', 'bold'],
        },
    },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'IconHeart',
    },
};

export const Variants: Story = {
    args: {
        name: 'IconHeart',
    },
    render: (args) => (
        <div className="flex gap-4 items-center">
            <Icon {...args} variant="default" />
            <Icon {...args} variant="primary" />
            <Icon {...args} variant="secondary" />
            <Icon {...args} variant="success" />
            <Icon {...args} variant="warning" />
            <Icon {...args} variant="error" />
        </div>
    ),
};

export const Sizes: Story = {
    args: {
        name: 'IconHeart',
    },
    render: (args) => (
        <div className="flex gap-4 items-center">
            <Icon {...args} size="sm" />
            <Icon {...args} size="default" />
            <Icon {...args} size="lg" />
            <Icon {...args} size="xl" />
        </div>
    ),
};

export const Strokes: Story = {
    args: {
        name: 'IconHeart',
    },
    render: (args) => (
        <div className="flex gap-4 items-center">
            <Icon {...args} stroke="thin" />
            <Icon {...args} stroke="default" />
            <Icon {...args} stroke="medium" />
            <Icon {...args} stroke="bold" />
        </div>
    ),
};

export const CommonIcons: Story = {
    args: {
        name: 'IconHeart',
        size: 'default',
    },
    render: (args) => (
        <div className="grid grid-cols-5 gap-4">
            <div className="flex flex-col items-center gap-2">
                <Icon {...args} name="IconHeart" />
                <span className="text-sm">Heart</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Icon {...args} name="IconStar" />
                <span className="text-sm">Star</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Icon {...args} name="IconUser" />
                <span className="text-sm">User</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Icon {...args} name="IconSettings" />
                <span className="text-sm">Settings</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Icon {...args} name="IconBell" />
                <span className="text-sm">Bell</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Icon {...args} name="IconBookmark" />
                <span className="text-sm">Bookmark</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Icon {...args} name="IconCheck" />
                <span className="text-sm">Check</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Icon {...args} name="IconX" />
                <span className="text-sm">Close</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Icon {...args} name="IconAlertTriangle" />
                <span className="text-sm">Alert</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Icon {...args} name="IconInfoCircle" />
                <span className="text-sm">Info</span>
            </div>
        </div>
    ),
};

export const CustomStyled: Story = {
    args: {
        name: 'IconHeart',
        sx: {
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
            '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s ease-in-out',
            },
        },
    },
}; 