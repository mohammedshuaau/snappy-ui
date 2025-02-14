import type { Meta, StoryObj } from '@storybook/react';
import { MediaQueryProvider, useMediaQuery } from './MediaQueryContext';

const meta = {
    title: 'Context/MediaQueryContext',
    component: MediaQueryProvider,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A context provider for responsive design and device capabilities detection.

Features:
- Device type detection (mobile/tablet/desktop)
- Orientation detection
- Screen size tracking
- Device capability detection (hover, pointer)
- Responsive breakpoints
- Easy integration with components

\`\`\`jsx
import { MediaQueryProvider, useMediaQuery } from '@mohammedshuaau/snappy-ui';

function App() {
  return (
    <MediaQueryProvider>
      <YourComponents />
    </MediaQueryProvider>
  );
}

function YourComponent() {
  const { isMobile, isTablet, isDesktop, isPortrait } = useMediaQuery();
  return (
    <div>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}
\`\`\`
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof MediaQueryProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const MediaQueryDemo = () => {
    const {
        isMobile,
        isTablet,
        isPortrait,
        hasHover,
        hasFinePointer,
        screenWidth,
        screenHeight,
    } = useMediaQuery();

    return (
        <div className="space-y-4 min-w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Device Information</h3>
            <div className="space-y-2 text-sm">
                <p>
                    <span className="font-medium">Device Type:</span>{' '}
                    {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
                </p>
                <p>
                    <span className="font-medium">Orientation:</span>{' '}
                    {isPortrait ? 'Portrait' : 'Landscape'}
                </p>
                <p>
                    <span className="font-medium">Screen Size:</span>{' '}
                    {screenWidth}x{screenHeight}
                </p>
                <p>
                    <span className="font-medium">Hover Support:</span>{' '}
                    {hasHover ? 'Yes' : 'No'}
                </p>
                <p>
                    <span className="font-medium">Fine Pointer:</span>{' '}
                    {hasFinePointer ? 'Yes' : 'No'}
                </p>
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
        children: <MediaQueryDemo />,
    },
    render: () => (
        <MediaQueryProvider>
            <MediaQueryDemo />
        </MediaQueryProvider>
    ),
};

export const CustomBreakpoints: Story = {
    args: {
        mobileBreakpoint: 480,
        tabletBreakpoint: 960,
        children: <MediaQueryDemo />,
    },
    render: () => (
        <MediaQueryProvider mobileBreakpoint={480} tabletBreakpoint={960}>
            <MediaQueryDemo />
        </MediaQueryProvider>
    ),
}; 