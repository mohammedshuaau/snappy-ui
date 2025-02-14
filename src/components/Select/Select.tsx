import React, { useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

// Select trigger variants
const selectTriggerVariants = cva(
    [
        // Base styles
        'flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm',
        'ring-offset-background',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50 disabled:border-slate-200',
        // Dark mode
        'dark:bg-slate-950 dark:border-slate-800',
        'dark:focus:ring-slate-400',
        'dark:disabled:bg-slate-900 dark:disabled:border-slate-800',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: [
                    'border-slate-200 text-slate-900',
                    'hover:border-slate-300',
                    'focus:ring-primary-500',
                    'dark:text-slate-100',
                    'dark:hover:border-slate-700',
                    'disabled:hover:border-slate-200',
                    'dark:disabled:hover:border-slate-800',
                ],
                error: [
                    'border-red-300 text-red-900',
                    'hover:border-red-400',
                    'focus:ring-red-500',
                    'dark:border-red-800 dark:text-red-400',
                    'disabled:hover:border-red-300',
                    'dark:disabled:hover:border-red-800',
                ],
            },
            size: {
                default: 'h-10',
                sm: 'h-8 px-2 text-xs',
                lg: 'h-12 px-4 text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

// Select content variants
const selectContentVariants = cva(
    [
        // Base styles
        'z-50 min-w-[8rem] overflow-hidden rounded-md bg-white p-1 shadow-lg',
        'mt-1',
        // Animation
        'origin-top-left transition-all',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        // Dark mode
        'dark:bg-slate-900 dark:border dark:border-slate-800',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-white',
                    'dark:bg-slate-900',
                ],
                error: [
                    'bg-red-50',
                    'dark:bg-red-950',
                ],
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

// Select item variants
const selectItemVariants = cva(
    [
        'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'transition-colors duration-150',
        // Default state
        'text-slate-700 dark:text-slate-300',
        // Hover state
        'hover:bg-slate-100 hover:text-slate-900',
        'dark:hover:bg-slate-800 dark:hover:text-slate-50',
        // Focus state
        'focus:bg-slate-100 focus:text-slate-900',
        'dark:focus:bg-slate-800 dark:focus:text-slate-50',
        // Selected state
        'data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-900',
        'dark:data-[selected=true]:bg-slate-800 dark:data-[selected=true]:text-slate-50 dark:data-[selected=true]:border-l-2 dark:data-[selected=true]:border-primary-500',
        // Disabled state
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
    ],
    {
        variants: {
            variant: {
                default: [
                    // Hover state for default variant
                    'hover:bg-slate-100 hover:text-slate-900',
                    'dark:hover:bg-slate-800 dark:hover:text-slate-50',
                    // Selected state for default variant
                    'data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-900',
                    'dark:data-[selected=true]:bg-slate-800 dark:data-[selected=true]:text-slate-50 dark:data-[selected=true]:border-l-2 dark:data-[selected=true]:border-primary-500',
                ],
                error: [
                    'text-red-700 dark:text-red-300',
                    // Hover state for error variant
                    'hover:bg-red-50 hover:text-red-900',
                    'dark:hover:bg-red-900/40 dark:hover:text-red-200',
                    // Selected state for error variant
                    'data-[selected=true]:bg-red-100 data-[selected=true]:text-red-900',
                    'dark:data-[selected=true]:bg-red-900/40 dark:data-[selected=true]:text-red-200 dark:data-[selected=true]:border-l-2 dark:data-[selected=true]:border-red-500',
                ],
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

// Types
type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export type SelectOption = {
    label: string;
    value: string;
    disabled?: boolean;
};

export interface SelectProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'onChange'>,
    VariantProps<typeof selectTriggerVariants> {
    /** Options to display in the select */
    options: SelectOption[];
    /** Selected value(s) */
    value?: string | string[];
    /** Callback when selection changes */
    onChange?: (value: string | string[]) => void;
    /** Whether to allow multiple selections */
    multiple?: boolean;
    /** Placeholder text */
    placeholder?: string;
    /** Default option text (e.g., "Please select...") */
    defaultOption?: string;
    /** Error message */
    error?: string;
    /** Whether the select is disabled */
    disabled?: boolean;
    /** Label for the select */
    label?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    ({
        className,
        options,
        value,
        onChange,
        multiple = false,
        placeholder = 'Select option',
        defaultOption = 'Please select...',
        error,
        disabled,
        label,
        required,
        variant = 'default',
        size,
        sx,
        ...props
    }, ref) => {
        const [open, setOpen] = useState(false);
        const [mounted, setMounted] = useState(false);
        const [isClosing, setIsClosing] = useState(false);
        const triggerRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);
        const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

        // Generate a unique ID for the input
        const id = React.useId();

        // Convert value to array for consistent handling
        const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

        // Get selected options
        const selectedOptions = options.filter(option => selectedValues.includes(option.value));

        // Handle mounting and unmounting
        useEffect(() => {
            if (open) {
                setMounted(true);
                setIsClosing(false);
                // Calculate position when opening
                if (triggerRef.current) {
                    const rect = triggerRef.current.getBoundingClientRect();
                    setPosition({
                        top: rect.bottom + window.scrollY,
                        left: rect.left + window.scrollX,
                        width: rect.width,
                    });
                }
            } else if (mounted) {
                setIsClosing(true);
                const timer = setTimeout(() => {
                    setMounted(false);
                    setIsClosing(false);
                }, 300);
                return () => clearTimeout(timer);
            }
        }, [open]);

        // Handle click outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    open &&
                    triggerRef.current &&
                    contentRef.current &&
                    !triggerRef.current.contains(event.target as Node) &&
                    !contentRef.current.contains(event.target as Node)
                ) {
                    setOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [open]);

        // Handle escape key
        const handleEscape = useCallback((event: KeyboardEvent) => {
            if (open && event.key === 'Escape') {
                setOpen(false);
            }
        }, [open]);

        useEffect(() => {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }, [handleEscape]);

        // Handle option selection
        const handleSelect = (optionValue: string, isDisabled?: boolean) => {
            if (disabled || isDisabled) return;

            if (multiple) {
                const newValue = selectedValues.includes(optionValue)
                    ? selectedValues.filter(v => v !== optionValue)
                    : [...selectedValues, optionValue];
                onChange?.(newValue);
            } else {
                onChange?.(optionValue);
                setOpen(false);
            }
        };

        // Generate display text
        const displayText = selectedOptions.length
            ? selectedOptions.map(option => option.label).join(', ')
            : placeholder;

        const contentState = isClosing ? 'closed' : 'open';

        return (
            <div
                ref={ref}
                className={twMerge('relative w-full', className)}
                {...props}
            >
                {/* Label */}
                {label && (
                    <label
                        htmlFor={id}
                        className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100"
                    >
                        {label}
                        {required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                )}

                {/* Trigger */}
                <div
                    ref={triggerRef}
                    className={selectTriggerVariants({
                        variant: error ? 'error' : variant,
                        size,
                        className: twMerge(
                            'select-none',
                            disabled && 'text-slate-500 dark:text-slate-600'
                        ),
                    })}
                    onClick={() => !disabled && setOpen(!open)}
                    role="combobox"
                    aria-expanded={open}
                    aria-disabled={disabled}
                    id={id}
                >
                    <span className="flex-1 truncate">{displayText}</span>
                    <svg
                        className={twMerge(
                            'h-4 w-4 opacity-50 transition-transform',
                            open && 'rotate-180',
                            disabled && 'opacity-30'
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>

                {/* Error message */}
                {error && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                        {error}
                    </p>
                )}

                {/* Options Portal */}
                {mounted && createPortal(
                    <div
                        ref={contentRef}
                        className={selectContentVariants({
                            variant: error ? 'error' : variant,
                        })}
                        style={{
                            position: 'fixed',
                            top: position.top,
                            left: position.left,
                            width: position.width,
                            zIndex: 50,
                            opacity: isClosing ? 0 : 1,
                            transform: `scale(${isClosing ? 0.95 : 1})`,
                            pointerEvents: isClosing ? 'none' : 'auto',
                        }}
                        data-state={contentState}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {defaultOption && !multiple && (
                            <div
                                className={selectItemVariants({
                                    variant: error ? 'error' : variant,
                                })}
                                onClick={() => handleSelect('')}
                                data-selected={selectedValues.length === 0}
                                role="option"
                                aria-selected={selectedValues.length === 0}
                            >
                                <span className="flex-1 truncate">{defaultOption}</span>
                            </div>
                        )}
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={selectItemVariants({
                                    variant: error ? 'error' : variant,
                                })}
                                onClick={() => handleSelect(option.value, option.disabled)}
                                data-disabled={option.disabled}
                                data-selected={selectedValues.includes(option.value)}
                                role="option"
                                aria-selected={selectedValues.includes(option.value)}
                            >
                                {multiple && (
                                    <div className="mr-2 flex h-4 w-4 items-center justify-center rounded border border-slate-300 dark:border-slate-700">
                                        {selectedValues.includes(option.value) && (
                                            <svg
                                                className="h-3 w-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                )}
                                <span className="flex-1 truncate">{option.label}</span>
                                {!multiple && selectedValues.includes(option.value) && (
                                    <svg
                                        className="ml-2 h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>,
                    document.body
                )}
            </div>
        );
    }
);

Select.displayName = 'Select'; 