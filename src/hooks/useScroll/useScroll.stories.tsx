import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import useScroll from './useScroll';

const meta = {
    title: 'Hooks/useScroll',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A React hook for tracking scroll position and direction with throttling support.

### Features
- Track scroll position (x, y)
- Track scroll direction
- Throttle scroll events
- Target element specification
- Enable/disable functionality
- TypeScript support

### Usage

\`\`\`tsx
import { useScroll } from '@mohammedshuaau/snappy-ui';

function ScrollTracker() {
    const { position, direction } = useScroll({ trackDirection: true });

    return (
        <div>
            <p>Scroll Position: {position.x}px, {position.y}px</p>
            <p>
                Direction: 
                {direction.vertical} (vertical), 
                {direction.horizontal} (horizontal)
            </p>
        </div>
    );
}

// With specific container
function ContainerScroll() {
    const containerRef = React.useRef(null);
    const { position } = useScroll({ 
        target: containerRef.current,
        throttleDelay: 100 
    });

    return (
        <div 
            ref={containerRef} 
            style={{ height: '200px', overflow: 'auto' }}
        >
            <div style={{ height: '1000px' }}>
                Scrolled: {position.y}px
            </div>
        </div>
    );
}
\`\`\`

### API Reference

\`\`\`tsx
interface ScrollPosition {
    x: number;
    y: number;
}

interface ScrollDirection {
    horizontal: 'left' | 'right' | null;
    vertical: 'up' | 'down' | null;
}

function useScroll(
    options?: {
        target?: HTMLElement | null;
        trackDirection?: boolean;
        throttleDelay?: number;
        enabled?: boolean;
    }
): {
    position: ScrollPosition;
    direction: ScrollDirection;
}
\`\`\`

#### Parameters

- \`options\`: Configuration object
  - \`target\`: Target element to track (defaults to window)
  - \`trackDirection\`: Whether to track scroll direction (default: false)
  - \`throttleDelay\`: Throttle delay in ms (default: 0)
  - \`enabled\`: Enable/disable the hook (default: true)

#### Returns

- \`position\`: Current scroll position
  - \`x\`: Horizontal scroll position
  - \`y\`: Vertical scroll position
- \`direction\`: Current scroll direction
  - \`horizontal\`: Left/right direction
  - \`vertical\`: Up/down direction
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DemoComponent: React.FC = () => {
    const [position, direction, scrollTo] = useScroll();

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Window Scroll Demo</h2>
            <p className="mb-4">Scroll the page to see the values update.</p>

            <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="font-bold mb-2">Scroll Position</h3>
                    <p>X: {position.x}px</p>
                    <p>Y: {position.y}px</p>
                </div>

                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="font-bold mb-2">Scroll Direction</h3>
                    <p>Horizontal: {direction.horizontal || 'none'}</p>
                    <p>Vertical: {direction.vertical || 'none'}</p>
                </div>

                <div className="space-x-2">
                    <button
                        onClick={() => scrollTo(0, 0, true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Scroll to Top
                    </button>
                    <button
                        onClick={() => scrollTo(0, 1000, true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Scroll to Bottom
                    </button>
                </div>
            </div>

            {/* Add some content to make the page scrollable */}
            <div className="mt-8 space-y-4">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="p-4 bg-gray-100 rounded">
                        Scroll content {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const Default: Story = {
    render: () => <DemoComponent />,
};

const ElementScrollDemoComponent: React.FC = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [position, direction, scrollTo] = useScroll({
        target: containerRef.current,
        throttleDelay: 50,
    });

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Element Scroll Demo</h2>
            <p className="mb-4">Scroll the container below to see the values update.</p>

            <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="font-bold mb-2">Scroll Position</h3>
                    <p>X: {position.x}px</p>
                    <p>Y: {position.y}px</p>
                </div>

                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="font-bold mb-2">Scroll Direction</h3>
                    <p>Horizontal: {direction.horizontal || 'none'}</p>
                    <p>Vertical: {direction.vertical || 'none'}</p>
                </div>

                <div
                    ref={containerRef}
                    className="h-64 overflow-auto border border-gray-200 rounded"
                >
                    <div className="p-4 space-y-4">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="p-4 bg-gray-100 rounded">
                                Scroll content {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-x-2">
                    <button
                        onClick={() => scrollTo(0, 0)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Scroll to Top
                    </button>
                    <button
                        onClick={() => scrollTo(0, 1000)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Scroll to Bottom
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ElementScroll: Story = {
    render: () => <ElementScrollDemoComponent />,
}; 