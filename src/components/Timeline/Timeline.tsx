import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export interface TimelineItem {
    id: string;
    title: string;
    description?: string;
    date?: string;
    icon?: React.ReactNode;
    status?: 'completed' | 'current' | 'upcoming';
}

type CSSPropertiesWithPseudos = {
    [key: string]: any;
};

export interface TimelineProps {
    items: TimelineItem[];
    variant?: 'default' | 'alternate';
    className?: string;
    renderItem?: (item: TimelineItem) => React.ReactNode;
    sx?: CSSPropertiesWithPseudos;
}

const timelineItemVariants = cva(
    'relative flex gap-4 pb-8 last:pb-0',
    {
        variants: {
            variant: {
                default: '',
                alternate: 'even:flex-row-reverse',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const timelineDotVariants = cva(
    'relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white dark:bg-gray-900',
    {
        variants: {
            status: {
                completed: 'border-success-500 text-success-500 dark:border-success-400 dark:text-success-400',
                current: 'border-primary-500 text-primary-500 dark:border-primary-400 dark:text-primary-400',
                upcoming: 'border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-600',
            },
        },
        defaultVariants: {
            status: 'upcoming',
        },
    }
);

const DefaultDotIcon = ({ status }: { status?: TimelineItem['status'] }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {status === 'completed' ? (
            <polyline points="20 6 9 17 4 12" />
        ) : status === 'current' ? (
            <circle cx="12" cy="12" r="10" />
        ) : (
            <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
        )}
    </svg>
);

const TimelineItemComponent = ({
    item,
    variant = 'default',
    renderItem,
}: {
    item: TimelineItem;
    variant?: TimelineProps['variant'];
    renderItem?: TimelineProps['renderItem'];
}) => {
    if (renderItem) {
        return renderItem(item);
    }

    return (
        <div className={timelineItemVariants({ variant })} role="listitem">
            <div className={twMerge(
                'flex-none',
                variant === 'alternate' && 'absolute left-1/2 -translate-x-1/2'
            )}>
                <div
                    className={timelineDotVariants({ status: item.status })}
                    data-testid={`timeline-dot-${item.id}`}
                >
                    {item.icon || <DefaultDotIcon status={item.status} />}
                </div>
            </div>
            <div className={twMerge(
                'flex-1',
                variant === 'alternate' && 'w-[calc(50%-3rem)]'
            )}>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                </h3>
                {item.date && (
                    <p className="text-sm text-gray-500 dark:text-gray-400" role="time">
                        {item.date}
                    </p>
                )}
                {item.description && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300" data-testid="description">
                        {item.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export const Timeline = ({
    items,
    variant = 'default',
    className,
    renderItem,
    sx,
}: TimelineProps) => {
    const timelineClassName = sx ? `timeline-${Math.random().toString(36).slice(2, 11)}` : '';

    return (
        <>
            {sx && (
                <style>
                    {`
                        .${timelineClassName} {
                            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            ${Object.entries(sx)
                            .filter(([key]) => !key.startsWith('&') && !key.startsWith('@media'))
                            .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                            .join('\n')}
                        }
                        ${Object.entries(sx)
                            .filter(([key]) => key.startsWith('&') || key.startsWith('@media'))
                            .map(([key, value]) => `
                                ${key.startsWith('@media') ? key : `.${timelineClassName}${key.slice(1)}`} {
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
                className={twMerge('relative', timelineClassName, className)}
                role="list"
                aria-label="Timeline"
            >
                {items.map((item) => (
                    <TimelineItemComponent
                        key={item.id}
                        item={item}
                        variant={variant}
                        renderItem={renderItem}
                    />
                ))}
            </div>
        </>
    );
}; 