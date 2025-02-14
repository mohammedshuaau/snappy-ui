import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const gaugeVariants = cva(
    'relative inline-flex items-center justify-center',
    {
        variants: {
            size: {
                sm: 'w-32 h-16',
                default: 'w-48 h-24',
                lg: 'w-64 h-32',
                xl: 'w-80 h-40',
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

export interface GaugeProps extends VariantProps<typeof gaugeVariants> {
    /**
     * The value to display (0-100)
     */
    value: number;
    /**
     * The minimum value
     */
    min?: number;
    /**
     * The maximum value
     */
    max?: number;
    /**
     * The number of segments in the gauge
     */
    segments?: number;
    /**
     * Whether to show the value
     */
    showValue?: boolean;
    /**
     * The label to display below the value
     */
    label?: string;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Additional class names
     */
    className?: string;
}

const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
    ({
        value,
        min = 0,
        max = 100,
        segments = 5,
        showValue = true,
        label,
        size,
        variant,
        sx,
        className,
    }, ref) => {
        // Normalize value between 0 and 100
        const normalizedValue = ((value - min) / (max - min)) * 100;
        const clampedValue = Math.min(Math.max(normalizedValue, 0), 100);

        // Generate unique class name for custom styles
        const gaugeClassName = sx ? `gauge-${Math.random().toString(36).slice(2, 11)}` : '';

        // Generate segment data
        const segmentSize = 100 / segments;
        const segmentData = Array.from({ length: segments }, (_, i) => ({
            value: segmentSize,
            fill: clampedValue >= (i + 1) * segmentSize ? 'currentColor' : 'rgb(229 231 235)',
        }));

        // Get dimensions based on size
        const getDimensions = () => {
            switch (size) {
                case 'sm': return { width: 128, height: 64 };
                case 'lg': return { width: 256, height: 128 };
                case 'xl': return { width: 320, height: 160 };
                default: return { width: 192, height: 96 };
            }
        };

        const { width, height } = getDimensions();

        return (
            <div
                ref={ref}
                className={twMerge(
                    gaugeVariants({ size, variant }),
                    gaugeClassName,
                    className
                )}
            >
                {sx && (
                    <style>
                        {`
                            .${gaugeClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <PieChart width={width} height={height * 2}>
                    <Pie
                        data={segmentData}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="80%"
                        outerRadius="100%"
                        dataKey="value"
                        isAnimationActive={false}
                    >
                        {segmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                </PieChart>
                {(showValue || label) && (
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center">
                        {showValue && (
                            <span className="text-slate-900 dark:text-slate-100 font-semibold">
                                {Math.round(value)}
                            </span>
                        )}
                        {label && (
                            <span className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                                {label}
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Gauge.displayName = 'Gauge';

export default Gauge; 