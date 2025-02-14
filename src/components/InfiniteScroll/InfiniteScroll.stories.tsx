import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import InfiniteScroll from './InfiniteScroll';

const meta = {
    title: 'Advanced/InfiniteScroll',
    component: InfiniteScroll,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A component that automatically loads more content as the user scrolls.
Perfect for handling large lists, feeds, or any content that should be loaded incrementally.

Features:
- Automatic loading when scrolling near the bottom
- Support for both window and container scrolling
- Loading indicators and error states
- Customizable threshold for triggering loads
- Accessibility support
- Dark mode compatible

\`\`\`jsx
import { InfiniteScroll } from '@mohammedshuaau/snappy-ui';

function Example() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    const newItems = await fetchMoreItems();
    setItems([...items, ...newItems]);
    setHasMore(newItems.length > 0);
  };

  return (
    <InfiniteScroll
      onLoadMore={loadMore}
      hasMore={hasMore}
    >
      {items.map(item => (
        <div key={item.id}>{item.content}</div>
      ))}
    </InfiniteScroll>
  );
}
\`\`\`
`,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'contained'],
        },
        threshold: {
            control: 'number',
        },
        useWindow: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof InfiniteScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to generate items
const generateItems = (startIndex: number, count: number) =>
    Array.from({ length: count }, (_, i) => ({
        id: startIndex + i,
        content: `Item ${startIndex + i}`,
    }));

// Example component with window scrolling
const WindowScrollExample = () => {
    const [items, setItems] = useState(generateItems(0, 20));
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newItems = generateItems(items.length, 10);
        setItems([...items, ...newItems]);
        setHasMore(items.length < 100);
        setIsLoading(false);
    };

    return (
        <InfiniteScroll
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoading={isLoading}
        >
            <div className="space-y-4 w-[600px]">
                {items.map(item => (
                    <div
                        key={item.id}
                        className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow"
                    >
                        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                            {item.content}
                        </h3>
                        <p className="mt-1 text-slate-600 dark:text-slate-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
};

// Example component with container scrolling
const ContainerScrollExample = () => {
    const [items, setItems] = useState(generateItems(0, 10));
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newItems = generateItems(items.length, 5);
        setItems([...items, ...newItems]);
        setHasMore(items.length < 50);
        setIsLoading(false);
    };

    return (
        <InfiniteScroll
            variant="contained"
            useWindow={false}
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoading={isLoading}
            className="w-[400px] h-[400px]"
        >
            <div className="space-y-4 p-4">
                {items.map(item => (
                    <div
                        key={item.id}
                        className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow"
                    >
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">
                            {item.content}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Container scrolling example
                        </p>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
};

// Example with error handling
const ErrorExample = () => {
    const [items, setItems] = useState(generateItems(0, 10));
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [errorCount, setErrorCount] = useState(0);

    const loadMore = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate error every other time
            if (errorCount % 2 === 0) {
                throw new Error('Failed to load items');
            }

            const newItems = generateItems(items.length, 5);
            setItems([...items, ...newItems]);
            setHasMore(items.length < 50);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
            setErrorCount(prev => prev + 1);
        }
    };

    return (
        <InfiniteScroll
            variant="contained"
            useWindow={false}
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoading={isLoading}
            error={error}
            className="w-[400px] h-[400px]"
        >
            <div className="space-y-4 p-4">
                {items.map(item => (
                    <div
                        key={item.id}
                        className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow"
                    >
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">
                            {item.content}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Error handling example
                        </p>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export const WindowScroll: Story = {
    args: {
        children: <WindowScrollExample />,
        onLoadMore: async () => { },
        hasMore: true,
    },
    render: () => <WindowScrollExample />,
};

export const ContainerScroll: Story = {
    args: {
        children: <ContainerScrollExample />,
        onLoadMore: async () => { },
        hasMore: true,
    },
    render: () => <ContainerScrollExample />,
};

export const WithError: Story = {
    args: {
        children: <ErrorExample />,
        onLoadMore: async () => { },
        hasMore: true,
    },
    render: () => <ErrorExample />,
};

export const CustomStyled: Story = {
    args: {
        children: <div>Custom styled content</div>,
        onLoadMore: async () => { },
        hasMore: false,
    },
    render: () => (
        <InfiniteScroll
            variant="contained"
            useWindow={false}
            onLoadMore={async () => { }}
            hasMore={false}
            className="w-[400px] h-[400px] transition-shadow duration-200 hover:shadow-lg"
            sx={{
                backgroundColor: 'rgb(241 245 249)',
                borderRadius: '1rem',
                padding: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div className="space-y-4">
                {generateItems(0, 5).map(item => (
                    <div
                        key={item.id}
                        className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow"
                    >
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">
                            {item.content}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Custom styled example
                        </p>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    ),
}; 