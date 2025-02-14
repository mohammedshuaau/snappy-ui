import React, { useState, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { MoreVertical, Plus, X } from 'lucide-react';

const kanbanBoardVariants = cva(
    'w-full overflow-x-auto',
    {
        variants: {
            variant: {
                default: 'bg-white dark:bg-slate-900',
                compact: 'bg-white dark:bg-slate-900 p-2',
                minimal: 'bg-transparent',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface KanbanCard {
    id: string;
    title: string;
    description?: string;
    labels?: string[];
    dueDate?: Date;
    assignee?: {
        name: string;
        avatar?: string;
    };
}

export interface KanbanColumn {
    id: string;
    title: string;
    cards: KanbanCard[];
    color?: string;
}

export interface KanbanBoardProps extends VariantProps<typeof kanbanBoardVariants> {
    /**
     * Array of columns in the board
     */
    columns: KanbanColumn[];
    /**
     * Callback when a card is moved
     */
    onCardMove?: (cardId: string, sourceColumnId: string, targetColumnId: string, newIndex: number) => void;
    /**
     * Callback when a column is added
     */
    onColumnAdd?: (title: string) => void;
    /**
     * Callback when a column is removed
     */
    onColumnRemove?: (columnId: string) => void;
    /**
     * Callback when a card is added
     */
    onCardAdd?: (columnId: string, card: Omit<KanbanCard, 'id'>) => void;
    /**
     * Callback when a card is removed
     */
    onCardRemove?: (cardId: string, columnId: string) => void;
    /**
     * Callback when a card is clicked
     */
    onCardClick?: (card: KanbanCard) => void;
    /**
     * Callback when card drag starts
     */
    onCardDragStart?: (cardId: string, columnId: string) => void;
    /**
     * Callback when card drag ends
     */
    onCardDragEnd?: (cardId: string, success: boolean) => void;
    /**
     * Callback when card menu is opened
     */
    onCardMenuOpen?: (card: KanbanCard) => void;
    /**
     * Whether to show add column button
     */
    showAddColumn?: boolean;
    /**
     * Custom styles
     */
    sx?: React.CSSProperties;
    /**
     * Additional class names
     */
    className?: string;
}

const KanbanBoard = React.forwardRef<HTMLDivElement, KanbanBoardProps>(
    ({
        columns,
        onCardMove,
        onColumnAdd,
        onColumnRemove,
        onCardAdd,
        onCardClick,
        onCardDragStart,
        onCardDragEnd,
        onCardMenuOpen,
        showAddColumn = true,
        variant,
        sx,
        className,
    }, ref) => {
        // Generate unique class name for custom styles
        const boardClassName = sx ? `kanban-board-${Math.random().toString(36).slice(2, 11)}` : '';

        // State for drag and drop
        const [draggedCard, setDraggedCard] = useState<{ cardId: string; columnId: string } | null>(null);
        const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
        const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

        // Ref for tracking drag success
        const dragSuccessRef = useRef(false);

        const handleDragStart = (cardId: string, columnId: string) => {
            setDraggedCard({ cardId, columnId });
            onCardDragStart?.(cardId, columnId);
            dragSuccessRef.current = false;
        };

        const handleDragOver = (e: React.DragEvent, columnId: string, index: number) => {
            e.preventDefault();
            setDragOverColumn(columnId);
            setDragOverIndex(index);
        };

        const handleDragEnd = () => {
            if (!draggedCard) return;

            // Reset drag state
            onCardDragEnd?.(draggedCard.cardId, dragSuccessRef.current);
            setDraggedCard(null);
            setDragOverColumn(null);
            setDragOverIndex(null);
        };

        const handleDrop = (targetColumnId: string, index: number) => {
            if (draggedCard && onCardMove) {
                onCardMove(draggedCard.cardId, draggedCard.columnId, targetColumnId, index);
                dragSuccessRef.current = true;
            }
        };

        const handleAddColumn = () => {
            const title = window.prompt('Enter column title:');
            if (title && onColumnAdd) {
                onColumnAdd(title);
            }
        };

        const handleAddCard = (columnId: string) => {
            const title = window.prompt('Enter card title:');
            if (title && onCardAdd) {
                onCardAdd(columnId, {
                    title,
                    description: '',
                    labels: [],
                });
            }
        };

        const handleCardMenuClick = (e: React.MouseEvent, card: KanbanCard) => {
            e.stopPropagation();
            onCardMenuOpen?.(card);
        };

        return (
            <div
                ref={ref}
                className={twMerge(
                    kanbanBoardVariants({ variant }),
                    boardClassName,
                    className
                )}
                data-testid="kanban-board"
            >
                {sx && (
                    <style>
                        {`
                            .${boardClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div className="flex gap-4 p-4 min-h-[24rem]">
                    {columns.map((column) => (
                        <div
                            key={column.id}
                            className={twMerge(
                                'flex flex-col w-80 rounded-lg bg-slate-50 dark:bg-slate-800/50',
                                dragOverColumn === column.id && 'ring-2 ring-primary-500'
                            )}
                            data-testid="kanban-column"
                            onDragOver={(e) => handleDragOver(e, column.id, column.cards.length)}
                            onDrop={() => handleDrop(column.id, column.cards.length)}
                        >
                            <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700">
                                <h3 className="font-medium text-slate-900 dark:text-slate-100">
                                    {column.title}
                                </h3>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => handleAddCard(column.id)}
                                        className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                        aria-label="Add card"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                    {onColumnRemove && (
                                        <button
                                            type="button"
                                            onClick={() => onColumnRemove(column.id)}
                                            className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                            aria-label="Remove column"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                                {column.cards.map((card, index) => (
                                    <div
                                        key={card.id}
                                        draggable
                                        className={twMerge(
                                            'kanban-card p-3 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 cursor-move',
                                            'hover:shadow-md transition-all duration-200',
                                            draggedCard?.cardId === card.id && 'opacity-50',
                                            dragOverColumn === column.id && dragOverIndex === index && 'border-primary-500 border-2'
                                        )}
                                        onClick={() => onCardClick?.(card)}
                                        onDragStart={() => handleDragStart(card.id, column.id)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => handleDragOver(e, column.id, index)}
                                        onDrop={() => handleDrop(column.id, index)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                {card.title}
                                            </h4>
                                            <button
                                                type="button"
                                                onClick={(e) => handleCardMenuClick(e, card)}
                                                className="p-1 -mt-1 -mr-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                                aria-label="Card menu"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {card.description && (
                                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                                {card.description}
                                            </p>
                                        )}
                                        {card.labels && card.labels.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {card.labels.map((label) => (
                                                    <span
                                                        key={label}
                                                        className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400"
                                                    >
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {card.assignee && (
                                            <div className="flex items-center mt-2 text-sm text-slate-600 dark:text-slate-400">
                                                {card.assignee.avatar ? (
                                                    <img
                                                        src={card.assignee.avatar}
                                                        alt={card.assignee.name}
                                                        className="w-5 h-5 rounded-full mr-1"
                                                    />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 mr-1" />
                                                )}
                                                {card.assignee.name}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {showAddColumn && (
                        <button
                            type="button"
                            onClick={handleAddColumn}
                            className="flex items-center justify-center w-80 h-12 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                        >
                            <Plus className="w-5 h-5 mr-1" />
                            Add Column
                        </button>
                    )}
                </div>
            </div>
        );
    }
);

KanbanBoard.displayName = 'KanbanBoard';

export default KanbanBoard; 