import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { GripVertical, GripHorizontal } from 'lucide-react';

const resizablePanelVariants = cva(
    'relative overflow-hidden group',
    {
        variants: {
            variant: {
                default: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
                ghost: 'bg-transparent',
            },
            direction: {
                horizontal: 'flex',
                vertical: 'flex flex-col',
            },
        },
        defaultVariants: {
            variant: 'default',
            direction: 'horizontal',
        },
    }
);

const handleVariants = cva(
    'absolute flex items-center justify-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-700',
    {
        variants: {
            direction: {
                horizontal: [
                    'w-1.5 h-full right-0 top-0',
                    'cursor-col-resize hover:cursor-col-resize active:cursor-col-resize',
                    'hover:shadow-[2px_0_0_0_rgba(0,0,0,0.1)] dark:hover:shadow-[2px_0_0_0_rgba(255,255,255,0.1)]',
                ].join(' '),
                vertical: [
                    'h-1.5 w-full bottom-0 left-0',
                    'cursor-row-resize hover:cursor-row-resize active:cursor-row-resize',
                    'hover:shadow-[0_2px_0_0_rgba(0,0,0,0.1)] dark:hover:shadow-[0_2px_0_0_rgba(255,255,255,0.1)]',
                ].join(' '),
            },
            variant: {
                default: 'bg-slate-200 dark:bg-slate-700',
                ghost: 'bg-transparent',
            },
        },
        defaultVariants: {
            direction: 'horizontal',
            variant: 'default',
        },
    }
);

export interface ResizablePanelProps extends VariantProps<typeof resizablePanelVariants> {
    /**
     * The content to render in the panel
     */
    children: React.ReactNode;
    /**
     * Initial size of the panel (width for horizontal, height for vertical)
     */
    initialSize?: number;
    /**
     * Minimum size of the panel
     */
    minSize?: number;
    /**
     * Maximum size of the panel
     */
    maxSize?: number;
    /**
     * Whether the panel is collapsible
     */
    collapsible?: boolean;
    /**
     * Whether to show the resize handle
     */
    showHandle?: boolean;
    /**
     * Callback when size changes
     */
    onResize?: (size: number) => void;
    /**
     * Custom styles
     */
    sx?: React.CSSProperties;
    /**
     * Additional class names
     */
    className?: string;
}

const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
    ({
        children,
        initialSize = 200,
        minSize = 100,
        maxSize = 500,
        collapsible = false,
        showHandle = true,
        variant,
        direction = 'horizontal',
        onResize,
        sx,
        className,
    }, ref) => {
        const [size, setSize] = useState(initialSize);
        const [isResizing, setIsResizing] = useState(false);
        const [isCollapsed, setIsCollapsed] = useState(false);
        const panelRef = useRef<HTMLDivElement>(null);
        const startPosRef = useRef(0);
        const startSizeRef = useRef(0);

        // Generate unique class name for custom styles
        const panelClassName = sx ? `resizable-panel-${Math.random().toString(36).slice(2, 11)}` : '';

        useEffect(() => {
            const handleMouseMove = (e: MouseEvent) => {
                if (!isResizing) return;

                const delta = direction === 'horizontal'
                    ? e.clientX - startPosRef.current
                    : e.clientY - startPosRef.current;

                const newSize = Math.max(minSize, Math.min(maxSize, startSizeRef.current + delta));
                setSize(newSize);
                onResize?.(newSize);
            };

            const handleMouseUp = () => {
                setIsResizing(false);
            };

            if (isResizing) {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }, [isResizing, direction, minSize, maxSize, onResize]);

        const handleMouseDown = (e: React.MouseEvent) => {
            e.preventDefault();
            setIsResizing(true);
            startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY;
            startSizeRef.current = size;
        };

        const handleDoubleClick = () => {
            if (collapsible) {
                setIsCollapsed(!isCollapsed);
                setSize(isCollapsed ? initialSize : minSize);
                onResize?.(isCollapsed ? initialSize : minSize);
            }
        };

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${panelClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    className={twMerge(
                        resizablePanelVariants({ variant, direction }),
                        panelClassName,
                        className
                    )}
                    style={{
                        ...(direction === 'horizontal' ? { width: size } : { height: size }),
                    }}
                >
                    <div ref={panelRef} className="h-full w-full">
                        {children}
                    </div>
                    {showHandle && (
                        <div
                            className={handleVariants({ direction, variant })}
                            onMouseDown={handleMouseDown}
                            onDoubleClick={handleDoubleClick}
                            role="separator"
                            aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
                            aria-valuenow={size}
                            aria-valuemin={minSize}
                            aria-valuemax={maxSize}
                        >
                            {direction === 'horizontal' ? (
                                <GripVertical className="w-4 h-4 opacity-0 group-hover:opacity-50 dark:group-hover:opacity-70 transition-opacity" />
                            ) : (
                                <GripHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-50 dark:group-hover:opacity-70 transition-opacity" />
                            )}
                        </div>
                    )}
                </div>
            </>
        );
    }
);

ResizablePanel.displayName = 'ResizablePanel';

export default ResizablePanel; 