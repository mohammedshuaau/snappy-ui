import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const sparklineVariants = cva(
    'relative inline-flex items-center justify-center',
    {
        variants: {
            size: {
                sm: 'w-16 h-8',
                default: 'w-24 h-12',
                lg: 'w-32 h-16',
                xl: 'w-40 h-20',
            },
            variant: {
                default: 'text-primary-600',
                success: 'text-green-600',
                warning: 'text-yellow-600',
                error: 'text-red-600',
            },
        },
        defaultVariants: {
            size: 'default',
            variant: 'default',
        },
    }
);

export interface SparklineProps extends VariantProps<typeof sparklineVariants> {
    /**
     * The data points to display
     */
    data: number[];
    /**
     * Whether to show the area under the line
     */
    showArea?: boolean;
    /**
     * Whether to show dots at data points
     */
    showDots?: boolean;
    /**
     * The stroke width of the line
     */
    strokeWidth?: number;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Additional class names
     */
    className?: string;
}

const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
    ({
        data,
        showArea = false,
        showDots = false,
        strokeWidth = 2,
        size,
        variant,
        sx,
        className,
    }, ref) => {
        // Generate unique class name for custom styles
        const sparklineClassName = sx ? `sparkline-${Math.random().toString(36).slice(2, 11)}` : '';

        // Format data for recharts
        const chartData = data.map((value, index) => ({ value, index }));

        return (
            <div
                ref={ref}
                className={twMerge(
                    sparklineVariants({ size, variant }),
                    sparklineClassName,
                    className
                )}
            >
                {sx && (
                    <style>
                        {`
                            .${sparklineClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="currentColor"
                            strokeWidth={strokeWidth}
                            dot={showDots}
                            fill={showArea ? 'currentColor' : 'none'}
                            fillOpacity={0.2}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
);

Sparkline.displayName = 'Sparkline';

export default Sparkline; 