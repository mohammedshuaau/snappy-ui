import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { type HeatmapData } from '../../types/chart.types';

const heatmapVariants = cva(
    'rounded-lg p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm',
    {
        variants: {
            variant: {
                default: 'text-slate-900 dark:text-slate-100',
                primary: 'text-primary-600 dark:text-primary-400',
                success: 'text-green-600 dark:text-green-400',
                warning: 'text-yellow-600 dark:text-yellow-400',
                error: 'text-red-600 dark:text-red-400',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface HeatmapProps extends VariantProps<typeof heatmapVariants> {
    /**
     * The data to display
     */
    data: HeatmapData[];
    /**
     * The minimum value for color scaling
     */
    minValue?: number;
    /**
     * The maximum value for color scaling
     */
    maxValue?: number;
    /**
     * The number of color steps
     */
    colorSteps?: number;
    /**
     * Whether to show tooltips
     */
    showTooltips?: boolean;
    /**
     * Whether to show axis labels
     */
    showLabels?: boolean;
    /**
     * The height of the heatmap
     */
    height?: number;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Additional class names
     */
    className?: string;
}

const getColorScale = (value: number, min: number, max: number, variant: string, isDark: boolean) => {
    const normalizedValue = (value - min) / (max - min);
    const opacity = Math.max(0.1, Math.min(1, normalizedValue));

    switch (variant) {
        case 'primary':
            return isDark ? `rgba(96, 165, 250, ${opacity})` : `rgba(37, 99, 235, ${opacity})`;
        case 'success':
            return isDark ? `rgba(74, 222, 128, ${opacity})` : `rgba(22, 163, 74, ${opacity})`;
        case 'warning':
            return isDark ? `rgba(250, 204, 21, ${opacity})` : `rgba(202, 138, 4, ${opacity})`;
        case 'error':
            return isDark ? `rgba(248, 113, 113, ${opacity})` : `rgba(220, 38, 38, ${opacity})`;
        default:
            return isDark ? `rgba(226, 232, 240, ${opacity})` : `rgba(15, 23, 42, ${opacity})`;
    }
};

export const Heatmap = React.forwardRef<HTMLDivElement, HeatmapProps>(
    ({
        data,
        minValue,
        maxValue,
        showTooltips = true,
        showLabels = true,
        height = 300,
        variant,
        sx,
        className,
    }, ref) => {
        // Generate unique class name for custom styles
        const heatmapClassName = sx ? `heatmap-${Math.random().toString(36).slice(2, 11)}` : '';

        const isDarkMode = document.documentElement.classList.contains('dark');

        // Calculate min and max values if not provided
        const actualMinValue = minValue ?? Math.min(...data.map(d => d.value));
        const actualMaxValue = maxValue ?? Math.max(...data.map(d => d.value));

        // Get unique x and y values
        const xValues = Array.from(new Set(data.map(d => d.x))).sort().reverse(); // Reverse X values
        const yValues = Array.from(new Set(data.map(d => d.y))).sort(); // Keep Y values in original order

        // Calculate cell dimensions
        const cellSize = Math.min((height - (showLabels ? 40 : 0)) / yValues.length, 40);

        return (
            <div
                ref={ref}
                className={twMerge(
                    heatmapVariants({ variant }),
                    heatmapClassName,
                    'flex items-start',
                    className
                )}
            >
                {sx && (
                    <style>
                        {`
                            .${heatmapClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div className="flex-1">
                    <div className="grid" style={{
                        gridTemplateColumns: `repeat(${xValues.length}, ${cellSize}px)`,
                        gap: 0
                    }}>
                        {yValues.map((y) => (
                            xValues.map((x) => {
                                const cell = data.find(d => d.x === x && d.y === y);
                                const value = cell?.value ?? actualMinValue;
                                const backgroundColor = getColorScale(value, actualMinValue, actualMaxValue, variant || 'default', isDarkMode);

                                return (
                                    <div
                                        key={`${x}-${y}`}
                                        className={twMerge(
                                            'relative transition-colors duration-200',
                                            showTooltips && 'group'
                                        )}
                                        style={{
                                            height: `${cellSize}px`,
                                            backgroundColor,
                                        }}
                                    >
                                        {showTooltips && (
                                            <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs font-medium text-white bg-slate-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {x}, {y}: {value}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ))}
                    </div>
                    {showLabels && (
                        <div className="flex justify-between mt-2 text-xs text-slate-600 dark:text-slate-400">
                            {xValues.map((x) => (
                                <div key={x.toString()} style={{ width: `${cellSize}px` }} className="text-center">
                                    {x}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {showLabels && (
                    <div className="flex flex-col justify-start ml-4 text-xs text-slate-600 dark:text-slate-400">
                        {yValues.map((y) => (
                            <div key={y.toString()} style={{ height: `${cellSize}px` }} className="flex items-center">
                                {y}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

Heatmap.displayName = 'Heatmap';