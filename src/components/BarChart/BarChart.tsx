import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { type DataPoint, type DataSeries } from '../../types/chart.types';

const barChartVariants = cva(
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

export interface BarChartProps extends VariantProps<typeof barChartVariants> {
    /**
     * The data to display
     */
    data: DataPoint[];
    /**
     * The data series to display
     */
    series: DataSeries[];
    /**
     * The key for the X-axis data
     */
    xAxisKey: string;
    /**
     * Whether to show the grid
     */
    showGrid?: boolean;
    /**
     * Whether to show the legend
     */
    showLegend?: boolean;
    /**
     * Whether to show the tooltip
     */
    showTooltip?: boolean;
    /**
     * Whether to animate the chart
     */
    animate?: boolean;
    /**
     * Whether to layout the bars horizontally
     */
    layout?: 'vertical' | 'horizontal';
    /**
     * The height of the chart
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

const getVariantColor = (variant: string, isDark: boolean) => {
    switch (variant) {
        case 'primary':
            return isDark ? 'rgb(96, 165, 250)' : 'rgb(37, 99, 235)';
        case 'success':
            return isDark ? 'rgb(74, 222, 128)' : 'rgb(22, 163, 74)';
        case 'warning':
            return isDark ? 'rgb(250, 204, 21)' : 'rgb(202, 138, 4)';
        case 'error':
            return isDark ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)';
        default:
            return isDark ? 'rgb(226, 232, 240)' : 'rgb(15, 23, 42)';
    }
};

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
    ({
        data,
        series,
        xAxisKey,
        showGrid = true,
        showLegend = true,
        showTooltip = true,
        animate = true,
        layout = 'vertical',
        height = 400,
        variant,
        sx,
        className,
    }, ref) => {
        const chartClassName = sx ? `bar-chart-${Math.random().toString(36).slice(2, 11)}` : '';
        const isDarkMode = document.documentElement.classList.contains('dark');

        // Ensure we have valid data
        if (!data || data.length === 0 || !series || series.length === 0) {
            return (
                <div
                    ref={ref}
                    className={twMerge(
                        barChartVariants({ variant }),
                        'flex items-center justify-center',
                        className
                    )}
                    style={{ height }}
                >
                    <p className="text-slate-500 dark:text-slate-400">No data available</p>
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className={twMerge(
                    barChartVariants({ variant }),
                    'relative',
                    chartClassName,
                    className
                )}
                style={{ height }}
            >
                {sx && (
                    <style>
                        {`
                            .${chartClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <RechartsBarChart
                    width={500}
                    height={height - 32} // Subtract padding
                    data={data}
                    layout={layout}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    {showGrid && (
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={isDarkMode ? 'rgba(226, 232, 240, 0.1)' : 'rgba(15, 23, 42, 0.1)'}
                        />
                    )}
                    <XAxis
                        type={layout === 'vertical' ? 'number' : 'category'}
                        dataKey={layout === 'vertical' ? undefined : xAxisKey}
                        stroke={isDarkMode ? 'rgb(148, 163, 184)' : 'rgb(71, 85, 105)'}
                        tick={{ fill: isDarkMode ? 'rgb(148, 163, 184)' : 'rgb(71, 85, 105)' }}
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                        type={layout === 'vertical' ? 'category' : 'number'}
                        dataKey={layout === 'vertical' ? xAxisKey : undefined}
                        stroke={isDarkMode ? 'rgb(148, 163, 184)' : 'rgb(71, 85, 105)'}
                        tick={{ fill: isDarkMode ? 'rgb(148, 163, 184)' : 'rgb(71, 85, 105)' }}
                        padding={{ top: 10, bottom: 10 }}
                    />
                    {showTooltip && (
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                            }}
                            labelStyle={{
                                color: isDarkMode ? 'rgb(226, 232, 240)' : 'rgb(15, 23, 42)',
                                fontWeight: 600,
                                marginBottom: '0.25rem',
                            }}
                            itemStyle={{
                                color: isDarkMode ? 'rgb(148, 163, 184)' : 'rgb(71, 85, 105)',
                                fontSize: '0.875rem',
                                padding: '0.125rem 0',
                            }}
                        />
                    )}
                    {showLegend && (
                        <Legend
                            verticalAlign="top"
                            height={36}
                            wrapperStyle={{
                                color: isDarkMode ? 'rgb(148, 163, 184)' : 'rgb(71, 85, 105)',
                                paddingBottom: '20px',
                            }}
                        />
                    )}
                    {series.map((s) => (
                        <Bar
                            key={s.dataKey}
                            dataKey={s.dataKey}
                            name={s.name || s.dataKey}
                            fill={getVariantColor(s.variant || variant || 'default', isDarkMode)}
                            stackId={s.stackId}
                            isAnimationActive={animate}
                        />
                    ))}
                </RechartsBarChart>
            </div>
        );
    }
);

BarChart.displayName = 'BarChart';