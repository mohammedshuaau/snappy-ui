import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const progressCircleVariants = cva(
    'relative inline-flex items-center justify-center',
    {
        variants: {
            size: {
                sm: 'w-16 h-16',
                default: 'w-24 h-24',
                lg: 'w-32 h-32',
                xl: 'w-40 h-40',
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

export interface ProgressCircleProps extends VariantProps<typeof progressCircleVariants> {
    /**
     * The progress value (0-100)
     */
    value: number;
    /**
     * The thickness of the progress circle
     */
    thickness?: number;
    /**
     * Whether to show the progress value
     */
    showValue?: boolean;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Additional class names
     */
    className?: string;
}

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(
    ({
        value,
        thickness = 8,
        showValue = true,
        size,
        variant,
        sx,
        className,
    }, ref) => {
        // Ensure value is between 0 and 100
        const normalizedValue = Math.min(Math.max(value, 0), 100);

        // Generate unique class name for custom styles
        const progressClassName = sx ? `progress-circle-${Math.random().toString(36).slice(2, 11)}` : '';

        // Data for the progress circle
        const data = [
            { value: normalizedValue },
            { value: 100 - normalizedValue },
        ];

        // Get dimensions based on size
        const getDimensions = () => {
            switch (size) {
                case 'sm': return { width: 64, height: 64 };
                case 'lg': return { width: 128, height: 128 };
                case 'xl': return { width: 160, height: 160 };
                default: return { width: 96, height: 96 };
            }
        };

        const { width, height } = getDimensions();

        return (
            <div
                ref={ref}
                className={twMerge(
                    progressCircleVariants({ size, variant }),
                    progressClassName,
                    className
                )}
            >
                {sx && (
                    <style>
                        {`
                            .${progressClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <PieChart width={width} height={height}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={width / 2 - thickness}
                        outerRadius={width / 2}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                    >
                        <Cell fill="currentColor" />
                        <Cell fill="rgb(229 231 235)" />
                    </Pie>
                </PieChart>
                {showValue && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-slate-900 dark:text-slate-100 font-semibold">
                            {Math.round(normalizedValue)}%
                        </span>
                    </div>
                )}
            </div>
        );
    }
);

ProgressCircle.displayName = 'ProgressCircle';

export default ProgressCircle; 