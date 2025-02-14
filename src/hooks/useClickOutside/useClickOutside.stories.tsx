import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import useClickOutside from './useClickOutside';

const meta = {
    title: 'Hooks/useClickOutside',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A React hook that detects clicks outside of a component.

### Features
- Detects mouse clicks outside a component
- Optional touch event support
- Enable/disable functionality
- TypeScript support
- Zero dependencies

### Usage

\`\`\`tsx
import { useClickOutside } from '@mohammedshuaau/snappy-ui';

function Modal() {
    const [isOpen, setIsOpen] = React.useState(false);
    const ref = useClickOutside(() => setIsOpen(false));

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Open Modal</button>
            {isOpen && (
                <div ref={ref} className="modal">
                    Click outside to close
                </div>
            )}
        </>
    );
}
\`\`\`

### API Reference

\`\`\`tsx
function useClickOutside<T extends HTMLElement = HTMLElement>(
    handler: (event: MouseEvent | TouchEvent) => void,
    options?: {
        enableTouch?: boolean;
        enabled?: boolean;
    }
): React.RefObject<T>
\`\`\`

#### Parameters

- \`handler\`: Function to call when a click outside is detected
- \`options\`: Configuration object
  - \`enableTouch\`: Enable touch events (default: true)
  - \`enabled\`: Enable/disable the hook (default: true)

#### Returns

- \`ref\`: Ref object to attach to the target element
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DemoComponent: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

    return (
        <div className="p-4">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Open Modal
            </button>

            {isOpen && (
                <div
                    ref={ref}
                    className="fixed inset-0 flex items-center justify-center"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Click Outside Demo</h2>
                        <p className="mb-4">Click outside this modal to close it.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export const Default: Story = {
    render: () => <DemoComponent />,
};

const TouchDemoComponent: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const ref = useClickOutside<HTMLDivElement>(
        () => setIsOpen(false),
        { enableTouch: true }
    );

    return (
        <div className="p-4">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Open Touch-Enabled Modal
            </button>

            {isOpen && (
                <div
                    ref={ref}
                    className="fixed inset-0 flex items-center justify-center"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Touch Demo</h2>
                        <p className="mb-4">Touch outside this modal to close it.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export const WithTouchEvents: Story = {
    render: () => <TouchDemoComponent />,
}; 