import type {Meta, StoryObj} from '@storybook/react';
import {Alert} from './Alert';

// Example icons
const InfoIcon = () => (
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);

const SuccessIcon = () => (
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
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const WarningIcon = () => (
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
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

const ErrorIcon = () => (
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
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

const meta = {
    title: 'Feedback/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['info', 'success', 'warning', 'error'],
        },
        title: {
            control: 'text',
        },
        dismissible: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'This is an alert message.',
    },
};

export const WithTitle: Story = {
    args: {
        title: 'Alert Title',
        children: 'This is an alert message with a title.',
    },
};

export const Variants: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-[500px]">
            <Alert variant="info">
                This is an info alert.
            </Alert>
            <Alert variant="success">
                This is a success alert.
            </Alert>
            <Alert variant="warning">
                This is a warning alert.
            </Alert>
            <Alert variant="error">
                This is an error alert.
            </Alert>
        </div>
    ),
};

export const Dismissible: Story = {
    args: {
        title: 'Dismissible Alert',
        children: 'Click the X button to dismiss this alert.',
        dismissible: true,
        onDismiss: () => alert('Alert dismissed!'),
    },
};

export const CustomIcon: Story = {
    args: {
        title: 'Custom Icon',
        children: 'This alert uses a custom icon.',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
            >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
        ),
    },
};

export const CustomStyles: Story = {
    args: {
        title: 'Custom Styles',
        children: 'This alert uses custom styles via the sx prop.',
        sx: {
            borderWidth: '2px',
            borderStyle: 'dashed',
            borderColor: 'currentColor',
        },
    },
};

// Basic variants
export const Info: Story = {
    args: {
        title: 'Information',
        children: 'This is an informational message.',
        variant: 'info',
    },
};

export const Success: Story = {
    args: {
        title: 'Success',
        children: 'Operation completed successfully.',
        variant: 'success',
    },
};

export const Warning: Story = {
    args: {
        title: 'Warning',
        children: 'Please be cautious about this action.',
        variant: 'warning',
    },
};

export const Error: Story = {
    args: {
        title: 'Error',
        children: 'An error occurred while processing your request.',
        variant: 'error',
    },
};

// With icons
export const WithIcon: Story = {
    args: {
        title: 'Information',
        children: 'This is an alert with an icon.',
        variant: 'info',
        icon: <InfoIcon />,
    },
};

// All variants with icons
export const AllVariantsWithIcons = () => (
    <div className="flex flex-col gap-4 min-w-[320px]">
        <Alert
            variant="info"
            title="Information"
            icon={<InfoIcon />}
        >
            This is an informational message.
        </Alert>
        <Alert
            variant="success"
            title="Success"
            icon={<SuccessIcon />}
        >
            Operation completed successfully.
        </Alert>
        <Alert
            variant="warning"
            title="Warning"
            icon={<WarningIcon />}
        >
            Please be cautious about this action.
        </Alert>
        <Alert
            variant="error"
            title="Error"
            icon={<ErrorIcon />}
        >
            An error occurred while processing your request.
        </Alert>
    </div>
);

// Without title
export const WithoutTitle: Story = {
    args: {
        children: 'This is an alert without a title.',
        variant: 'info',
    },
};

// Custom styles
export const CustomStylesStory = () => (
    <div className="flex flex-col gap-4 min-w-[320px]">
        <Alert
            title="Custom Background"
            variant="info"
            sx={{
                background: 'linear-gradient(to right, #60a5fa, #3b82f6)',
                borderColor: '#2563eb',
                color: 'white',
            }}
        >
            This alert has a gradient background.
        </Alert>
        <Alert
            title="Hover Animation"
            variant="success"
            sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            Hover over this alert to see the animation.
        </Alert>
        <Alert
            title="Custom Border"
            variant="warning"
            sx={{
                borderWidth: '2px',
                borderStyle: 'dashed',
                borderRadius: '0.5rem',
            }}
        >
            This alert has a custom border style.
        </Alert>
        <Alert
            title="Shine Effect"
            variant="error"
            sx={{
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '0',
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    animation: 'shine 2s infinite',
                },
                '@keyframes shine': {
                    '100%': {
                        left: '100%',
                    },
                },
            }}
        >
            This alert has a continuous shine effect.
        </Alert>
    </div>
);

CustomStylesStory.parameters = {
    docs: {
        description: {
            story: 'Use `sx` prop for custom styling including animations, gradients, and other advanced CSS properties.',
        },
    },
}; 