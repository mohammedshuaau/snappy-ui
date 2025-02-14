import type {Meta, StoryObj} from '@storybook/react';
import {Breadcrumb} from './Breadcrumb';

const meta = {
    title: 'Navigation/Breadcrumb',
    component: Breadcrumb,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A breadcrumb navigation component that helps users keep track of their location within the application.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic breadcrumb
export const Basic: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Laptops' },
        ],
    },
};

// With custom separator
export const CustomSeparator: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Laptops' },
        ],
        separator: '>',
    },
};

// With icons
export const WithIcons: Story = {
    args: {
        items: [
            {
                label: 'Home',
                href: '/',
                icon: (
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                ),
            },
            {
                label: 'Products',
                href: '/products',
                icon: (
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                ),
            },
            {
                label: 'Electronics',
                href: '/products/electronics',
                icon: (
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                    </svg>
                ),
            },
            { label: 'Laptops' },
        ],
    },
};

// Different sizes
export const Sizes: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Laptops' },
        ],
    },
    render: (args) => (
        <div className="space-y-4">
            <Breadcrumb
                {...args}
                size="sm"
            />
            <Breadcrumb
                {...args}
            />
            <Breadcrumb
                {...args}
                size="lg"
            />
        </div>
    ),
};

// Collapsed breadcrumb
export const Collapsed: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Computers', href: '/products/electronics/computers' },
            { label: 'Laptops', href: '/products/electronics/computers/laptops' },
            { label: 'Gaming Laptops' },
        ],
        maxItems: 4,
    },
};

// Primary variant
export const Primary: Story = {
    args: {
        variant: 'primary',
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Laptops' },
        ],
    },
};

// Custom styled
export const CustomStyled: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Laptops' },
        ],
        sx: {
            backgroundColor: '#f8fafc',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            '&:hover': {
                backgroundColor: '#f1f5f9',
            },
        },
    },
};

// Custom Link component for demo
const CustomLink = ({ href, children, className, onClick }: any) => (
    <button
        onClick={(e) => {
            e.preventDefault();
            console.log(`Navigating to: ${href}`);
            onClick?.();
        }}
        className={className}
    >
        {children}
    </button>
);

// With custom link component
export const CustomLinkComponent: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Laptops' },
        ],
        linkComponent: CustomLink,
    },
};

// With custom link props
export const CustomLinkProps: Story = {
    args: {
        items: [
            {
                label: 'Home',
                href: '/',
                linkProps: {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'data-testid': 'home-link'
                }
            },
            {
                label: 'Products',
                href: '/products',
                linkProps: {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                }
            },
            { label: 'Laptops' },
        ],
    },
}; 