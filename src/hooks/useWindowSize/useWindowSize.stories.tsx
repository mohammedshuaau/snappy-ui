import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import useWindowSize from './useWindowSize';

const meta = {
    title: 'Hooks/useWindowSize',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A React hook that tracks window dimensions with support for throttling and SSR.

### Features
- Track window width and height
- Throttle resize events
- SSR support
- TypeScript support
- Enable/disable functionality
- Initial dimensions configuration

### Usage

\`\`\`tsx
import { useWindowSize } from '@mohammedshuaau/snappy-ui';

function ResponsiveComponent() {
    const { width, height } = useWindowSize({
        throttleDelay: 100
    });

    return (
        <div>
            <p>Window width: {width}px</p>
            <p>Window height: {height}px</p>
            {width < 768 ? (
                <p>Mobile view</p>
            ) : (
                <p>Desktop view</p>
            )}
        </div>
    );
}

// With initial dimensions (useful for SSR)
function SSRComponent() {
    const { width, height } = useWindowSize({
        initialWidth: 1024,
        initialHeight: 768
    });

    return (
        <div>
            <p>Current dimensions: {width}x{height}</p>
        </div>
    );
}
\`\`\`

### API Reference

\`\`\`tsx
interface WindowSize {
    width: number;
    height: number;
}

interface UseWindowSizeOptions {
    throttleDelay?: number;
    initialWidth?: number;
    initialHeight?: number;
    enabled?: boolean;
}

function useWindowSize(
    options?: UseWindowSizeOptions
): WindowSize
\`\`\`

#### Parameters

- \`options\`: Configuration object
  - \`throttleDelay\`: Delay in ms for throttling resize events (default: 0)
  - \`initialWidth\`: Initial width value (default: window.innerWidth or 0)
  - \`initialHeight\`: Initial height value (default: window.innerHeight or 0)
  - \`enabled\`: Whether the hook is enabled (default: true)

#### Returns

- \`width\`: Current window width in pixels
- \`height\`: Current window height in pixels

### Common Use Cases

1. Responsive Layouts
   - Adapt component layouts based on window size
   - Implement custom breakpoints

2. Canvas Sizing
   - Resize canvas elements to match window dimensions
   - Maintain aspect ratios

3. Mobile/Desktop Detection
   - Switch between mobile and desktop views
   - Load different components based on screen size

4. Performance Optimization
   - Throttle resize event handling
   - Prevent unnecessary re-renders
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DemoComponent: React.FC = () => {
    const windowSize = useWindowSize();

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Window Size Demo</h2>
            <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-md">
                    <div className="mb-2">
                        <span className="font-medium">Width: </span>
                        <span className="text-blue-600">{windowSize.width}px</span>
                    </div>
                    <div>
                        <span className="font-medium">Height: </span>
                        <span className="text-blue-600">{windowSize.height}px</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600">
                    Resize your browser window to see the values update.
                </p>
            </div>
        </div>
    );
};

export const Default: Story = {
    render: () => <DemoComponent />,
};

const WithScrollbarDemoComponent: React.FC = () => {
    const windowSize = useWindowSize({ includeScrollbar: true });

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Window Size with Scrollbar</h2>
            <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-md">
                    <div className="mb-2">
                        <span className="font-medium">Width (with scrollbar): </span>
                        <span className="text-green-600">{windowSize.width}px</span>
                    </div>
                    <div>
                        <span className="font-medium">Height (with scrollbar): </span>
                        <span className="text-green-600">{windowSize.height}px</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600">
                    These measurements include the scrollbar width.
                </p>
            </div>
        </div>
    );
};

export const WithScrollbar: Story = {
    render: () => <WithScrollbarDemoComponent />,
};

const ResponsiveLayoutDemoComponent: React.FC = () => {
    const windowSize = useWindowSize({ debounceDelay: 100 });

    const getLayoutType = () => {
        if (windowSize.width < 640) return 'Mobile';
        if (windowSize.width < 1024) return 'Tablet';
        return 'Desktop';
    };

    const getBackgroundColor = () => {
        switch (getLayoutType()) {
            case 'Mobile':
                return 'bg-red-100';
            case 'Tablet':
                return 'bg-yellow-100';
            case 'Desktop':
                return 'bg-green-100';
            default:
                return 'bg-gray-100';
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Responsive Layout Demo</h2>
            <div className="space-y-4">
                <div className={`p-4 rounded-md ${getBackgroundColor()}`}>
                    <div className="mb-2">
                        <span className="font-medium">Current Layout: </span>
                        <span className="text-purple-600 font-bold">
                            {getLayoutType()}
                        </span>
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">Width: </span>
                        <span className="text-purple-600">{windowSize.width}px</span>
                    </div>
                    <div>
                        <span className="font-medium">Height: </span>
                        <span className="text-purple-600">{windowSize.height}px</span>
                    </div>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                    <p>Resize your browser to see different layouts:</p>
                    <ul className="list-disc list-inside">
                        <li>Mobile: &lt; 640px</li>
                        <li>Tablet: 640px - 1023px</li>
                        <li>Desktop: ≥ 1024px</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const ResponsiveLayout: Story = {
    render: () => <ResponsiveLayoutDemoComponent />,
}; 