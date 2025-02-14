import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import * as PopoverPrimitive from '@radix-ui/react-popover';

const popoverContentVariants = cva(
    [
        'z-50',
        'w-72',
        'rounded-md',
        'bg-white',
        'p-4',
        'shadow-md',
        'outline-none',
        'text-gray-900',
        'dark:bg-gray-800',
        'dark:text-gray-100',
        'data-[state=open]:animate-in',
        'data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0',
        'data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95',
        'data-[state=open]:zoom-in-95',
        'border',
        'border-gray-200',
        'dark:border-gray-700',
    ],
    {
        variants: {
            side: {
                top: [
                    'data-[side=top]:slide-in-from-bottom-2',
                    'data-[side=top]:slide-out-to-bottom-2',
                ],
                right: [
                    'data-[side=right]:slide-in-from-left-2',
                    'data-[side=right]:slide-out-to-left-2',
                ],
                bottom: [
                    'data-[side=bottom]:slide-in-from-top-2',
                    'data-[side=bottom]:slide-out-to-top-2',
                ],
                left: [
                    'data-[side=left]:slide-in-from-right-2',
                    'data-[side=left]:slide-out-to-right-2',
                ],
            },
        },
        defaultVariants: {
            side: 'bottom',
        },
    }
);

export interface PopoverProps extends PopoverPrimitive.PopoverProps { }

export interface PopoverTriggerProps extends PopoverPrimitive.PopoverTriggerProps { }

export interface PopoverContentProps
    extends Omit<PopoverPrimitive.PopoverContentProps, 'side'>,
    VariantProps<typeof popoverContentVariants> {
    /**
     * Custom styles
     */
    sx?: { [key: string]: any };
}

export const Popover = PopoverPrimitive.Root;

export const PopoverTrigger = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Trigger>,
    PopoverTriggerProps
>(({ className, children, ...props }, ref) => (
    <PopoverPrimitive.Trigger
        ref={ref}
        className={twMerge(
            'inline-flex items-center justify-center',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            'dark:focus:ring-offset-gray-800',
            className
        )}
        {...props}
    >
        {children}
    </PopoverPrimitive.Trigger>
));

export const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    PopoverContentProps
>(({ className, side = 'bottom', sideOffset = 4, sx, children, ...props }, ref) => {
    const contentClassName = sx ? `popover-content-${Math.random().toString(36).slice(2, 11)}` : '';

    return (
        <>
            {sx && (
                <style>
                    {`
                        .${contentClassName} {
                            ${Object.entries(sx)
                            .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                            .join('\n')}
                        }
                    `}
                </style>
            )}
            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    ref={ref}
                    sideOffset={sideOffset}
                    side={side as 'top' | 'right' | 'bottom' | 'left'}
                    className={twMerge(popoverContentVariants({ side }), contentClassName, className)}
                    {...props}
                >
                    {children}
                    <PopoverPrimitive.Arrow
                        className="fill-white dark:fill-gray-800"
                        width={12}
                        height={6}
                    />
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </>
    );
});

PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;
PopoverContent.displayName = PopoverPrimitive.Content.displayName; 