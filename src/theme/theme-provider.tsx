import React, {createContext, useContext, useEffect} from 'react';

export interface ThemeConfig {
    colors?: {
        primary?: {
            50?: string;
            100?: string;
            200?: string;
            300?: string;
            400?: string;
            500?: string;
            600?: string;
            700?: string;
            800?: string;
            900?: string;
        };
        secondary?: {
            50?: string;
            100?: string;
            200?: string;
            300?: string;
            400?: string;
            500?: string;
            600?: string;
            700?: string;
            800?: string;
            900?: string;
        };
    };
    radius?: {
        default?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
        '2xl'?: string;
    };
    darkMode?: 'class' | 'media';
}

export interface ThemeProviderProps {
    children: React.ReactNode;
    theme?: ThemeConfig;
}

const ThemeContext = createContext<ThemeConfig | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export function ThemeProvider({
    children,
    theme = {},
}: ThemeProviderProps) {
    useEffect(() => {
        const root = document.documentElement;

        // Set color variables
        if (theme.colors?.primary) {
            Object.entries(theme.colors.primary).forEach(([key, value]) => {
                if (value) {
                    root.style.setProperty(`--primary-${key}`, value);
                }
            });
        }

        if (theme.colors?.secondary) {
            Object.entries(theme.colors.secondary).forEach(([key, value]) => {
                if (value) {
                    root.style.setProperty(`--secondary-${key}`, value);
                }
            });
        }

        // Set radius variables
        if (theme.radius) {
            Object.entries(theme.radius).forEach(([key, value]) => {
                if (value) {
                    root.style.setProperty(
                        `--radius-${key === 'default' ? 'default' : key.toLowerCase()}`,
                        value
                    );
                }
            });
        }

        // Set dark mode preference
        if (theme.darkMode === 'media') {
            root.classList.remove('dark');
            document.documentElement.setAttribute('data-mode', 'media');

            // Listen to system dark mode changes
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent) => {
                if (e.matches) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            };

            mediaQuery.addEventListener('change', handleChange);

            // Initial check
            if (mediaQuery.matches) {
                root.classList.add('dark');
            }

            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            document.documentElement.setAttribute('data-mode', 'class');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider; 