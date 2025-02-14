import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import useDebounce from './useDebounce';

const meta = {
    title: 'Hooks/useDebounce',
    component: DemoComponent,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A React hook that debounces a value, delaying updates until after a specified delay has elapsed since the last change.

### Features
- Debounce any value type
- Configurable delay
- Optional immediate update on first call
- TypeScript support
- Enable/disable functionality

### Usage

\`\`\`tsx
import { useDebounce } from '@mohammedshuaau/snappy-ui';

function SearchComponent() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, {
        delay: 500,
        immediate: false
    });

    React.useEffect(() => {
        // This effect will only run after the debounced value changes
        console.log('Searching for:', debouncedSearchTerm);
        // Perform search API call here
    }, [debouncedSearchTerm]);

    return (
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
        />
    );
}
\`\`\`

### API Reference

\`\`\`tsx
interface UseDebounceOptions {
    delay?: number;        // Delay in milliseconds (default: 500)
    immediate?: boolean;   // Update immediately on first call (default: false)
    enabled?: boolean;     // Whether the hook is enabled (default: true)
}

function useDebounce<T>(
    value: T,
    options?: UseDebounceOptions
): T
\`\`\`

#### Parameters

- \`value\`: The value to debounce (can be any type)
- \`options\`: Configuration options
  - \`delay\`: Time in milliseconds to wait before updating (default: 500)
  - \`immediate\`: Whether to update immediately on the first call (default: false)
  - \`enabled\`: Whether debouncing is enabled (default: true)

#### Returns

- The debounced value, which updates after the specified delay

### Common Use Cases

1. Search Input
   - Debounce search API calls to reduce server load
   - Improve performance by reducing unnecessary requests

2. Window Resize Handling
   - Debounce resize event handlers
   - Prevent excessive calculations or re-renders

3. Form Validation
   - Debounce validation checks
   - Provide better user experience by reducing validation frequency

4. Auto-Save
   - Debounce save operations
   - Reduce the frequency of API calls or storage operations
`,
            },
        },
    },
    argTypes: {
        delay: {
            control: { type: 'number' },
            description: 'Debounce delay in milliseconds',
            defaultValue: 500,
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 500 },
            },
        },
        immediate: {
            control: { type: 'boolean' },
            description: 'Whether to update immediately on first call',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        enabled: {
            control: { type: 'boolean' },
            description: 'Whether debouncing is enabled',
            defaultValue: true,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DemoComponent>;

export default meta;
type Story = StoryObj<typeof DemoComponent>;

interface DemoComponentProps {
    delay?: number;
    immediate?: boolean;
    enabled?: boolean;
}

function DemoComponent({ delay = 500, immediate = false, enabled = true }: DemoComponentProps) {
    const [inputValue, setInputValue] = React.useState('');
    const debouncedValue = useDebounce(inputValue, { delay, immediate, enabled });

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Search with Debounce</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type something
                    </label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Start typing..."
                    />
                </div>

                <div className="p-4 bg-gray-100 rounded-md">
                    <div className="mb-2">
                        <span className="font-medium">Current Value: </span>
                        <span className="text-blue-600">{inputValue}</span>
                    </div>
                    <div>
                        <span className="font-medium">Debounced Value: </span>
                        <span className="text-green-600">{debouncedValue}</span>
                    </div>
                </div>

                <div className="text-sm space-y-2">
                    <p className="text-gray-600">
                        The debounced value updates {delay}ms after you stop typing.
                    </p>
                    <p className="text-gray-600">
                        Immediate mode: {immediate ? 'On' : 'Off'}
                    </p>
                    <p className="text-gray-600">
                        Debouncing {enabled ? 'enabled' : 'disabled'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export const Default: Story = {
    args: {
        delay: 500,
        immediate: false,
        enabled: true,
    },
};

export const FastDebounce: Story = {
    args: {
        delay: 100,
        immediate: false,
        enabled: true,
    },
};

export const ImmediateMode: Story = {
    args: {
        delay: 500,
        immediate: true,
        enabled: true,
    },
};

export const Disabled: Story = {
    args: {
        delay: 500,
        immediate: false,
        enabled: false,
    },
};

const ImmediateDemoComponent: React.FC = () => {
    const [inputValue, setInputValue] = React.useState('initial');
    const debouncedValue = useDebounce(inputValue, {
        delay: 500,
        immediate: true,
    });

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Immediate Update Demo</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type something
                    </label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Start typing..."
                    />
                </div>

                <div className="p-4 bg-gray-100 rounded-md">
                    <div className="mb-2">
                        <span className="font-medium">Current Value: </span>
                        <span className="text-blue-600">{inputValue}</span>
                    </div>
                    <div>
                        <span className="font-medium">Debounced Value: </span>
                        <span className="text-green-600">{debouncedValue}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600">
                    The initial value is shown immediately, then updates are debounced.
                </p>
            </div>
        </div>
    );
};

export const WithImmediate: Story = {
    render: () => <ImmediateDemoComponent />,
};

const APISearchDemoComponent: React.FC = () => {
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(false);
    const debouncedQuery = useDebounce(query, { delay: 300 });

    // Simulate API call
    React.useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
            return;
        }

        setLoading(true);
        // Simulate API delay
        const timer = setTimeout(() => {
            setResults([
                `Result 1 for "${debouncedQuery}"`,
                `Result 2 for "${debouncedQuery}"`,
                `Result 3 for "${debouncedQuery}"`,
            ]);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [debouncedQuery]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">API Search Demo</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search
                    </label>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Start typing to search..."
                    />
                </div>

                <div className="min-h-[100px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-[100px]">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {results.map((result, index) => (
                                <li
                                    key={index}
                                    className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                                >
                                    {result}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <p className="text-sm text-gray-600">
                    Search is debounced by 300ms to prevent too many API calls.
                </p>
            </div>
        </div>
    );
};

export const APISearch: Story = {
    render: () => <APISearchDemoComponent />,
}; 