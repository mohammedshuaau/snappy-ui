import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type CSSPropertiesWithPseudos = {
    [key: string]: any;
};

export interface TreeItem {
    id: string;
    label: string;
    children?: TreeItem[];
    icon?: React.ReactNode;
}

export interface TreeProps {
    items: TreeItem[];
    onSelect?: (item: TreeItem) => void;
    className?: string;
    defaultExpandedIds?: string[];
    renderItem?: (item: TreeItem) => React.ReactNode;
    expandOnItemClick?: boolean;
    sx?: CSSPropertiesWithPseudos;
}

const treeItemVariants = cva(
    'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors text-gray-900 dark:text-gray-100',
    {
        variants: {
            isSelected: {
                true: 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100',
                false: 'hover:bg-gray-100 dark:hover:bg-gray-800',
            },
        },
        defaultVariants: {
            isSelected: false,
        },
    }
);

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={twMerge('transition-transform', isExpanded ? 'rotate-90' : '')}
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const TreeItemComponent = ({
    item,
    level = 0,
    onSelect,
    selectedId,
    setSelectedId,
    expandedIds,
    setExpandedIds,
    renderItem,
    expandOnItemClick,
}: {
    item: TreeItem;
    level?: number;
    onSelect?: (item: TreeItem) => void;
    selectedId: string | null;
    setSelectedId: (id: string) => void;
    expandedIds: Set<string>;
    setExpandedIds: (ids: Set<string>) => void;
    renderItem?: (item: TreeItem) => React.ReactNode;
    expandOnItemClick?: boolean;
}) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedIds.has(item.id);

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newExpandedIds = new Set(expandedIds);
        if (isExpanded) {
            newExpandedIds.delete(item.id);
        } else {
            newExpandedIds.add(item.id);
        }
        setExpandedIds(newExpandedIds);
    };

    const handleSelect = () => {
        setSelectedId(item.id);
        onSelect?.(item);
        if (expandOnItemClick && hasChildren) {
            const newExpandedIds = new Set(expandedIds);
            if (isExpanded) {
                newExpandedIds.delete(item.id);
            } else {
                newExpandedIds.add(item.id);
            }
            setExpandedIds(newExpandedIds);
        }
    };

    return (
        <div>
            <div
                className={twMerge(
                    treeItemVariants({ isSelected: selectedId === item.id }),
                    'transition-transform',
                    level > 0 && `ml-${level * 4}`
                )}
                onClick={handleSelect}
                role="treeitem"
                aria-expanded={hasChildren ? isExpanded : undefined}
                aria-selected={selectedId === item.id}
                style={{ marginLeft: `${level * 1.25}rem` }}
            >
                {hasChildren && !expandOnItemClick && (
                    <span onClick={toggleExpand} className="cursor-pointer">
                        <ChevronIcon isExpanded={isExpanded} />
                    </span>
                )}
                {hasChildren && expandOnItemClick && (
                    <span className="cursor-pointer">
                        <ChevronIcon isExpanded={isExpanded} />
                    </span>
                )}
                {!hasChildren && <span className="w-4" />}
                {item.icon && <span className="text-gray-500 dark:text-gray-400">{item.icon}</span>}
                {renderItem ? renderItem(item) : <span>{item.label}</span>}
            </div>
            {hasChildren && isExpanded && (
                <div role="group">
                    {item.children?.map((child) => (
                        <TreeItemComponent
                            key={child.id}
                            item={child}
                            level={level + 1}
                            onSelect={onSelect}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            expandedIds={expandedIds}
                            setExpandedIds={setExpandedIds}
                            renderItem={renderItem}
                            expandOnItemClick={expandOnItemClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const Tree = ({
    items,
    onSelect,
    className,
    defaultExpandedIds = [],
    renderItem,
    expandOnItemClick = false,
    sx,
}: TreeProps) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(
        new Set(defaultExpandedIds)
    );

    const treeClassName = sx ? `tree-${Math.random().toString(36).slice(2, 11)}` : '';

    return (
        <>
            {sx && (
                <style>
                    {`
                        .${treeClassName} {
                            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            ${Object.entries(sx)
                            .filter(([key]) => !key.startsWith('&') && !key.startsWith('@media'))
                            .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                            .join('\n')}
                        }
                        ${Object.entries(sx)
                            .filter(([key]) => key.startsWith('&') || key.startsWith('@media'))
                            .map(([key, value]) => `
                                ${key.startsWith('@media') ? key : `.${treeClassName}${key.slice(1)}`} {
                                    ${Object.entries(value as object)
                                    .map(([k, v]) => `${k.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${v};`)
                                    .join('\n')}
                                }
                            `)
                            .join('\n')}
                    `}
                </style>
            )}
            <div
                className={twMerge('w-full', treeClassName, className)}
                role="tree"
                aria-label="Tree navigation"
            >
                {items.map((item) => (
                    <TreeItemComponent
                        key={item.id}
                        item={item}
                        onSelect={onSelect}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        expandedIds={expandedIds}
                        setExpandedIds={setExpandedIds}
                        renderItem={renderItem}
                        expandOnItemClick={expandOnItemClick}
                    />
                ))}
            </div>
        </>
    );
}; 