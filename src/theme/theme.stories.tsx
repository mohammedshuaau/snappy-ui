import type {Meta} from '@storybook/react';
import {ThemeProvider} from './theme-provider';
import {Button} from '../components/Button/Button';
import {DarkModeToggle} from './dark-mode-toggle';

const meta = {
    title: 'Theme/Customization',
    component: ThemeProvider,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ThemeProvider>
                <div className="space-y-8">
                    <Story />
                    <div className="fixed bottom-4 right-4">
                        <DarkModeToggle />
                    </div>
                </div>
            </ThemeProvider>
        ),
    ],
} satisfies Meta<typeof ThemeProvider>;

export default meta;

export const CustomColors = () => {
    const customTheme = {
        colors: {
            primary: {
                50: '#f0fff4',
                100: '#dcfce7',
                200: '#bbf7d0',
                300: '#86efac',
                400: '#4ade80',
                500: '#22c55e',
                600: '#16a34a',
                700: '#15803d',
                800: '#166534',
                900: '#14532d',
            },
        },
    };

    return (
        <ThemeProvider theme={customTheme}>
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Custom Green Theme</h3>
                <div className="flex gap-4">
                    <Button>Default Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export const CustomRadius = () => {
    const customTheme = {
        radius: {
            default: '1rem',
            sm: '0.5rem',
            lg: '1.5rem',
        },
    };

    return (
        <ThemeProvider theme={customTheme}>
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Custom Border Radius</h3>
                <div className="flex gap-4">
                    <Button>Default Radius</Button>
                    <Button size="sm">Small Radius</Button>
                    <Button size="lg">Large Radius</Button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export const SystemDarkMode = () => {
    const theme = {
        darkMode: 'media' as const,
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="space-y-4">
                <h3 className="text-lg font-medium">System Dark Mode</h3>
                <p>This example uses your system's dark mode preference</p>
                <div className="flex gap-4">
                    <Button>Default Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                </div>
            </div>
        </ThemeProvider>
    );
}; 