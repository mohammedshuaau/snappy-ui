import type {Meta, StoryObj} from '@storybook/react';
import {Link} from './Link';

const meta = {
    title: 'Navigation/Link',
    component: Link,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile link component that supports different styles, sizes, and features like icons and external links.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        href: '#',
        children: 'Default Link',
    },
};

export const Variants: Story = {
    render: () => (
        <div className="space-y-4">
            <div>
                <Link href="#" variant="default">Default Link</Link>
            </div>
            <div>
                <Link href="#" variant="subtle">Subtle Link</Link>
            </div>
            <div>
                <Link href="#" variant="underline">Underline Link</Link>
            </div>
            <div>
                <Link href="#" variant="ghost">Ghost Link</Link>
            </div>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="space-y-4">
            <div>
                <Link href="#" size="sm">Small Link</Link>
            </div>
            <div>
                <Link href="#" size="md">Medium Link</Link>
            </div>
            <div>
                <Link href="#" size="lg">Large Link</Link>
            </div>
        </div>
    ),
};

export const WithLeftIcon: Story = {
    args: {
        href: '#',
        children: 'Link with Left Icon',
        leftIcon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
        ),
    },
};

export const WithRightIcon: Story = {
    args: {
        href: '#',
        children: 'Link with Right Icon',
        rightIcon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        ),
    },
};

export const ExternalLink: Story = {
    args: {
        href: 'https://example.com',
        children: 'External Link',
        external: true,
    },
};

export const CustomStyling: Story = {
    args: {
        href: '#',
        children: 'Custom Styled Link',
        sx: {
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            color: 'white',
            '&:hover': {
                opacity: 0.9,
            },
        },
    },
}; 