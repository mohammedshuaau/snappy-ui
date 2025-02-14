import type { Meta, StoryObj } from '@storybook/react';
import { BreakpointProvider, useBreakpoint } from './BreakpointContext';

const meta = {
    title: 'Context/BreakpointContext',
    component: BreakpointProvider,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A context provider for managing responsive breakpoints and viewport sizes.

Features:
- Predefined breakpoints (xs, sm, md, lg, xl, 2xl)
- Custom breakpoint configuration
- Responsive utilities (up, down, between, only)
- Current breakpoint detection
- Viewport size tracking
- Easy integration with components

\`\`\`jsx
import { BreakpointProvider, useBreakpoint } from '@mohammedshuaau/snappy-ui';

function App() {
  return (
    <BreakpointProvider>
      <YourComponents />
    </BreakpointProvider>
  );
}

function YourComponent() {
  const { breakpoint, up, down, between } = useBreakpoint();
  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      {up('md') && <p>Viewport is medium or larger</p>}
      {down('sm') && <p>Viewport is smaller than small</p>}
      {between('sm', 'lg') && <p>Viewport is between small and large</p>}
    </div>
  );
}
\`\`\`
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof BreakpointProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const BreakpointDemo = () => {
    const { breakpoint, width, up, down, between, only } = useBreakpoint();

    return (
        <div className="space-y-4 min-w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Breakpoint Information</h3>
            <div className="space-y-2 text-sm">
                <p>
                    <span className="font-medium">Current Breakpoint:</span>{' '}
                    <span className="text-primary-600">{breakpoint}</span>
                </p>
                <p>
                    <span className="font-medium">Viewport Width:</span>{' '}
                    {width}px
                </p>
                <div className="space-y-1 mt-4">
                    <p className="font-medium">Breakpoint Queries:</p>
                    <p className={up('md') ? 'text-green-600' : 'text-slate-400'}>
                        up('md'): {up('md') ? 'true' : 'false'}
                    </p>
                    <p className={down('lg') ? 'text-green-600' : 'text-slate-400'}>
                        down('lg'): {down('lg') ? 'true' : 'false'}
                    </p>
                    <p className={between('sm', 'lg') ? 'text-green-600' : 'text-slate-400'}>
                        between('sm', 'lg'): {between('sm', 'lg') ? 'true' : 'false'}
                    </p>
                    <p className={only('md') ? 'text-green-600' : 'text-slate-400'}>
                        only('md'): {only('md') ? 'true' : 'false'}
                    </p>
                </div>
            </div>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-md">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                    Resize your browser window to see the values update
                </p>
            </div>
        </div>
    );
};

export const Default: Story = {
    args: {
        children: <BreakpointDemo />,
    },
    render: () => (
        <BreakpointProvider>
            <BreakpointDemo />
        </BreakpointProvider>
    ),
};

export const CustomBreakpoints: Story = {
    args: {
        breakpoints: {
            sm: 480,
            md: 720,
            lg: 960,
            xl: 1200,
            '2xl': 1400,
        },
        children: <BreakpointDemo />,
    },
    render: () => (
        <BreakpointProvider
            breakpoints={{
                sm: 480,
                md: 720,
                lg: 960,
                xl: 1200,
                '2xl': 1400,
            }}
        >
            <BreakpointDemo />
        </BreakpointProvider>
    ),
}; 