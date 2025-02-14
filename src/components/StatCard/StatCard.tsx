import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import {Sparkline} from '../Sparkline/Sparkline';
import {ProgressCircle} from '../ProgressCircle/ProgressCircle';
import {Gauge} from '../Gauge/Gauge';

const statCardVariants = cva(
    'rounded-lg p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm',
    {
        variants: {
            variant: {
                default: 'border-slate-200 dark:border-slate-700',
                primary: 'border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20',
                success: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
                warning: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
                error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

type ChartType = 'sparkline' | 'progress' | 'gauge';

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
    /**
     * The title of the stat card
     */
    title: string;
    /**
     * The current value
     */
    value: string | number;
    /**
     * The type of chart to display
     */
    chartType?: ChartType;
    /**
     * The data for the sparkline chart
     */
    sparklineData?: number[];
    /**
     * The progress value (0-100) for progress or gauge chart
     */
    progressValue?: number;
    /**
     * The change percentage
     */
    change?: number;
    /**
     * The change period text
     */
    changePeriod?: string;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Additional class names
     */
    className?: string;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
    ({
        title,
        value,
        chartType,
        sparklineData,
        progressValue,
        change,
        changePeriod = 'vs. last period',
        variant,
        sx,
        className,
    }, ref) => {
        // Generate unique class name for custom styles
        const cardClassName = sx ? `stat-card-${Math.random().toString(36).slice(2, 11)}` : '';

        const renderChart = () => {
            switch (chartType) {
                case 'sparkline':
                    return sparklineData && (
                        <div className="h-12">
                            <Sparkline
                                data={sparklineData}
                                variant={variant === 'primary' ? 'default' : variant}
                                showArea
                            />
                        </div>
                    );
                case 'progress':
                    return progressValue !== undefined && (
                        <div className="flex justify-end">
                            <ProgressCircle
                                value={progressValue}
                                variant={variant === 'primary' ? 'default' : variant}
                                showValue={false}
                            />
                        </div>
                    );
                case 'gauge':
                    return progressValue !== undefined && (
                        <div className="flex justify-end">
                            <Gauge
                                value={progressValue}
                                variant={variant === 'primary' ? 'default' : variant}
                                showValue={false}
                            />
                        </div>
                    );
                default:
                    return null;
            }
        };

        return (
            <div
                ref={ref}
                className={twMerge(
                    statCardVariants({ variant }),
                    cardClassName,
                    className
                )}
            >
                {sx && (
                    <style>
                        {`
                            .${cardClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {title}
                    </p>
                    <div className="flex items-baseline justify-between">
                        <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                            {value}
                        </p>
                        {change !== undefined && (
                            <div className={twMerge(
                                'px-2 py-1 rounded-full text-xs font-medium',
                                change > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                    change < 0 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                        'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400'
                            )}>
                                {change > 0 ? '+' : ''}{change}%
                            </div>
                        )}
                    </div>
                    {renderChart()}
                    {changePeriod && (
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            {changePeriod}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

StatCard.displayName = 'StatCard';