import {useTheme} from './theme-provider';

export interface DarkModeToggleProps {
    className?: string;
}

export function DarkModeToggle({ className }: DarkModeToggleProps) {
    const theme = useTheme();
    const isDarkMode = document.documentElement.classList.contains('dark');

    const toggleDarkMode = () => {
        if (theme.darkMode === 'media') {
            console.warn('Dark mode is controlled by system preferences');
            return;
        }

        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
        }
    };

    if (theme.darkMode === 'media') {
        return null;
    }

    return (
        <button
            onClick={toggleDarkMode}
            className={className || "fixed bottom-4 right-4 p-2 bg-secondary-200 dark:bg-secondary-800 rounded-md"}
            style={{ zIndex: 9999 }}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? '🌞' : '🌙'}
        </button>
    );
}

export default DarkModeToggle; 