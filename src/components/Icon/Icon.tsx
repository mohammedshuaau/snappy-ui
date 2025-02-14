import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import * as TablerIcons from '@tabler/icons-react';

const iconVariants = cva(
    'inline-flex items-center justify-center transition-colors',
    {
        variants: {
            variant: {
                default: 'text-slate-900 dark:text-slate-100',
                primary: 'text-primary-600 dark:text-primary-400',
                secondary: 'text-slate-600 dark:text-slate-400',
                success: 'text-green-600 dark:text-green-400',
                warning: 'text-yellow-600 dark:text-yellow-400',
                error: 'text-red-600 dark:text-red-400',
            },
            size: {
                sm: 'w-4 h-4',
                default: 'w-5 h-5',
                lg: 'w-6 h-6',
                xl: 'w-8 h-8',
            },
            stroke: {
                thin: 'stroke-[1]',
                default: 'stroke-[1.5]',
                medium: 'stroke-[1.75]',
                bold: 'stroke-[2]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            stroke: 'default',
        },
    }
);

export interface IconProps
    extends Omit<React.SVGProps<SVGSVGElement>, 'size' | 'stroke'>,
    VariantProps<typeof iconVariants> {
    /**
     * The name of the icon from Tabler Icons
     */
    name: keyof typeof TablerIcons;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({
        className,
        variant,
        size,
        stroke,
        name,
        sx,
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const iconClassName = sx ? `icon-${Math.random().toString(36).slice(2, 11)}` : '';

        // Get the icon component from Tabler Icons
        const IconComponent = TablerIcons[name];

        if (!IconComponent) {
            console.warn(`Icon "${name}" not found in Tabler Icons`);
            return null;
        }

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${iconClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                {IconComponent && React.createElement(IconComponent as React.ComponentType<React.SVGProps<SVGSVGElement>>, {
                    ref,
                    className: twMerge(
                        iconVariants({ variant, size, stroke }),
                        iconClassName,
                        className
                    ),
                    ...props
                })}
            </>
        );
    }
);

Icon.displayName = 'Icon';