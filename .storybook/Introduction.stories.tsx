import React from 'react';
import type { Meta } from '@storybook/react';

const meta = {
    title: 'Getting Started',
    parameters: {
        layout: 'fullscreen',
        previewTabs: {
            canvas: { hidden: true },
        },
        options: {
            showPanel: false,
        },
    },
} satisfies Meta;

export default meta;

export const Introduction = () => {
    return (
        <div className="p-16 min-h-screen bg-white dark:bg-slate-900">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="mb-24 pt-8">
                    <h1 className="mb-6 mt-6 text-3xl font-bold text-slate-900 dark:text-white">
                        Snap Kit
                    </h1>
                    <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
                        A modern React component library built with TypeScript and Tailwind CSS.
                    </p>
                    <div className="flex gap-2 mt-4">
                        <img src="https://img.shields.io/npm/v/@mohammedshuaau/snappy-ui.svg" alt="npm version" />
                        <img src="https://img.shields.io/badge/TypeScript-Ready-blue.svg" alt="TypeScript" />
                        <img src="https://img.shields.io/badge/Tailwind%20CSS-Powered-06B6D4.svg" alt="Tailwind CSS" />
                    </div>
                </header>

                {/* Installation */}
                <section className="mb-24">
                    <h2 className="mb-6 mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
                        Installation
                    </h2>
                    <pre className="p-4 mb-2 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">
                        <code className="text-sm text-slate-900 dark:text-slate-100">npm install @mohammedshuaau/snappy-ui</code>
                    </pre>
                    <pre className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">
                        <code className="text-sm text-slate-900 dark:text-slate-100">yarn add @mohammedshuaau/snappy-ui</code>
                    </pre>
                </section>

                {/* Usage */}
                <section className="mb-24">
                    <h2 className="mb-6 mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
                        Usage
                    </h2>
                    <pre className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">
                        <code className="text-sm text-slate-900 dark:text-slate-100">{`import { Button } from '@mohammedshuaau/snappy-ui'

function App() {
  return <Button>Click me</Button>
}`}</code>
                    </pre>
                </section>

                {/* Features */}
                <section className="mb-24">
                    <h2 className="mb-6 mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
                        Features
                    </h2>
                    <ul className="grid grid-cols-2 gap-4 text-slate-600 dark:text-slate-400">
                        <li>• 70+ Components</li>
                        <li>• TypeScript First</li>
                        <li>• Dark Mode Support</li>
                        <li>• Fully Accessible</li>
                        <li>• Tailwind Powered</li>
                        <li>• Mobile Responsive</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}; 