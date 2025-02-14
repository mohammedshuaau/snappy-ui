import type {Meta, StoryObj} from '@storybook/react';
import {Button} from '../Button/Button';
import {SnapKitToastContainer, toast} from './Toast';

const meta = {
    title: 'Feedback/Toast',
    component: SnapKitToastContainer,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A modern, flexible toast notification system built on top of [react-toastify](https://www.npmjs.com/package/react-toastify) 🚀

## Installation

\`\`\`bash
npm install @mohammedshuaau/snappy-ui react-toastify
# or
yarn add @mohammedshuaau/snappy-ui react-toastify
\`\`\`

## Setup

Add the \`SnapKitToastContainer\` at the root of your application:

\`\`\`jsx
import { SnapKitToastContainer } from '@mohammedshuaau/snappy-ui';

function App() {
  return (
    <>
      <SnapKitToastContainer />
      {/* Your app content */}
    </>
  );
}
\`\`\`
`,
            },
        },
    },
    argTypes: {
        position: {
            control: 'select',
            options: ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'],
            description: 'Position of the toast container',
            defaultValue: 'top-right',
        },
        autoClose: {
            control: 'number',
            description: 'Auto close duration in milliseconds',
            defaultValue: 5000,
        },
        hideProgressBar: {
            control: 'boolean',
            description: 'Whether to hide the progress bar',
            defaultValue: false,
        },
        newestOnTop: {
            control: 'boolean',
            description: 'Add new toast on top',
            defaultValue: true,
        },
        closeOnClick: {
            control: 'boolean',
            description: 'Close toast on click',
            defaultValue: true,
        },
        pauseOnHover: {
            control: 'boolean',
            description: 'Pause timer on hover',
            defaultValue: true,
        },
        draggable: {
            control: 'boolean',
            description: 'Allow toast to be dragged',
            defaultValue: true,
        },
        theme: {
            control: 'select',
            options: ['light', 'dark'],
            description: 'Toast theme',
            defaultValue: 'light',
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div>
                <SnapKitToastContainer />
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SnapKitToastContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Basic: Story = {
    render: () => {
        const showBasicToast = () => {
            toast.info('This is a basic toast message', {
                title: 'Information',
            });
        };

        return (
            <Button variant="outline" onClick={showBasicToast}>
                Show Basic Toast
            </Button>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'The most basic usage of the toast component. Click the button to show a simple info toast.',
            },
        },
    },
};

// Types
export const Types: Story = {
    render: () => {
        const showToastByType = (type: 'info' | 'success' | 'warning' | 'error') => {
            const messages = {
                info: 'This is an informational message.',
                success: 'Operation completed successfully!',
                warning: 'Please be cautious about this action.',
                error: 'An error occurred while processing your request.'
            };

            const titles = {
                info: 'Information',
                success: 'Success',
                warning: 'Warning',
                error: 'Error'
            };

            toast[type](messages[type], { title: titles[type] });
        };

        return (
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => showToastByType('info')}>Info</Button>
                <Button variant="outline" onClick={() => showToastByType('success')}>Success</Button>
                <Button variant="outline" onClick={() => showToastByType('warning')}>Warning</Button>
                <Button variant="outline" onClick={() => showToastByType('error')}>Error</Button>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: `
Different types of toasts for different contexts:

- \`info\`: For general information
- \`success\`: For successful operations
- \`warning\`: For warning messages
- \`error\`: For error messages

Each type comes with its own styling and icon.
`,
            },
        },
    },
};

// Positions
export const Positions: Story = {
    render: () => {
        const positions = [
            'top-left',
            'top-center',
            'top-right',
            'bottom-left',
            'bottom-center',
            'bottom-right'
        ] as const;

        return (
            <div className="grid grid-cols-3 gap-2">
                {positions.map(position => (
                    <Button
                        key={position}
                        variant="outline"
                        onClick={() => toast.info(`Toast at ${position}`, { position })}
                    >
                        {position}
                    </Button>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: `
Toasts can be displayed in 6 different positions:

- Top: left, center, right
- Bottom: left, center, right

The default position is \`top-right\`.
`,
            },
        },
    },
};

// Advanced Features
export const AdvancedFeatures: Story = {
    render: () => {
        const showLongDurationToast = () => {
            toast.info('This toast will stay for 10 seconds', {
                duration: 10000,
                title: 'Long Duration'
            });
        };

        const showCustomIconToast = () => {
            toast.success('Custom icon toast', {
                icon: (
                    <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                ),
                title: 'Custom Icon'
            });
        };

        const showMultipleToasts = () => {
            toast.info('First toast message');
            toast.success('Second toast message');
            toast.warning('Third toast message');
            toast.error('Fourth toast message');
        };

        return (
            <div className="flex gap-2 flex-wrap">
                <Button variant="outline" onClick={showLongDurationToast}>
                    Long Duration
                </Button>
                <Button variant="outline" onClick={showCustomIconToast}>
                    Custom Icon
                </Button>
                <Button variant="outline" onClick={showMultipleToasts}>
                    Multiple Toasts
                </Button>
                <Button variant="outline" onClick={toast.dismissAll}>
                    Dismiss All
                </Button>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: `
Advanced features demonstration:

- Custom duration toasts
- Custom icons
- Multiple toasts stacking
- Dismiss all toasts
`,
            },
        },
    },
};

// Interactive Examples
export const InteractiveExamples: Story = {
    render: () => {
        const showUpdatingToast = () => {
            const toastId = toast.info('Processing your request...', {
                title: 'Processing',
                duration: 0,
            });

            // Update the toast after 2 seconds
            setTimeout(() => {
                toast.dismiss(toastId);
                toast.success('Process completed successfully!', {
                    title: 'Success',
                });
            }, 2000);
        };

        const showProgressToast = () => {
            let progress = 0;
            let toastId = toast.info('Starting download...', {
                title: 'Download Progress',
                duration: 0,
            });

            const interval = setInterval(() => {
                progress += 20;
                if (progress >= 100) {
                    clearInterval(interval);
                    toast.dismiss(toastId);
                    toast.success('Download completed successfully!', {
                        title: 'Download Complete',
                    });
                } else {
                    toast.dismiss(toastId);
                    toastId = toast.info(`Downloading... ${progress}%`, {
                        title: 'Download Progress',
                        duration: 0,
                    });
                }
            }, 1000);
        };

        return (
            <div className="flex gap-2">
                <Button variant="outline" onClick={showUpdatingToast}>
                    Updating Toast
                </Button>
                <Button variant="outline" onClick={showProgressToast}>
                    Progress Toast
                </Button>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: `
Interactive toast examples:

- Updating toast content and type
- Progress indication with auto-update
- Dynamic content changes with proper state transitions
`,
            },
        },
    },
};

// Multiple Toasts
export const MultipleToasts: Story = {
    render: () => {
        const showMultipleToasts = () => {
            toast.info('First toast message', { title: 'Information' });
            toast.success('Second toast message', { title: 'Success' });
            toast.warning('Third toast message', { title: 'Warning' });
            toast.error('Fourth toast message', { title: 'Error' });
        };

        return (
            <Button variant="outline" onClick={showMultipleToasts}>
                Show Multiple Toasts
            </Button>
        );
    },
}; 