import type {Meta, StoryObj} from '@storybook/react';
import ResizablePanel from './ResizablePanel';

const meta = {
    title: 'Advanced/ResizablePanel',
    component: ResizablePanel,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A resizable panel component that allows users to adjust its size by dragging a handle.
Supports both horizontal and vertical resizing, with features like collapsible panels,
minimum and maximum size constraints, and custom styling.

Features:
- Horizontal and vertical resizing
- Collapsible panels with double-click
- Minimum and maximum size constraints
- Custom styling and variants
- Keyboard accessibility
- Dark mode support

\`\`\`jsx
import { ResizablePanel } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <ResizablePanel
      initialSize={200}
      minSize={100}
      maxSize={500}
      collapsible
    >
      <div>Resizable content</div>
    </ResizablePanel>
  );
}
\`\`\`
`,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'ghost'],
        },
        direction: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
    },
} satisfies Meta<typeof ResizablePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = ({ direction = 'horizontal' }: { direction?: 'horizontal' | 'vertical' }) => (
    <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Panel Content</h3>
        <p className="text-slate-600 dark:text-slate-400">
            This is a resizable panel. Drag the handle to resize it.
            {direction === 'horizontal' ? ' ←→' : ' ↑↓'}
        </p>
    </div>
);

export const Default: Story = {
    args: {
        children: <DemoContent />,
        initialSize: 300,
    },
};

export const Vertical: Story = {
    args: {
        children: <DemoContent />,
        direction: 'vertical',
        initialSize: 200,
    },
};

export const Collapsible: Story = {
    args: {
        children: <DemoContent />,
        collapsible: true,
        initialSize: 300,
    },
};

export const CustomSizeConstraints: Story = {
    args: {
        children: <DemoContent />,
        initialSize: 300,
        minSize: 200,
        maxSize: 400,
    },
};

export const Ghost: Story = {
    args: {
        children: <DemoContent />,
        variant: 'ghost',
        initialSize: 300,
    },
};

const SplitPaneExample = () => {
    return (
        <div className="flex h-[400px] w-[800px] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <ResizablePanel initialSize={300} minSize={200} maxSize={500}>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Left Panel</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        This is the left panel. Drag the handle to resize.
                    </p>
                </div>
            </ResizablePanel>
            <div className="flex-1 p-4">
                <h3 className="text-lg font-semibold mb-2">Right Panel</h3>
                <p className="text-slate-600 dark:text-slate-400">
                    This is the right panel. It will adjust to fill the remaining space.
                </p>
            </div>
        </div>
    );
};

export const SplitPane: Story = {
    render: () => <SplitPaneExample />,
    args: {
        children: <div />,
        initialSize: 300,
    },
};

const MultiPaneExample = () => {
    return (
        <div className="h-[400px] w-[800px] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <ResizablePanel direction="vertical" initialSize={150} minSize={100} maxSize={250}>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">Top Panel</h3>
                    <p className="text-slate-600 dark:text-slate-400">Drag to resize vertically.</p>
                </div>
            </ResizablePanel>
            <div className="flex flex-1">
                <ResizablePanel initialSize={250} minSize={150} maxSize={400}>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Left Panel</h3>
                        <p className="text-slate-600 dark:text-slate-400">Drag to resize horizontally.</p>
                    </div>
                </ResizablePanel>
                <div className="flex-1 p-4">
                    <h3 className="text-lg font-semibold">Main Content</h3>
                    <p className="text-slate-600 dark:text-slate-400">This area adjusts automatically.</p>
                </div>
            </div>
        </div>
    );
};

export const MultiPane: Story = {
    render: () => <MultiPaneExample />,
    args: {
        children: <div />,
        initialSize: 300,
    },
};

export const CustomStyled: Story = {
    args: {
        children: <DemoContent />,
        initialSize: 300,
        sx: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transform: 'scale(1)',
            transition: 'all 0.2s ease-in-out',
        },
    },
}; 