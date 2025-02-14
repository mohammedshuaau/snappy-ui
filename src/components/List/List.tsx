import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const listVariants = cva(
    [
        'w-full',
        'text-base',
        'text-gray-900 dark:text-gray-100',
    ],
    {
        variants: {
            variant: {
                default: '',
                ordered: 'list-decimal',
                unordered: 'list-disc',
                none: 'list-none',
            },
            spacing: {
                compact: 'space-y-1',
                default: 'space-y-2',
                relaxed: 'space-y-4',
            },
            marker: {
                inside: 'list-inside',
                outside: 'list-outside',
            },
        },
        defaultVariants: {
            variant: 'default',
            spacing: 'default',
            marker: 'outside',
        },
    }
);

export interface ListProps
    extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {
    ordered?: boolean;
    nested?: boolean;
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
    ({ className, variant, spacing, marker, ordered = false, nested = false, ...props }, ref) => {
        const Component = ordered ? ('ol' as const) : ('ul' as const);
        const listVariant = variant || (ordered ? 'ordered' : 'unordered');

        return (
            <Component
                ref={ref as any}
                className={twMerge(
                    listVariants({ variant: listVariant, spacing, marker }),
                    nested && 'mt-2',
                    className
                )}
                {...props}
            />
        );
    }
);

List.displayName = 'List';

export { List, listVariants }; 