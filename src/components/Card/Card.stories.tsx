import type {Meta, StoryObj} from '@storybook/react';
import {Card, CardImage} from './Card';

const meta: Meta<typeof Card> = {
    title: 'Data Display/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card
export const Basic: Story = {
    args: {
        children: (
            <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Basic Card</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                    A simple card with some content.
                </p>
            </div>
        ),
    },
};

// Variants
export const Variants: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Card variant="flat">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Flat Card</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">With subtle shadow</p>
            </Card>
            <Card variant="outlined">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Outlined Card</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">With border</p>
            </Card>
            <Card variant="elevated">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Elevated Card</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">With pronounced shadow</p>
            </Card>
        </div>
    ),
};

// Padding Sizes
export const PaddingSizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Card padding="none">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">No Padding</h3>
                </div>
                <div className="p-4">
                    <p className="text-slate-600 dark:text-slate-300">Content with custom padding</p>
                </div>
            </Card>
            <Card padding="sm">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Small Padding</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Compact layout</p>
            </Card>
            <Card padding="md">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Medium Padding</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Default padding</p>
            </Card>
            <Card padding="lg">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Large Padding</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Spacious layout</p>
            </Card>
        </div>
    ),
};

// Border Radius
export const BorderRadius: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Card radius="none">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">No Radius</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Square corners</p>
            </Card>
            <Card radius="sm">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Small Radius</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Slightly rounded</p>
            </Card>
            <Card radius="md">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Medium Radius</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Default roundness</p>
            </Card>
            <Card radius="lg">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Large Radius</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Very rounded</p>
            </Card>
        </div>
    ),
};

// Interactive Card
export const Interactive: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Card isHoverable>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Hoverable Card</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Hover to see effect</p>
            </Card>
            <Card isClickable>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Clickable Card</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Click to see effect</p>
            </Card>
            <Card isHoverable isClickable>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Hoverable & Clickable</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Both effects combined</p>
            </Card>
        </div>
    ),
};

// With Image
export const WithImage: Story = {
    render: () => (
        <div className="flex flex-col gap-4 max-w-sm">
            <Card padding="none">
                <CardImage
                    src="https://source.unsplash.com/random/800x400"
                    alt="Random image"
                    aspectRatio="video"
                />
                <div className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Card with Image</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Image with 16:9 aspect ratio
                    </p>
                </div>
            </Card>
            <Card padding="none">
                <CardImage
                    src="https://source.unsplash.com/random/800x800"
                    alt="Random square image"
                    aspectRatio="square"
                    radius="md"
                />
                <div className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Rounded Image</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Square image with rounded corners
                    </p>
                </div>
            </Card>
        </div>
    ),
};

// With Image Overlay
export const WithImageOverlay: Story = {
    render: () => (
        <div className="max-w-sm">
            <Card padding="none">
                <CardImage
                    src="https://source.unsplash.com/random/800x400"
                    alt="Random image"
                    aspectRatio="video"
                    overlay={
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-xl font-semibold text-white">
                                Overlay Title
                            </h3>
                            <p className="mt-2 text-white/80">
                                Content overlaid on the image
                            </p>
                        </div>
                    }
                />
                <div className="p-4">
                    <p className="text-slate-600 dark:text-slate-300">
                        Additional content below the image
                    </p>
                </div>
            </Card>
        </div>
    ),
};

// Custom Styled
export const CustomStyled: Story = {
    args: {
        sx: {
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            color: 'white',
            '&:hover': {
                transform: 'translateY(-4px)',
            },
        },
        children: (
            <div>
                <h3 className="text-lg font-semibold text-white">Custom Styled Card</h3>
                <p className="mt-2 text-white/80">
                    Using custom gradient background
                </p>
            </div>
        ),
    },
};
