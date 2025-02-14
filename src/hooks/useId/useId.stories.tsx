import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import useId from './useId';

const meta = {
    title: 'Hooks/useId',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A React hook for generating unique, stable IDs for accessibility and DOM manipulation.

### Features
- Generate unique IDs
- Stable across re-renders
- SSR support
- Prefix customization
- TypeScript support
- Fallback to React.useId when available

### Usage

\`\`\`tsx
import { useId } from '@mohammedshuaau/snappy-ui';

function FormField({ label }: { label: string }) {
    const id = useId();
    // or with prefix
    const prefixedId = useId('field');

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} type="text" />
        </div>
    );
}

// Multiple IDs with same prefix
function ComplexForm() {
    const fieldId = useId('field');

    return (
        <form>
            <div>
                <label htmlFor={\`\${fieldId}-name\`}>Name</label>
                <input id={\`\${fieldId}-name\`} type="text" />
            </div>
            <div>
                <label htmlFor={\`\${fieldId}-email\`}>Email</label>
                <input id={\`\${fieldId}-email\`} type="email" />
            </div>
        </form>
    );
}
\`\`\`

### API Reference

\`\`\`tsx
function useId(
    prefix?: string
): string
\`\`\`

#### Parameters

- \`prefix\`: Optional string prefix for the generated ID

#### Returns

- A unique string ID that remains stable across re-renders

### Common Use Cases

1. Form Accessibility
   - Generate unique IDs for form inputs and labels
   - Ensure proper label-input associations

2. ARIA Attributes
   - Create unique IDs for aria-labelledby
   - Link descriptions with aria-describedby

3. Component Libraries
   - Generate stable IDs for components
   - Maintain consistency across SSR and client

4. DOM Manipulation
   - Create reliable element references
   - Target specific elements with JavaScript

### Best Practices

1. Accessibility
   - Always use IDs for form labels and inputs
   - Maintain proper ARIA relationships

2. SSR Compatibility
   - Ensure IDs match between server and client
   - Use consistent prefixes

3. Performance
   - Avoid generating IDs unnecessarily
   - Reuse IDs when appropriate

4. Naming Conventions
   - Use descriptive prefixes
   - Follow consistent naming patterns
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DemoComponent: React.FC = () => {
    const generateId = useId();
    const [ids, setIds] = React.useState<string[]>([]);

    const addNewId = () => {
        setIds(prev => [...prev, generateId()]);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Sequential ID Generator</h2>
            <div className="space-y-4">
                <button
                    onClick={addNewId}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Generate New ID
                </button>

                <div className="p-4 bg-gray-100 rounded-md">
                    <h3 className="font-medium mb-2">Generated IDs:</h3>
                    <div className="space-y-2">
                        {ids.map((id, index) => (
                            <div
                                key={index}
                                className="px-3 py-1 bg-white rounded border border-gray-200"
                            >
                                {id}
                            </div>
                        ))}
                    </div>
                    {ids.length === 0 && (
                        <p className="text-gray-500 italic">No IDs generated yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export const Default: Story = {
    render: () => <DemoComponent />,
};

const PrefixDemoComponent: React.FC = () => {
    const generateFooId = useId({ prefix: 'foo' });
    const generateBarId = useId({ prefix: 'bar' });
    const [fooIds, setFooIds] = React.useState<string[]>([]);
    const [barIds, setBarIds] = React.useState<string[]>([]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Prefixed ID Generator</h2>
            <div className="space-y-6">
                <div>
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={() => setFooIds(prev => [...prev, generateFooId()])}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Generate 'foo' ID
                        </button>
                        <button
                            onClick={() => setBarIds(prev => [...prev, generateBarId()])}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Generate 'bar' ID
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-md">
                            <h3 className="font-medium mb-2 text-blue-700">foo IDs:</h3>
                            <div className="space-y-2">
                                {fooIds.map((id, index) => (
                                    <div
                                        key={index}
                                        className="px-3 py-1 bg-white rounded border border-blue-200"
                                    >
                                        {id}
                                    </div>
                                ))}
                                {fooIds.length === 0 && (
                                    <p className="text-blue-500 italic">No IDs generated yet</p>
                                )}
                            </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-md">
                            <h3 className="font-medium mb-2 text-green-700">bar IDs:</h3>
                            <div className="space-y-2">
                                {barIds.map((id, index) => (
                                    <div
                                        key={index}
                                        className="px-3 py-1 bg-white rounded border border-green-200"
                                    >
                                        {id}
                                    </div>
                                ))}
                                {barIds.length === 0 && (
                                    <p className="text-green-500 italic">No IDs generated yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const WithPrefix: Story = {
    render: () => <PrefixDemoComponent />,
};

const RandomDemoComponent: React.FC = () => {
    const generateRandomId = useId({ random: true });
    const generatePrefixedRandomId = useId({ random: true, prefix: 'test' });
    const [randomIds, setRandomIds] = React.useState<string[]>([]);
    const [prefixedRandomIds, setPrefixedRandomIds] = React.useState<string[]>([]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Random ID Generator</h2>
            <div className="space-y-6">
                <div>
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={() => setRandomIds(prev => [...prev, generateRandomId()])}
                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                            Generate Random ID
                        </button>
                        <button
                            onClick={() =>
                                setPrefixedRandomIds(prev => [...prev, generatePrefixedRandomId()])
                            }
                            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                        >
                            Generate Prefixed Random ID
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-purple-50 rounded-md">
                            <h3 className="font-medium mb-2 text-purple-700">Random IDs:</h3>
                            <div className="space-y-2">
                                {randomIds.map((id, index) => (
                                    <div
                                        key={index}
                                        className="px-3 py-1 bg-white rounded border border-purple-200"
                                    >
                                        {id}
                                    </div>
                                ))}
                                {randomIds.length === 0 && (
                                    <p className="text-purple-500 italic">No IDs generated yet</p>
                                )}
                            </div>
                        </div>

                        <div className="p-4 bg-pink-50 rounded-md">
                            <h3 className="font-medium mb-2 text-pink-700">
                                Prefixed Random IDs:
                            </h3>
                            <div className="space-y-2">
                                {prefixedRandomIds.map((id, index) => (
                                    <div
                                        key={index}
                                        className="px-3 py-1 bg-white rounded border border-pink-200"
                                    >
                                        {id}
                                    </div>
                                ))}
                                {prefixedRandomIds.length === 0 && (
                                    <p className="text-pink-500 italic">No IDs generated yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const WithRandom: Story = {
    render: () => <RandomDemoComponent />,
}; 