import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        darkMode: {
            current: 'dark',
            darkClass: 'dark',
            stylePreview: true,
        },
    },
    decorators: [
        (Story) => (
            <div className="min-h-screen p-4 bg-white dark:bg-gray-900">
                <Story />
            </div>
        ),
    ],
};

export default preview; 