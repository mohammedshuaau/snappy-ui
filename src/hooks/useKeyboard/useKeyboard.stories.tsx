import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import useKeyboard from './useKeyboard';

const meta = {
    title: 'Hooks/useKeyboard',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A React hook for handling keyboard events with support for key combinations and modifiers.

### Features
- Support for single keys and key combinations
- Modifier key support (Ctrl, Alt, Shift, Meta)
- Target element specification
- Event prevention options
- Enable/disable functionality
- TypeScript support

### Usage

\`\`\`tsx
import { useKeyboard } from '@mohammedshuaau/snappy-ui';

function ShortcutHandler() {
    const bindings = [
        {
            key: 's',
            ctrl: true,
            handler: (e) => {
                e.preventDefault();
                console.log('Ctrl+S pressed');
            },
        },
        {
            key: ['ArrowUp', 'ArrowDown'],
            handler: (e) => {
                console.log('Arrow key pressed');
            },
        },
    ];

    useKeyboard(bindings, { preventDefault: true });

    return <div>Press Ctrl+S or Arrow keys</div>;
}

// With specific target
function InputShortcuts() {
    const inputRef = React.useRef(null);
    
    useKeyboard(
        [
            {
                key: 'Enter',
                handler: () => console.log('Enter pressed'),
            },
        ],
        { target: inputRef.current }
    );

    return <input ref={inputRef} />;
}
\`\`\`

### API Reference

\`\`\`tsx
interface KeyBinding {
    key: string | string[];
    alt?: boolean;
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
    handler: (event: KeyboardEvent) => void;
}

function useKeyboard(
    bindings: KeyBinding[],
    options?: {
        target?: HTMLElement | null;
        preventDefault?: boolean;
        stopPropagation?: boolean;
        enabled?: boolean;
    }
): void
\`\`\`

#### Parameters

- \`bindings\`: Array of key bindings
  - \`key\`: Key or array of keys to listen for
  - \`alt\`: Require Alt key (default: false)
  - \`ctrl\`: Require Ctrl key (default: false)
  - \`meta\`: Require Meta key (default: false)
  - \`shift\`: Require Shift key (default: false)
  - \`handler\`: Function to call when the key combination is pressed
- \`options\`: Configuration object
  - \`target\`: Target element to attach listeners to (default: window)
  - \`preventDefault\`: Prevent default behavior (default: false)
  - \`stopPropagation\`: Stop event propagation (default: false)
  - \`enabled\`: Enable/disable the hook (default: true)
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DemoComponent: React.FC = () => {
    const [pressedKeys, setPressedKeys] = React.useState<string[]>([]);

    useKeyboard([
        {
            key: ['a', 's', 'd', 'w'],
            handler: (event) => {
                setPressedKeys((prev) => [...prev, event.key].slice(-5));
            },
        },
    ]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Basic Keyboard Demo</h2>
            <p className="mb-4">Press A, S, D, or W to see them appear below.</p>
            <div className="flex gap-2">
                {pressedKeys.map((key, index) => (
                    <div
                        key={index}
                        className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded"
                    >
                        {key.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const Default: Story = {
    render: () => <DemoComponent />,
};

const ModifierDemoComponent: React.FC = () => {
    const [lastCommand, setLastCommand] = React.useState<string>('');

    useKeyboard([
        {
            key: 's',
            ctrl: true,
            handler: () => setLastCommand('Save (Ctrl + S)'),
        },
        {
            key: 'z',
            ctrl: true,
            handler: () => setLastCommand('Undo (Ctrl + Z)'),
        },
        {
            key: 'y',
            ctrl: true,
            shift: true,
            handler: () => setLastCommand('Redo (Ctrl + Shift + Y)'),
        },
    ]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modifier Keys Demo</h2>
            <p className="mb-4">Try these keyboard shortcuts:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Ctrl + S (Save)</li>
                <li>Ctrl + Z (Undo)</li>
                <li>Ctrl + Shift + Y (Redo)</li>
            </ul>
            <div className="p-4 bg-gray-100 rounded">
                <p className="font-bold">Last Command:</p>
                <p className="text-blue-600">{lastCommand || 'None'}</p>
            </div>
        </div>
    );
};

export const WithModifiers: Story = {
    render: () => <ModifierDemoComponent />,
};

const GameControlsDemoComponent: React.FC = () => {
    const [position, setPosition] = React.useState({ x: 50, y: 50 });
    const speed = 10;

    useKeyboard([
        {
            key: 'ArrowUp',
            handler: () => setPosition(p => ({ ...p, y: Math.max(0, p.y - speed) })),
        },
        {
            key: 'ArrowDown',
            handler: () => setPosition(p => ({ ...p, y: Math.min(100, p.y + speed) })),
        },
        {
            key: 'ArrowLeft',
            handler: () => setPosition(p => ({ ...p, x: Math.max(0, p.x - speed) })),
        },
        {
            key: 'ArrowRight',
            handler: () => setPosition(p => ({ ...p, x: Math.min(100, p.x + speed) })),
        },
    ]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Game Controls Demo</h2>
            <p className="mb-4">Use arrow keys to move the square around.</p>
            <div className="relative w-64 h-64 bg-gray-200 rounded">
                <div
                    className="absolute w-8 h-8 bg-blue-500 rounded transition-all duration-100"
                    style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </div>
            <div className="mt-4 text-sm text-gray-600">
                Position: ({position.x}, {position.y})
            </div>
        </div>
    );
};

export const GameControls: Story = {
    render: () => <GameControlsDemoComponent />,
}; 