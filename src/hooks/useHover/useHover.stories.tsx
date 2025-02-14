import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import useHover from './useHover';

const meta = {
    title: 'Hooks/useHover',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A React hook that tracks hover state of an element with support for delay and touch events.

### Features
- Track hover state
- Configurable delay
- Touch event support
- Enable/disable functionality
- TypeScript support
- Cleanup on unmount

### Usage

\`\`\`tsx
import { useHover } from '@mohammedshuaau/snappy-ui';

function HoverCard() {
    const [ref, isHovered] = useHover<HTMLDivElement>({ delay: 200 });

    return (
        <div
            ref={ref}
            style={{
                background: isHovered ? 'blue' : 'gray',
                padding: '20px',
                color: 'white'
            }}
        >
            {isHovered ? 'Hovered!' : 'Hover me'}
        </div>
    );
}
\`\`\`

### API Reference

\`\`\`tsx
function useHover<T extends HTMLElement = HTMLElement>(
    options?: {
        delay?: number;
        enableTouch?: boolean;
        enabled?: boolean;
    }
): [React.RefCallback<T>, boolean]
\`\`\`

#### Parameters

- \`options\`: Configuration object
  - \`delay\`: Delay in milliseconds before hover state changes (default: 0)
  - \`enableTouch\`: Enable touch events (default: true)
  - \`enabled\`: Enable/disable the hook (default: true)

#### Returns

- \`ref\`: Callback ref to attach to the target element
- \`isHovered\`: Current hover state
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DemoComponent: React.FC = () => {
    const [ref, isHovered] = useHover<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={`
                p-6 rounded-lg shadow-lg transition-colors duration-200
                ${isHovered ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}
            `}
        >
            <h2 className="text-xl font-bold mb-2">Hover Demo</h2>
            <p>Hover over this card to see the effect.</p>
            <p className="mt-2">
                Status: <span className="font-bold">{isHovered ? 'Hovered' : 'Not Hovered'}</span>
            </p>
        </div>
    );
};

export const Default: Story = {
    render: () => <DemoComponent />,
};

const DelayedDemoComponent: React.FC = () => {
    const [ref, isHovered] = useHover<HTMLDivElement>({ delay: 500 });

    return (
        <div
            ref={ref}
            className={`
                p-6 rounded-lg shadow-lg transition-colors duration-500
                ${isHovered ? 'bg-green-500 text-white' : 'bg-white text-gray-800'}
            `}
        >
            <h2 className="text-xl font-bold mb-2">Delayed Hover Demo</h2>
            <p>Hover over this card to see the delayed effect (500ms).</p>
            <p className="mt-2">
                Status: <span className="font-bold">{isHovered ? 'Hovered' : 'Not Hovered'}</span>
            </p>
        </div>
    );
};

export const WithDelay: Story = {
    render: () => <DelayedDemoComponent />,
};

const TouchDemoComponent: React.FC = () => {
    const [ref, isHovered] = useHover<HTMLDivElement>({ enableTouch: true });

    return (
        <div
            ref={ref}
            className={`
                p-6 rounded-lg shadow-lg transition-colors duration-200
                ${isHovered ? 'bg-purple-500 text-white' : 'bg-white text-gray-800'}
            `}
        >
            <h2 className="text-xl font-bold mb-2">Touch Demo</h2>
            <p>Touch this card to see the effect on mobile devices.</p>
            <p className="mt-2">
                Status: <span className="font-bold">{isHovered ? 'Active' : 'Inactive'}</span>
            </p>
        </div>
    );
};

export const WithTouchEvents: Story = {
    render: () => <TouchDemoComponent />,
}; 