import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import useFocus from './useFocus';

const meta = {
    title: 'Hooks/useFocus',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A React hook that manages focus state of an element with support for focus-within and focus trapping.

### Features
- Track focus state
- Focus-within detection
- Focus trap support
- Enable/disable functionality
- TypeScript support
- Accessibility-friendly

### Usage

\`\`\`tsx
import { useFocus } from '@mohammedshuaau/snappy-ui';

function FocusableInput() {
    const [ref, isFocused] = useFocus<HTMLDivElement>();

    return (
        <div ref={ref} style={{ padding: '20px', border: isFocused ? '2px solid blue' : '1px solid gray' }}>
            <input placeholder="Focus me" />
            {isFocused && <span>Input is focused!</span>}
        </div>
    );
}

// With focus trap (useful for modals)
function Modal() {
    const [ref] = useFocus<HTMLDivElement>({ trap: true });

    return (
        <div ref={ref} className="modal">
            <input />
            <button>Focus will be trapped between elements</button>
            <button>Close</button>
        </div>
    );
}
\`\`\`

### API Reference

\`\`\`tsx
function useFocus<T extends HTMLElement = HTMLElement>(
    options?: {
        within?: boolean;
        trap?: boolean;
        enabled?: boolean;
    }
): [React.RefCallback<T>, boolean]
\`\`\`

#### Parameters

- \`options\`: Configuration object
  - \`within\`: Detect focus within child elements (default: false)
  - \`trap\`: Trap focus within the element (default: false)
  - \`enabled\`: Enable/disable the hook (default: true)

#### Returns

- \`ref\`: Callback ref to attach to the target element
- \`isFocused\`: Current focus state
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DemoComponent: React.FC = () => {
    const [ref, isFocused, setFocus] = useFocus<HTMLDivElement>();

    return (
        <div className="space-y-4">
            <div
                ref={ref}
                tabIndex={0}
                className={`
                    p-6 rounded-lg shadow-lg transition-colors duration-200
                    ${isFocused ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}
                    focus:outline-none
                `}
            >
                <h2 className="text-xl font-bold mb-2">Focus Demo</h2>
                <p>Click or tab into this card to see the effect.</p>
                <p className="mt-2">
                    Status: <span className="font-bold">{isFocused ? 'Focused' : 'Not Focused'}</span>
                </p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setFocus(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Focus
                </button>
                <button
                    onClick={() => setFocus(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Blur
                </button>
            </div>
        </div>
    );
};

export const Default: Story = {
    render: () => <DemoComponent />,
};

const FocusWithinDemoComponent: React.FC = () => {
    const [ref, isFocused] = useFocus<HTMLDivElement>({ within: true });

    return (
        <div
            ref={ref}
            className={`
                p-6 rounded-lg shadow-lg transition-colors duration-200
                ${isFocused ? 'bg-green-500 text-white' : 'bg-white text-gray-800'}
            `}
        >
            <h2 className="text-xl font-bold mb-2">Focus Within Demo</h2>
            <p>Focus will be maintained when interacting with child elements:</p>
            <div className="mt-4 space-y-2">
                <input
                    type="text"
                    placeholder="Type something..."
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="px-4 py-2 bg-white text-green-500 rounded border border-green-500 hover:bg-green-50">
                    Click me
                </button>
            </div>
            <p className="mt-4">
                Status: <span className="font-bold">{isFocused ? 'Focused' : 'Not Focused'}</span>
            </p>
        </div>
    );
};

export const WithFocusWithin: Story = {
    render: () => <FocusWithinDemoComponent />,
};

const FocusTrapDemoComponent: React.FC = () => {
    const [ref, isFocused] = useFocus<HTMLDivElement>({ trap: true });
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="space-y-4">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
                Open Modal
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div
                        ref={ref}
                        className={`
                            p-6 rounded-lg shadow-lg transition-colors duration-200 max-w-md w-full mx-4
                            ${isFocused ? 'bg-purple-50' : 'bg-white'}
                        `}
                    >
                        <h2 className="text-xl font-bold mb-4">Focus Trap Demo</h2>
                        <p className="mb-4">
                            Tab navigation is trapped within this modal. Try tabbing through the elements.
                        </p>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="First input"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Second input"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                            >
                                Close Modal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const WithFocusTrap: Story = {
    render: () => <FocusTrapDemoComponent />,
}; 