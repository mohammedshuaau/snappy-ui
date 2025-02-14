import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { CustomStyle } from '../../types/custom-style.types';

const meta = {
    title: 'Navigation/Stepper',
    component: Stepper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A stepper component that helps users track their progress through a multi-step process.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
    {
        label: 'Account Details',
        description: 'Fill in your account information',
    },
    {
        label: 'Personal Info',
        description: 'Tell us about yourself',
    },
    {
        label: 'Review',
        description: 'Review your information',
    },
    {
        label: 'Complete',
        description: 'Finish setup',
    },
];

const stepsWithIcons = [
    {
        label: 'Account',
        description: 'Create your account',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        label: 'Preferences',
        description: 'Set your preferences',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        label: 'Confirmation',
        description: 'Confirm your details',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

const stepsWithContent = [
    {
        label: 'Step 1',
        description: 'First step description',
        content: (
            <div className="p-4 bg-white rounded-lg shadow dark:bg-slate-800">
                <h3 className="text-lg font-medium">Step 1 Content</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    This is the content for step 1. It can contain any React components.
                </p>
            </div>
        ),
    },
    {
        label: 'Step 2',
        description: 'Second step description',
        content: (
            <div className="p-4 bg-white rounded-lg shadow dark:bg-slate-800">
                <h3 className="text-lg font-medium">Step 2 Content</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    This is the content for step 2. It can contain any React components.
                </p>
            </div>
        ),
    },
    {
        label: 'Step 3',
        description: 'Third step description',
        content: (
            <div className="p-4 bg-white rounded-lg shadow dark:bg-slate-800">
                <h3 className="text-lg font-medium">Step 3 Content</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    This is the content for step 3. It can contain any React components.
                </p>
            </div>
        ),
    },
];

export const Default: Story = {
    args: {
        steps: defaultSteps,
        activeStep: 1,
    },
};

export const WithIcons: Story = {
    args: {
        steps: stepsWithIcons,
        activeStep: 1,
        showStepNumbers: false,
    },
};

export const Vertical: Story = {
    args: {
        steps: stepsWithContent,
        activeStep: 1,
        variant: 'vertical',
    },
};

export const Sizes: Story = {
    args: {
        steps: defaultSteps,
        activeStep: 1
    },
    render: () => (
        <div className="space-y-8">
            <Stepper steps={defaultSteps} activeStep={1} size="sm" />
            <Stepper steps={defaultSteps} activeStep={1} size="md" />
            <Stepper steps={defaultSteps} activeStep={1} size="lg" />
        </div>
    ),
};

export const AllCompleted: Story = {
    args: {
        steps: defaultSteps,
        activeStep: defaultSteps.length,
    },
};

export const CustomStyling: Story = {
    args: {
        steps: defaultSteps,
        activeStep: 1,
        sx: {
            '& [data-state=active]': {
                background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                color: 'white',
            },
        } as CustomStyle,
    },
}; 