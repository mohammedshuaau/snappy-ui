import React, { useState, useCallback, useEffect } from 'react';
import { Command } from 'cmdk';
import Fuse from 'fuse.js';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { Search, Command as CommandIcon } from 'lucide-react';

const commandPaletteVariants = cva(
    'fixed inset-0 z-50 bg-black/50 dark:bg-black/70',
    {
        variants: {
            variant: {
                default: '',
                blur: 'backdrop-blur-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const commandDialogVariants = cva(
    'relative w-full max-w-2xl rounded-xl border bg-white shadow-2xl dark:bg-slate-800 dark:border-slate-700',
    {
        variants: {
            size: {
                default: 'h-[440px]',
                sm: 'h-[320px]',
                lg: 'h-[560px]',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
);

export interface CommandItem {
    id: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    shortcut?: string[];
    category?: string;
    action: () => void;
}

export interface CommandPaletteProps extends VariantProps<typeof commandPaletteVariants> {
    /**
     * Array of command items
     */
    items: CommandItem[];
    /**
     * Whether the command palette is open
     */
    open: boolean;
    /**
     * Callback when the command palette should close
     */
    onClose: () => void;
    /**
     * The size of the command palette
     */
    size?: VariantProps<typeof commandDialogVariants>['size'];
    /**
     * Custom styles using the sx prop
     */
    sx?: React.CSSProperties;
    /**
     * Additional class names
     */
    className?: string;
}

const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
    ({
        items,
        open,
        onClose,
        variant,
        size,
        sx,
        className,
    }, ref) => {
        const [search, setSearch] = useState('');
        const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

        // Initialize fuzzy search
        const fuse = new Fuse(items, {
            keys: ['title', 'description', 'category'],
            threshold: 0.3,
        });

        // Filter items based on search and category
        const filteredItems = useCallback(() => {
            let result = search ? fuse.search(search).map(r => r.item) : items;
            if (selectedCategory) {
                result = result.filter(item => item.category === selectedCategory);
            }
            return result;
        }, [search, selectedCategory, items, fuse]);

        // Get unique categories
        const categories = Array.from(new Set(items.map(item => item.category).filter(Boolean)));

        // Handle keyboard shortcuts
        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.metaKey && e.key === 'k') {
                    e.preventDefault();
                    if (open) onClose();
                    else open = true;
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }, [open, onClose]);

        if (!open) return null;

        // Generate unique class name for custom styles
        const commandClassName = sx ? `command-${Math.random().toString(36).slice(2, 11)}` : '';

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${commandClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    data-testid="command-palette-overlay"
                    className={twMerge(
                        commandPaletteVariants({ variant }),
                        commandClassName,
                        className
                    )}
                    onClick={onClose}
                >
                    <div
                        className="fixed inset-x-0 top-[20%] mx-auto p-4"
                        onClick={e => e.stopPropagation()}
                    >
                        <Command
                            role="dialog"
                            className={twMerge(
                                commandDialogVariants({ size }),
                                'overflow-hidden'
                            )}
                        >
                            <div className="flex items-center border-b px-3 dark:border-slate-700">
                                <Search className="h-5 w-5 text-slate-500" />
                                <Command.Input
                                    value={search}
                                    onValueChange={setSearch}
                                    className="flex-1 border-0 bg-transparent px-2 py-4 text-sm outline-none placeholder:text-slate-500 dark:text-white"
                                    placeholder="Type a command or search..."
                                />
                                <div className="flex items-center gap-2">
                                    <kbd className="rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-700 dark:text-slate-400">
                                        ⌘K
                                    </kbd>
                                </div>
                            </div>
                            <Command.List className="scrollbar-none max-h-[calc(100%-65px)] overflow-y-auto p-2">
                                {categories.length > 0 && (
                                    <Command.Group heading="Categories" className="text-sm text-slate-500 dark:text-slate-400">
                                        {categories.map(category => (
                                            category && (
                                                <Command.Item
                                                    key={category}
                                                    value={category}
                                                    onSelect={() => setSelectedCategory(
                                                        category === selectedCategory ? null : category
                                                    )}
                                                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-slate-100 aria-selected:bg-slate-100 dark:text-white dark:hover:bg-slate-700 dark:aria-selected:bg-slate-700"
                                                >
                                                    <CommandIcon className="h-4 w-4" />
                                                    {category}
                                                </Command.Item>
                                            )
                                        ))}
                                    </Command.Group>
                                )}
                                <Command.Group heading="Commands" className="text-sm text-slate-500 dark:text-slate-400">
                                    {filteredItems().map(item => (
                                        <Command.Item
                                            key={item.id}
                                            value={item.title}
                                            onSelect={item.action}
                                            className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-slate-100 aria-selected:bg-slate-100 dark:text-white dark:hover:bg-slate-700 dark:aria-selected:bg-slate-700"
                                        >
                                            <div className="flex items-center gap-2">
                                                {item.icon}
                                                <div>
                                                    <div>{item.title}</div>
                                                    {item.description && (
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {item.shortcut && (
                                                <div className="flex items-center gap-1">
                                                    {item.shortcut.map((key, index) => (
                                                        <React.Fragment key={index}>
                                                            <kbd className="rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-700 dark:text-slate-400">
                                                                {key}
                                                            </kbd>
                                                            {index < item.shortcut!.length - 1 && '+'}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            )}
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            </Command.List>
                        </Command>
                    </div>
                </div>
            </>
        );
    }
);

CommandPalette.displayName = 'CommandPalette';

export default CommandPalette; 