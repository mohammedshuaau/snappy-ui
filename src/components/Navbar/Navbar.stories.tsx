import type {Meta, StoryObj} from '@storybook/react';
import {Navbar, NavbarBrand} from './Navbar';
import {Button} from '../Button/Button';

const meta = {
    title: 'Navigation/Navbar',
    component: Navbar,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A responsive navigation bar component that supports branding, navigation items, and responsive collapsing.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Logo = () => (
    <svg
        className="h-6 w-6 text-primary-600 dark:text-primary-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
        />
    </svg>
);

export const Basic: Story = {
    args: {
        brand: (
            <NavbarBrand href="#">
                <Logo />
                <span className="font-semibold">SnapKit</span>
            </NavbarBrand>
        ),
        center: (
            <div className="flex gap-4">
                <a href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    Home
                </a>
                <a href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    Features
                </a>
                <a href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    Pricing
                </a>
                <a href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    About
                </a>
            </div>
        ),
        end: (
            <div className="flex gap-2">
                <Button variant="ghost" size="sm">Sign in</Button>
                <Button size="sm">Sign up</Button>
            </div>
        ),
    },
};

export const Floating: Story = {
    args: {
        ...Basic.args,
        variant: 'floating',
    },
};

export const Sticky: Story = {
    args: {
        ...Basic.args,
        sticky: true,
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="space-y-8">
            <Navbar
                size="sm"
                brand={
                    <NavbarBrand href="#">
                        <Logo />
                        <span className="font-semibold">Small</span>
                    </NavbarBrand>
                }
                end={<Button size="sm">Action</Button>}
            />
            <Navbar
                size="md"
                brand={
                    <NavbarBrand href="#">
                        <Logo />
                        <span className="font-semibold">Medium</span>
                    </NavbarBrand>
                }
                end={<Button>Action</Button>}
            />
            <Navbar
                size="lg"
                brand={
                    <NavbarBrand href="#">
                        <Logo />
                        <span className="font-semibold">Large</span>
                    </NavbarBrand>
                }
                end={<Button size="lg">Action</Button>}
            />
        </div>
    ),
};

export const Collapsible: Story = {
    args: {
        ...Basic.args,
        collapsible: true,
    },
};

export const CustomStyling: Story = {
    args: {
        brand: (
            <NavbarBrand href="#">
                <Logo />
                <span className="font-semibold">Custom</span>
            </NavbarBrand>
        ),
        center: (
            <div className="flex gap-4">
                <a href="#" className="text-white/70 hover:text-white">
                    Home
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                    Features
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                    Pricing
                </a>
            </div>
        ),
        end: (
            <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
            >
                Get Started
            </Button>
        ),
        sx: {
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            borderColor: 'transparent',
            color: 'white',
        },
    },
}; 