/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'white',
                'background-dark': '#020817',
                primary: {
                    50: 'var(--primary-50, #f0f9ff)',
                    100: 'var(--primary-100, #e0f2fe)',
                    200: 'var(--primary-200, #bae6fd)',
                    300: 'var(--primary-300, #7dd3fc)',
                    400: 'var(--primary-400, #38bdf8)',
                    500: 'var(--primary-500, #0ea5e9)',
                    600: 'var(--primary-600, #0284c7)',
                    700: 'var(--primary-700, #0369a1)',
                    800: 'var(--primary-800, #075985)',
                    900: 'var(--primary-900, #0c4a6e)',
                },
                secondary: {
                    50: 'var(--secondary-50, #f8fafc)',
                    100: 'var(--secondary-100, #f1f5f9)',
                    200: 'var(--secondary-200, #e2e8f0)',
                    300: 'var(--secondary-300, #cbd5e1)',
                    400: 'var(--secondary-400, #94a3b8)',
                    500: 'var(--secondary-500, #64748b)',
                    600: 'var(--secondary-600, #475569)',
                    700: 'var(--secondary-700, #334155)',
                    800: 'var(--secondary-800, #1e293b)',
                    900: 'var(--secondary-900, #0f172a)',
                },
            },
            animation: {
                'spin-slow': 'spin 2s linear infinite',
                'in': 'in 0.2s ease-out',
                'out': 'out 0.2s ease-in',
                'slide-in-right': 'slide-in-right 0.2s ease-out',
                'slide-out-right': 'slide-out-right 0.2s ease-in',
                'slide-in-left': 'slide-in-left 0.2s ease-out',
                'slide-out-left': 'slide-out-left 0.2s ease-in',
                'slide-in-top': 'slide-in-top 0.2s ease-out',
                'slide-out-top': 'slide-out-top 0.2s ease-in',
                'slide-in-bottom': 'slide-in-bottom 0.2s ease-out',
                'slide-out-bottom': 'slide-out-bottom 0.2s ease-in',
                'zoom-in': 'zoom-in 0.2s ease-out',
                'zoom-out': 'zoom-out 0.2s ease-in',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            keyframes: {
                'in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                'slide-in-right': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'slide-out-right': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'slide-out-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'slide-in-top': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'slide-out-top': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-100%)' },
                },
                'slide-in-bottom': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'slide-out-bottom': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                'zoom-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'zoom-out': {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '100%': { transform: 'scale(0.95)', opacity: '0' },
                },
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            borderRadius: {
                DEFAULT: 'var(--radius-default, 0.25rem)',
                sm: 'var(--radius-sm, 0.125rem)',
                md: 'var(--radius-md, 0.375rem)',
                lg: 'var(--radius-lg, 0.5rem)',
                xl: 'var(--radius-xl, 0.75rem)',
                '2xl': 'var(--radius-2xl, 1rem)',
            },
            ringColor: {
                DEFAULT: 'var(--ring-color, #0ea5e9)',
            },
            ringOffsetColor: {
                DEFAULT: 'var(--ring-offset-color, white)',
            },
            ringOffsetWidth: {
                DEFAULT: '2px',
            },
            ringWidth: {
                DEFAULT: '2px',
            },
        },
    },
    plugins: [],
} 