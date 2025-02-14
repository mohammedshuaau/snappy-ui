import React, {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import KanbanBoard, {KanbanCard, KanbanColumn} from './KanbanBoard';

const meta = {
    title: 'Advanced/KanbanBoard',
    component: KanbanBoard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A feature-rich Kanban board component with drag-and-drop support, column management, and card interactions.

Features:
- Smooth drag and drop functionality
- Column and card management
- Card details with labels and assignees
- Dark mode support
- Multiple style variants
- Card menu actions
- Responsive design

\`\`\`jsx
import { KanbanBoard } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <KanbanBoard
      columns={[
        {
          id: '1',
          title: 'To Do',
          color: '#3b82f6',
          cards: [
            {
              id: '1',
              title: 'Task 1',
              description: 'Complete this task',
              labels: ['Priority'],
              assignee: { name: 'John Doe' }
            }
          ]
        }
      ]}
      onCardMove={(cardId, sourceId, targetId, newIndex) => {
        console.log('Card moved:', { cardId, sourceId, targetId, newIndex });
      }}
      onCardMenuOpen={(card) => {
        console.log('Card menu opened:', card);
      }}
    />
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
            options: ['default', 'compact', 'minimal'],
        },
        showAddColumn: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof KanbanBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleColumns: KanbanColumn[] = [
    {
        id: '1',
        title: 'To Do',
        color: '#3b82f6',
        cards: [
            {
                id: '1',
                title: 'Research competitors',
                description: 'Analyze top 5 competitors in the market',
                labels: ['Research', 'Priority'],
                assignee: {
                    name: 'John Doe',
                    avatar: 'https://i.pravatar.cc/150?u=john',
                },
                dueDate: new Date('2024-03-20'),
            },
            {
                id: '2',
                title: 'Design mockups',
                description: 'Create initial design mockups for the dashboard',
                labels: ['Design'],
                assignee: {
                    name: 'Jane Smith',
                    avatar: 'https://i.pravatar.cc/150?u=jane',
                },
            },
        ],
    },
    {
        id: '2',
        title: 'In Progress',
        color: '#f59e0b',
        cards: [
            {
                id: '3',
                title: 'Implement authentication',
                description: 'Set up user authentication and authorization',
                labels: ['Development', 'Security'],
                assignee: {
                    name: 'Mike Johnson',
                    avatar: 'https://i.pravatar.cc/150?u=mike',
                },
                dueDate: new Date('2024-03-15'),
            },
        ],
    },
    {
        id: '3',
        title: 'Review',
        color: '#8b5cf6',
        cards: [
            {
                id: '4',
                title: 'Code review',
                description: 'Review pull request #123',
                labels: ['Development'],
                assignee: {
                    name: 'Sarah Wilson',
                    avatar: 'https://i.pravatar.cc/150?u=sarah',
                },
            },
        ],
    },
    {
        id: '4',
        title: 'Done',
        color: '#10b981',
        cards: [
            {
                id: '5',
                title: 'Project setup',
                description: 'Initial project setup and configuration',
                labels: ['Development', 'Completed'],
                assignee: {
                    name: 'John Doe',
                    avatar: 'https://i.pravatar.cc/150?u=john',
                },
            },
        ],
    },
];

export const Default: Story = {
    args: {
        columns: sampleColumns,
    },
};

export const Interactive: Story = {
    args: {
        columns: sampleColumns,
    },
    render: (args) => {
        const [columns, setColumns] = useState<KanbanColumn[]>(args.columns);
        const [lastAction, setLastAction] = useState<string>('');
        const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);

        const handleCardMove = (cardId: string, sourceId: string, targetId: string, newIndex: number) => {
            setColumns((prevColumns) => {
                const newColumns = [...prevColumns];
                const sourceColumn = newColumns.find((col) => col.id === sourceId);
                const targetColumn = newColumns.find((col) => col.id === targetId);

                if (sourceColumn && targetColumn) {
                    const cardIndex = sourceColumn.cards.findIndex((card) => card.id === cardId);
                    const [card] = sourceColumn.cards.splice(cardIndex, 1);
                    targetColumn.cards.splice(newIndex, 0, card);
                }

                setLastAction(`Moved card ${cardId} from ${sourceId} to ${targetId}`);
                return newColumns;
            });
        };

        const handleColumnAdd = (title: string) => {
            setColumns((prevColumns) => [
                ...prevColumns,
                {
                    id: Date.now().toString(),
                    title,
                    cards: [],
                },
            ]);
            setLastAction(`Added column: ${title}`);
        };

        const handleColumnRemove = (columnId: string) => {
            setColumns((prevColumns) => prevColumns.filter((col) => col.id !== columnId));
            setLastAction(`Removed column ${columnId}`);
        };

        const handleCardAdd = (columnId: string, card: Omit<KanbanCard, 'id'>) => {
            setColumns((prevColumns) => {
                const newColumns = [...prevColumns];
                const column = newColumns.find((col) => col.id === columnId);
                if (column) {
                    column.cards.push({
                        ...card,
                        id: Date.now().toString(),
                    });
                }
                return newColumns;
            });
            setLastAction(`Added card to column ${columnId}`);
        };

        const handleCardRemove = (cardId: string, columnId: string) => {
            setColumns((prevColumns) => {
                const newColumns = [...prevColumns];
                const column = newColumns.find((col) => col.id === columnId);
                if (column) {
                    column.cards = column.cards.filter((card) => card.id !== cardId);
                }
                return newColumns;
            });
            setLastAction(`Removed card ${cardId} from column ${columnId}`);
        };

        const handleCardDragStart = (cardId: string, columnId: string) => {
            setLastAction(`Started dragging card ${cardId} from column ${columnId}`);
        };

        const handleCardDragEnd = (cardId: string, success: boolean) => {
            setLastAction(`Finished dragging card ${cardId} (${success ? 'dropped' : 'cancelled'})`);
        };

        const handleCardMenuOpen = (card: KanbanCard) => {
            setSelectedCard(card);
            setLastAction(`Opened menu for card: ${card.title}`);
        };

        return (
            <div className="space-y-4">
                <KanbanBoard
                    {...args}
                    columns={columns}
                    onCardMove={handleCardMove}
                    onColumnAdd={handleColumnAdd}
                    onColumnRemove={handleColumnRemove}
                    onCardAdd={handleCardAdd}
                    onCardRemove={handleCardRemove}
                    onCardClick={(card) => setLastAction(`Clicked card: ${card.title}`)}
                    onCardDragStart={handleCardDragStart}
                    onCardDragEnd={handleCardDragEnd}
                    onCardMenuOpen={handleCardMenuOpen}
                />
                {lastAction && (
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">Last Action:</h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{lastAction}</p>
                    </div>
                )}
                {selectedCard && (
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-slate-900 dark:text-slate-100">Card Menu</h3>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{selectedCard.title}</p>
                            </div>
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
                            >
                                Close
                            </button>
                        </div>
                        <div className="mt-4 space-y-2">
                            <button
                                onClick={() => {
                                    const columnId = columns.find(col =>
                                        col.cards.some(card => card.id === selectedCard.id)
                                    )?.id;
                                    if (columnId) {
                                        handleCardRemove(selectedCard.id, columnId);
                                        setSelectedCard(null);
                                    }
                                }}
                                className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md"
                            >
                                Delete Card
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    },
};

export const Variants: Story = {
    args: {
        columns: sampleColumns.slice(0, 2),
    },
    render: (args) => (
        <div className="grid grid-cols-1 gap-8">
            <KanbanBoard {...args} variant="default" />
            <KanbanBoard {...args} variant="compact" />
            <KanbanBoard {...args} variant="minimal" />
        </div>
    ),
};

export const WithoutAddColumn: Story = {
    args: {
        columns: sampleColumns,
        showAddColumn: false,
    },
};

export const CustomStyled: Story = {
    args: {
        columns: sampleColumns,
        sx: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'box-shadow 0.2s ease-in-out',
            '&:hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
        } as React.CSSProperties,
    },
}; 