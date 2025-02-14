import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import useMemoCompare, { deepEqual, shallowEqual } from './useMemoCompare';

const meta = {
    title: 'Hooks/useMemoCompare',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A React hook that memoizes a value with a custom comparison function, providing fine-grained control over value updates.

### Features
- Custom comparison function
- Deep and shallow comparison utilities
- Memoization of complex objects
- TypeScript support
- Performance optimization
- Circular reference handling

### Usage

\`\`\`tsx
import { useMemoCompare, shallowEqual, deepEqual } from '@mohammedshuaau/snappy-ui';

// Basic usage with shallow comparison
function UserProfile({ user }) {
    const memoizedUser = useMemoCompare(user, shallowEqual);

    return (
        <div>
            <h2>{memoizedUser.name}</h2>
            <p>{memoizedUser.email}</p>
        </div>
    );
}

// Custom comparison function
function ComplexComponent({ data }) {
    const memoizedData = useMemoCompare(data, (prev, next) => {
        return prev?.id === next?.id && prev?.version === next?.version;
    });

    return <div>{/* Use memoizedData */}</div>;
}

// Deep comparison for nested objects
function NestedDataComponent({ config }) {
    const memoizedConfig = useMemoCompare(config, deepEqual);

    return <div>{/* Use memoizedConfig */}</div>;
}
\`\`\`

### API Reference

\`\`\`tsx
type CompareFunction<T> = (prev: T | undefined, next: T) => boolean;

function useMemoCompare<T>(
    value: T,
    compare: CompareFunction<T>
): T

// Utility functions
function shallowEqual<T>(obj1: T, obj2: T): boolean;
function deepEqual<T>(obj1: T, obj2: T): boolean;
\`\`\`

#### Parameters

- \`value\`: The value to memoize
- \`compare\`: Function to compare previous and next values
  - Returns true if values are considered equal
  - Returns false if values are different

#### Returns

- The memoized value, which only updates when the comparison returns false

### Comparison Functions

1. \`shallowEqual\`
   - Compares object properties at the first level
   - Fast and suitable for flat objects
   - Example:
     \`\`\`tsx
     const obj1 = { a: 1, b: 2 };
     const obj2 = { a: 1, b: 2 };
     shallowEqual(obj1, obj2); // true
     \`\`\`

2. \`deepEqual\`
   - Recursively compares nested objects
   - Handles arrays and objects
   - Detects circular references
   - Example:
     \`\`\`tsx
     const obj1 = { a: { b: 1 } };
     const obj2 = { a: { b: 1 } };
     deepEqual(obj1, obj2); // true
     \`\`\`

### Common Use Cases

1. Complex Object Memoization
   - Prevent unnecessary re-renders
   - Optimize performance for deep objects

2. Custom Equality Checks
   - Compare specific object properties
   - Implement business-specific comparison logic

3. Performance Optimization
   - Reduce re-renders in large components
   - Optimize expensive calculations

4. State Management
   - Track meaningful state changes
   - Ignore irrelevant updates

### Best Practices

1. Choose the Right Comparison
   - Use shallowEqual for flat objects
   - Use deepEqual for nested structures
   - Implement custom comparison for specific needs

2. Performance Considerations
   - Avoid deep comparison for large objects
   - Use custom comparison for better performance
   - Consider memoizing the comparison function

3. TypeScript Integration
   - Leverage type safety
   - Define proper interfaces
   - Use generics appropriately
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DemoComponent: React.FC = () => {
    const [count, setCount] = React.useState(0);
    const [obj, setObj] = React.useState({ foo: 'bar', count: 0 });

    // Regular object reference
    const regularObj = { foo: 'bar', count };

    // Memoized object with shallow comparison
    const memoizedShallow = useMemoCompare(
        { foo: 'bar', count },
        shallowEqual
    );

    // Memoized object with deep comparison
    const memoizedDeep = useMemoCompare(
        { foo: 'bar', nested: { count } },
        deepEqual
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Object Comparison Demo</h2>
            <div className="space-y-6">
                <div className="space-y-2">
                    <button
                        onClick={() => setCount(c => c + 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Increment Count: {count}
                    </button>
                    <button
                        onClick={() => setObj(o => ({ ...o, count: o.count + 1 }))}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
                    >
                        Update Object Count: {obj.count}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded-md">
                        <h3 className="font-medium mb-2">Regular Object</h3>
                        <pre className="text-sm bg-white p-2 rounded">
                            {JSON.stringify(regularObj, null, 2)}
                        </pre>
                        <p className="text-sm text-gray-600 mt-2">
                            Object reference: {regularObj.toString()}
                        </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-md">
                        <h3 className="font-medium mb-2">Shallow Comparison</h3>
                        <pre className="text-sm bg-white p-2 rounded">
                            {JSON.stringify(memoizedShallow, null, 2)}
                        </pre>
                        <p className="text-sm text-blue-600 mt-2">
                            Object reference: {memoizedShallow.toString()}
                        </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-md">
                        <h3 className="font-medium mb-2">Deep Comparison</h3>
                        <pre className="text-sm bg-white p-2 rounded">
                            {JSON.stringify(memoizedDeep, null, 2)}
                        </pre>
                        <p className="text-sm text-green-600 mt-2">
                            Object reference: {memoizedDeep.toString()}
                        </p>
                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    <p>Notice how the object references change differently:</p>
                    <ul className="list-disc list-inside mt-2">
                        <li>Regular object creates a new reference on every render</li>
                        <li>
                            Shallow comparison maintains reference if top-level properties are
                            equal
                        </li>
                        <li>
                            Deep comparison maintains reference if nested properties are equal
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const Default: Story = {
    render: () => <DemoComponent />,
};

const CustomComparisonDemoComponent: React.FC = () => {
    const [state, setState] = React.useState({
        items: ['apple', 'banana', 'orange'],
        sortDirection: 'asc' as 'asc' | 'desc',
    });

    // Custom comparison function that only cares about array length and sort direction
    const customCompare = (prev: typeof state | undefined, next: typeof state) => {
        if (!prev) return false;
        return (
            prev.items.length === next.items.length &&
            prev.sortDirection === next.sortDirection
        );
    };

    const memoizedState = useMemoCompare(state, customCompare);

    const toggleSort = () => {
        setState(s => ({
            ...s,
            sortDirection: s.sortDirection === 'asc' ? 'desc' : 'asc',
        }));
    };

    const addItem = () => {
        setState(s => ({
            ...s,
            items: [...s.items, `Item ${s.items.length + 1}`],
        }));
    };

    const removeItem = () => {
        setState(s => ({
            ...s,
            items: s.items.slice(0, -1),
        }));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Custom Comparison Demo</h2>
            <div className="space-y-6">
                <div className="space-x-2">
                    <button
                        onClick={toggleSort}
                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                        Toggle Sort: {state.sortDirection}
                    </button>
                    <button
                        onClick={addItem}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Add Item
                    </button>
                    <button
                        onClick={removeItem}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Remove Item
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-md">
                        <h3 className="font-medium mb-2">Current State</h3>
                        <pre className="text-sm bg-white p-2 rounded">
                            {JSON.stringify(state, null, 2)}
                        </pre>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-md">
                        <h3 className="font-medium mb-2">Memoized State</h3>
                        <pre className="text-sm bg-white p-2 rounded">
                            {JSON.stringify(memoizedState, null, 2)}
                        </pre>
                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    <p>
                        The memoized state only updates when the array length or sort
                        direction changes, even if the array items themselves change.
                    </p>
                </div>
            </div>
        </div>
    );
};

export const CustomComparison: Story = {
    render: () => <CustomComparisonDemoComponent />,
}; 