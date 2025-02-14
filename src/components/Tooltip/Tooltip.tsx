import React, { useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

// Type for sx prop
type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

const tooltipVariants = cva(
    [
        // Base styles
        'z-50 px-3 py-1.5 rounded-md text-sm text-white bg-slate-900',
        'absolute pointer-events-none opacity-0 scale-95',
        'transition-all duration-200 ease-out',
        // Dark mode
        'dark:bg-slate-800',
        ...transitionClasses,
    ],
    {
        variants: {
            position: {
                top: 'mb-2',
                bottom: 'mt-2',
                left: 'mr-2',
                right: 'ml-2',
            },
        },
        defaultVariants: {
            position: 'top',
        },
    }
);

// Arrow styles
const arrowVariants = cva(
    'absolute w-2 h-2 bg-inherit',
    {
        variants: {
            position: {
                top: [
                    'bottom-[-4px] left-1/2 -translate-x-1/2',
                    'rotate-45'
                ],
                bottom: [
                    'top-[-4px] left-1/2 -translate-x-1/2',
                    'rotate-45'
                ],
                left: [
                    'right-[-4px] top-1/2 -translate-y-1/2',
                    'rotate-45'
                ],
                right: [
                    'left-[-4px] top-1/2 -translate-y-1/2',
                    'rotate-45'
                ],
            },
        },
        defaultVariants: {
            position: 'top',
        },
    }
);

export interface TooltipProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof tooltipVariants> {
    /** The element that triggers the tooltip */
    children: React.ReactElement;
    /** Content to display in the tooltip */
    content: React.ReactNode;
    /** Delay in milliseconds before showing the tooltip */
    delayShow?: number;
    /** Delay in milliseconds before hiding the tooltip */
    delayHide?: number;
    /** Whether the tooltip is disabled */
    disabled?: boolean;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
    ({
        children,
        content,
        position = 'top',
        delayShow = 200,
        delayHide = 150,
        disabled = false,
        className,
        sx,
        ...props
    }) => {
        const [isVisible, setIsVisible] = useState(false);
        const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
        const triggerRef = useRef<HTMLElement>(null);
        const tooltipRef = useRef<HTMLDivElement>(null);
        const showTimeoutRef = useRef<NodeJS.Timeout>();
        const hideTimeoutRef = useRef<NodeJS.Timeout>();
        const tooltipClassName = `tooltip-${Math.random().toString(36).slice(2, 11)}`;

        // Convert sx prop to style object
        const generateStyles = () => {
            if (!sx) return { base: {}, pseudo: {} };

            const baseStyles: React.CSSProperties = {};
            const pseudoStyles: { [key: string]: React.CSSProperties } = {};

            Object.entries(sx).forEach(([key, value]) => {
                if (key.startsWith('&')) {
                    pseudoStyles[key] = value as React.CSSProperties;
                } else {
                    (baseStyles as any)[key] = value;
                }
            });

            return {
                base: baseStyles,
                pseudo: pseudoStyles,
            };
        };

        const updatePosition = useCallback(() => {
            if (!triggerRef.current || !tooltipRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;

            let top = 0;
            let left = 0;

            const gap = 8; // Gap between tooltip and trigger

            switch (position) {
                case 'top':
                    top = triggerRect.top + scrollY - tooltipRect.height - gap;
                    left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + scrollY + gap;
                    left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
                    break;
                case 'left':
                    top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
                    left = triggerRect.left + scrollX - tooltipRect.width - gap;
                    break;
                case 'right':
                    top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
                    left = triggerRect.right + scrollX + gap;
                    break;
            }

            // Ensure tooltip stays within viewport
            const padding = 8;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Horizontal bounds
            if (left < padding) {
                left = padding;
            } else if (left + tooltipRect.width > viewportWidth - padding) {
                left = viewportWidth - tooltipRect.width - padding;
            }

            // Vertical bounds
            if (top < padding) {
                top = padding;
            } else if (top + tooltipRect.height > viewportHeight - padding) {
                top = viewportHeight - tooltipRect.height - padding;
            }

            setTooltipPosition({ top, left });
        }, [position]);

        const showTooltip = useCallback(() => {
            if (disabled) return;
            clearTimeout(hideTimeoutRef.current);
            clearTimeout(showTimeoutRef.current);

            // Calculate position immediately
            requestAnimationFrame(() => {
                const triggerRect = triggerRef.current?.getBoundingClientRect();
                if (!triggerRect) return;

                // Set initial position based on trigger
                const initialTop = triggerRect.top + window.scrollY;
                const initialLeft = triggerRect.left + window.scrollX;
                setTooltipPosition({ top: initialTop, left: initialLeft });

                // After position is set, update to final position and show
                showTimeoutRef.current = setTimeout(() => {
                    requestAnimationFrame(() => {
                        updatePosition();
                        setIsVisible(true);
                    });
                }, delayShow);
            });
        }, [disabled, delayShow, updatePosition]);

        const hideTooltip = useCallback(() => {
            clearTimeout(showTimeoutRef.current);
            clearTimeout(hideTimeoutRef.current);

            hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => {
                    setTooltipPosition(null);
                }, 200); // Match transition duration
            }, delayHide);
        }, [delayHide]);

        useEffect(() => {
            const handleScroll = () => {
                if (isVisible) {
                    updatePosition();
                }
            };

            const handleResize = () => {
                if (isVisible) {
                    updatePosition();
                }
            };

            window.addEventListener('scroll', handleScroll, true);
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('scroll', handleScroll, true);
                window.removeEventListener('resize', handleResize);
            };
        }, [isVisible, updatePosition]);

        useEffect(() => {
            return () => {
                clearTimeout(showTimeoutRef.current);
                clearTimeout(hideTimeoutRef.current);
            };
        }, []);

        const styles = generateStyles();

        const trigger = React.cloneElement(children, {
            ref: triggerRef,
            onMouseEnter: showTooltip,
            onMouseLeave: hideTooltip,
            onFocus: showTooltip,
            onBlur: hideTooltip,
        });

        return (
            <>
                {trigger}
                {tooltipPosition !== null &&
                    createPortal(
                        <>
                            {/* Style tag for custom styles */}
                            {sx && Object.keys(styles.pseudo).length > 0 && (
                                <style>
                                    {`
                                        .${tooltipClassName} {
                                            transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
                                        }
                                        ${Object.entries(styles.pseudo)
                                            .map(([selector, rules]) => `
                                                .${tooltipClassName}${selector.slice(1)} {
                                                    ${Object.entries(rules)
                                                    .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                                    .join(';')}
                                                }
                                            `)
                                            .join('')}
                                    `}
                                </style>
                            )}
                            <div
                                ref={tooltipRef}
                                role="tooltip"
                                data-testid="tooltip"
                                className={twMerge(
                                    tooltipVariants({ position }),
                                    tooltipClassName,
                                    className
                                )}
                                style={{
                                    ...styles.base,
                                    ...tooltipPosition,
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                                }}
                                {...props}
                            >
                                <div data-testid="tooltip-content">
                                    {content}
                                </div>
                                <div className={arrowVariants({ position })} />
                            </div>
                        </>,
                        document.body
                    )}
            </>
        );
    }
);

Tooltip.displayName = 'Tooltip'; 