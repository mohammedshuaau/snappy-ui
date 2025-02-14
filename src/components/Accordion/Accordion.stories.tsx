import type {Meta, StoryObj} from '@storybook/react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from './Accordion';

const meta = {
    title: 'Data Display/Accordion',
    component: Accordion,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'ghost'],
        },
        multiple: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

const items = [
    {
        value: 'item-1',
        trigger: 'What is React?',
        content:
            'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".',
    },
    {
        value: 'item-2',
        trigger: 'Why use TypeScript with React?',
        content:
            'TypeScript adds optional static types to JavaScript. It helps catch errors early in your editor and provides a better development experience with features like auto-completion.',
    },
    {
        value: 'item-3',
        trigger: 'What is Tailwind CSS?',
        content:
            'Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML.',
    },
];

// Basic example
export const Default: Story = {
    args: {
        children: items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
        )),
    },
};

// Multiple items expanded
export const Multiple: Story = {
    args: {
        multiple: true,
        defaultValue: ['item-1', 'item-2'],
        children: items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
        )),
    },
};

// Ghost variant
export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
        )),
    },
};

// Disabled item
export const DisabledItem = () => (
    <Accordion>
        {items.map((item, index) => (
            <AccordionItem key={item.value} value={item.value} disabled={index === 1}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
);

// Custom icons
export const CustomIcons = () => (
    <Accordion>
        {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger
                    expandIcon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    }
                    collapseIcon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    }
                >
                    {item.trigger}
                </AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
);

// Rich content
export const RichContent = () => (
    <Accordion className="max-w-2xl">
        <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary-500 dark:text-primary-400"
                        >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1 text-left">
                        <h3 className="font-semibold">Documentation</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Everything you need to know about the product
                        </p>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="mt-4 grid gap-4">
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary-500 dark:text-primary-400"
                        >
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        <div>
                            <h4 className="font-medium">Getting Started</h4>
                            <p className="text-gray-500 dark:text-gray-400">
                                Learn the basics and get started quickly
                            </p>
                        </div>
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary-500 dark:text-primary-400"
                        >
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                        <div>
                            <h4 className="font-medium">API Reference</h4>
                            <p className="text-gray-500 dark:text-gray-400">
                                Detailed API documentation and examples
                            </p>
                        </div>
                    </a>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);

// Custom styled
export const CustomStyled: Story = {
    args: {
        sx: {
            borderRadius: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '& [role="button"]': {
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: '#f3f4f6',
                },
                '&[aria-expanded="true"]': {
                    backgroundColor: '#f3f4f6',
                    borderLeft: '4px solid #6366f1',
                },
            },
            '@media (prefers-color-scheme: dark)': {
                '& [role="button"]:hover': {
                    backgroundColor: '#1f2937',
                },
                '& [role="button"][aria-expanded="true"]': {
                    backgroundColor: '#1f2937',
                    borderLeft: '4px solid #818cf8',
                },
            },
        },
        children: items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
        )),
    },
}; 