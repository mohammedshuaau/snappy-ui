import React, { useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { GripVertical } from 'lucide-react';
import { renderToString } from 'react-dom/server';

const dragAndDropVariants = cva(
    'relative',
    {
        variants: {
            variant: {
                default: 'bg-white dark:bg-slate-900',
                ghost: 'bg-transparent',
            },
            isDragging: {
                true: 'opacity-50',
                false: 'opacity-100',
            },
            isOver: {
                true: 'border-2 border-dashed border-primary-500 dark:border-primary-400',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            isDragging: false,
            isOver: false,
        },
    }
);

export interface DragItem<T = any> {
    id: string | number;
    type: string;
    data: T;
}

export interface DropResult<T = any> {
    item: DragItem<T>;
    source: {
        index: number;
        droppableId: string;
    };
    destination: {
        index: number;
        droppableId: string;
    } | null;
}

export interface DraggableProps extends VariantProps<typeof dragAndDropVariants> {
    /**
     * Unique identifier for the draggable item
     */
    id: string | number;
    /**
     * Type of the draggable item (used for drop validation)
     */
    type: string;
    /**
     * The data associated with the draggable item
     */
    data: any;
    /**
     * Index of the item in its list
     */
    index: number;
    /**
     * Whether to show drag handle
     */
    showHandle?: boolean;
    /**
     * Whether the item is disabled
     */
    disabled?: boolean;
    /**
     * Custom drag preview element
     */
    dragPreview?: React.ReactNode;
    /**
     * Custom styles
     */
    sx?: React.CSSProperties;
    /**
     * Additional class names
     */
    className?: string;
    /**
     * The content to be rendered
     */
    children: React.ReactNode;
}

export interface DroppableProps extends VariantProps<typeof dragAndDropVariants> {
    /**
     * Unique identifier for the droppable area
     */
    id: string;
    /**
     * Types of items that can be dropped here
     */
    accepts: string[];
    /**
     * Callback when an item is dropped
     */
    onDrop?: (result: DropResult) => void;
    /**
     * Custom styles
     */
    sx?: React.CSSProperties;
    /**
     * Additional class names
     */
    className?: string;
    /**
     * The content to be rendered
     */
    children: React.ReactNode;
}

const Draggable = React.forwardRef<HTMLDivElement, DraggableProps>(
    ({
        id,
        type,
        data,
        index,
        showHandle = false,
        disabled = false,
        dragPreview,
        variant,
        isDragging,
        sx,
        className,
        children,
    }, ref) => {
        // Generate unique class name for custom styles
        const draggableClassName = sx ? `draggable-${Math.random().toString(36).slice(2, 11)}` : '';

        const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
            if (disabled) return;

            const item: DragItem = { id, type, data };
            e.dataTransfer.setData('application/json', JSON.stringify(item));
            e.dataTransfer.effectAllowed = 'move';

            if (dragPreview && e.dataTransfer.setDragImage) {
                const previewElement = document.createElement('div');
                previewElement.innerHTML = React.isValidElement(dragPreview)
                    ? renderToString(dragPreview)
                    : '';
                document.body.appendChild(previewElement);
                e.dataTransfer.setDragImage(previewElement, 0, 0);
                setTimeout(() => document.body.removeChild(previewElement), 0);
            }
        };

        return (
            <div
                ref={ref}
                draggable={!disabled}
                onDragStart={handleDragStart}
                className={twMerge(
                    dragAndDropVariants({ variant, isDragging }),
                    'select-none touch-none',
                    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-move',
                    draggableClassName,
                    className
                )}
                data-index={index}
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled}
            >
                {sx && (
                    <style>
                        {`
                            .${draggableClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div className="flex items-center gap-2">
                    {showHandle && (
                        <div className="flex-shrink-0 p-1 cursor-grab active:cursor-grabbing" data-testid="drag-handle">
                            <GripVertical className="w-4 h-4 text-slate-400" />
                        </div>
                    )}
                    <div className="flex-grow">{children}</div>
                </div>
            </div>
        );
    }
);

const Droppable = React.forwardRef<HTMLDivElement, DroppableProps>(
    ({
        id,
        accepts,
        onDrop,
        variant,
        sx,
        className,
        children,
    }, ref) => {
        // Generate unique class name for custom styles
        const droppableClassName = sx ? `droppable-${Math.random().toString(36).slice(2, 11)}` : '';

        const [isActive, setIsActive] = useState(false);

        const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            setIsActive(true);
        }, []);

        const handleDragLeave = useCallback(() => {
            setIsActive(false);
        }, []);

        const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsActive(false);

            try {
                const item: DragItem = JSON.parse(e.dataTransfer.getData('application/json'));

                if (!accepts.includes(item.type)) return;

                const dropTarget = e.currentTarget;
                const sourceIndex = Number((e.target as HTMLElement).closest('[data-index]')?.getAttribute('data-index') || -1);
                const destinationIndex = Array.from(dropTarget.children).findIndex(child =>
                    child.getBoundingClientRect().top + child.getBoundingClientRect().height / 2 > e.clientY
                );

                onDrop?.({
                    item,
                    source: {
                        index: sourceIndex,
                        droppableId: id,
                    },
                    destination: {
                        index: destinationIndex === -1 ? dropTarget.children.length : destinationIndex,
                        droppableId: id,
                    },
                });
            } catch (error) {
                console.error('Error processing drop:', error);
            }
        }, [accepts, id, onDrop]);

        return (
            <div
                ref={ref}
                className={twMerge(
                    dragAndDropVariants({ variant, isOver: isActive }),
                    'min-h-[100px]',
                    droppableClassName,
                    className
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                data-droppable-id={id}
                role="region"
                aria-label="Drop zone"
            >
                {sx && (
                    <style>
                        {`
                            .${droppableClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                {children}
            </div>
        );
    }
);

Draggable.displayName = 'Draggable';
Droppable.displayName = 'Droppable';

export { Draggable, Droppable }; 