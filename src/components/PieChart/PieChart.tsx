import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from 'recharts';
import { type DataPoint } from '../../types/chart.types';

const pieChartVariants = cva(
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

export interface PieChartProps extends VariantProps<typeof pieChartVariants> {
    /**
     * The data to display
     */
    data: DataPoint[];
    /**
     * The inner radius of the pie chart (for donut chart)
     */
    innerRadius?: number;
    /**
     * The outer radius of the pie chart
     */
    outerRadius?: number;
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

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
    ({
        data,
        innerRadius = 0,
        outerRadius = '80%',
        showLegend = true,
        showTooltip = true,
        animate = true,
        height = 400,
        variant,
        sx,
        className,
    }, ref) => {
        const chartClassName = sx ? `pie-chart-${Math.random().toString(36).slice(2, 11)}` : '';
        const isDarkMode = document.documentElement.classList.contains('dark');

        // Ensure we have valid data
        if (!data || data.length === 0) {
            return (
                <div
                    ref={ref}
                    className={twMerge(
                        pieChartVariants({ variant }),
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
                    pieChartVariants({ variant }),
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
                <RechartsPieChart
                    width={500}
                    height={height - 32} // Subtract padding
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    {showTooltip && (
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
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
                            verticalAlign="middle"
                            align="right"
                            layout="vertical"
                            wrapperStyle={{
                                color: isDarkMode ? 'rgb(148, 163, 184)' : 'rgb(71, 85, 105)',
                                paddingLeft: '20px',
                            }}
                        />
                    )}
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        dataKey="value"
                        isAnimationActive={animate}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getVariantColor((entry.variant || variant || 'default') as string, isDarkMode)}
                            />
                        ))}
                    </Pie>
                </RechartsPieChart>
            </div>
        );
    }
);

PieChart.displayName = 'PieChart';