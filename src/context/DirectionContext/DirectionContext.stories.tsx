import type {Meta, StoryObj} from '@storybook/react';
import {DirectionProvider, useDirection} from './DirectionContext';

const meta = {
    title: 'Context/DirectionContext',
    component: DirectionProvider,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A context provider for managing text direction (RTL/LTR) throughout the application.

Features:
- RTL/LTR support
- Direction toggling
- Automatic document direction updates
- Direction-aware styling
- Easy integration with components

\`\`\`jsx
import { DirectionProvider, useDirection } from '@mohammedshuaau/snappy-ui';

function App() {
  return (
    <DirectionProvider defaultDirection="ltr">
      <YourComponents />
    </DirectionProvider>
  );
}

function YourComponent() {
  const { direction, toggleDirection, isRTL } = useDirection();
  return (
    <div>
      <p>Current direction: {direction}</p>
      <button onClick={toggleDirection}>Toggle Direction</button>
    </div>
  );
}
\`\`\`
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DirectionProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const DirectionDemo = () => {
    const { direction, toggleDirection, isRTL } = useDirection();

    return (
        <div className="space-y-4 text-center">
            <p className="text-lg font-semibold">
                Current Direction: <span className="text-primary-600">{direction}</span>
            </p>
            <p className="text-sm text-slate-600">
                Is RTL: <span className="font-medium">{isRTL ? 'Yes' : 'No'}</span>
            </p>
            <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <div className="h-8 w-8 bg-blue-500" />
                <div className="h-8 w-8 bg-green-500" />
                <div className="h-8 w-8 bg-red-500" />
            </div>
            <button
                onClick={toggleDirection}
                className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
                Toggle Direction
            </button>
        </div>
    );
};

export const Default: Story = {
    args: {
        defaultDirection: 'ltr',
        children: <DirectionDemo />,
    },
    render: () => (
        <DirectionProvider>
            <DirectionDemo />
        </DirectionProvider>
    ),
};

export const RTLDefault: Story = {
    args: {
        defaultDirection: 'rtl',
        children: <DirectionDemo />,
    },
    render: () => (
        <DirectionProvider defaultDirection="rtl">
            <DirectionDemo />
        </DirectionProvider>
    ),
}; 