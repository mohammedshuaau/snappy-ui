import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Draggable, Droppable } from './DragAndDrop';

const meta = {
    title: 'Advanced/DragAndDrop',
    component: Draggable,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'ghost'],
        },
        showHandle: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Draggable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample items
interface TodoItem {
    id: number;
    title: string;
    status: 'todo' | 'doing' | 'done';
}

const initialItems: TodoItem[] = [
    { id: 1, title: 'Learn React', status: 'todo' },
    { id: 2, title: 'Build a project', status: 'todo' },
    { id: 3, title: 'Write documentation', status: 'todo' },
    { id: 4, title: 'Share with others', status: 'todo' },
];

// Basic item renderer
const TodoCard = ({ item }: { item: TodoItem }) => (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
        <h3 className="font-medium text-slate-900 dark:text-slate-100">{item.title}</h3>
    </div>
);

// Single list example
const SingleListExample = () => {
    const [items, setItems] = useState(initialItems);

    const handleDrop = (result: any) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);

        setItems(newItems);
    };

    return (
        <Droppable
            id="single-list"
            accepts={['todo-item']}
            onDrop={handleDrop}
            className="space-y-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg"
        >
            {items.map((item, index) => (
                <Draggable
                    key={item.id}
                    id={item.id}
                    type="todo-item"
                    data={item}
                    index={index}
                    showHandle
                >
                    <TodoCard item={item} />
                </Draggable>
            ))}
        </Droppable>
    );
};

// Multiple lists example
const MultipleListsExample = () => {
    const [lists, setLists] = useState({
        todo: initialItems.filter(item => item.status === 'todo'),
        doing: initialItems.filter(item => item.status === 'doing'),
        done: initialItems.filter(item => item.status === 'done'),
    });

    const handleDrop = (result: any) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceList = source.droppableId as keyof typeof lists;
        const destList = destination.droppableId as keyof typeof lists;

        const newLists = { ...lists };
        const [removed] = newLists[sourceList].splice(source.index, 1);
        removed.status = destList;
        newLists[destList].splice(destination.index, 0, removed);

        setLists(newLists);
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            {(['todo', 'doing', 'done'] as const).map(status => (
                <Droppable
                    key={status}
                    id={status}
                    accepts={['todo-item']}
                    onDrop={handleDrop}
                    className="space-y-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg"
                >
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 capitalize">
                        {status}
                    </h2>
                    {lists[status].map((item, index) => (
                        <Draggable
                            key={item.id}
                            id={item.id}
                            type="todo-item"
                            data={item}
                            index={index}
                            showHandle
                        >
                            <TodoCard item={item} />
                        </Draggable>
                    ))}
                </Droppable>
            ))}
        </div>
    );
};

export const SingleList: Story = {
    render: () => <SingleListExample />,
    args: {
        id: 'example',
        type: 'todo-item',
        data: {},
        index: 0,
        children: <div>Draggable Item</div>
    }
};

export const MultipleLists: Story = {
    render: () => <MultipleListsExample />,
    args: {
        id: 'example',
        type: 'todo-item',
        data: {},
        index: 0,
        children: <div>Draggable Item</div>
    }
};

export const WithDragHandle: Story = {
    args: {
        id: 1,
        type: 'example',
        data: { title: 'Draggable Item' },
        index: 0,
        showHandle: true,
        children: (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Draggable Item</h3>
            </div>
        ),
    },
};

export const Disabled: Story = {
    args: {
        id: 1,
        type: 'example',
        data: { title: 'Disabled Item' },
        index: 0,
        disabled: true,
        children: (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Disabled Item</h3>
            </div>
        ),
    },
};

export const WithCustomPreview: Story = {
    args: {
        id: 1,
        type: 'example',
        data: { title: 'Custom Preview' },
        index: 0,
        dragPreview: (
            <div className="p-2 bg-primary-500 text-white rounded">
                Moving item...
            </div>
        ),
        children: (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Try dragging me!</h3>
            </div>
        ),
    },
};

export const CustomStyled: Story = {
    args: {
        id: 1,
        type: 'example',
        data: { title: 'Styled Item' },
        index: 0,
        sx: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '0.5rem',
        },
        className: 'hover:shadow-lg transition-shadow duration-200',
        children: (
            <div className="p-4">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Styled Item</h3>
            </div>
        ),
    },
}; 