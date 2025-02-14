import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Tabs} from './Tabs';

describe('Tabs', () => {
    const defaultItems = [
        { label: 'Tab 1', content: 'Content 1' },
        { label: 'Tab 2', content: 'Content 2' },
        { label: 'Tab 3', content: 'Content 3', disabled: true },
        { label: 'Tab 4', content: 'Content 4', icon: <span>🔔</span> }
    ];

    it('renders with default props', () => {
        render(<Tabs items={defaultItems} />);
        expect(screen.getByRole('tablist')).toBeInTheDocument();
        defaultItems.forEach(item => {
            expect(screen.getByRole('tab', { name: new RegExp(item.label) })).toBeInTheDocument();
        });
        expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    describe('variants', () => {
        const variants = {
            default: ['bg-slate-100', 'rounded-lg'],
            pills: ['gap-2'],
            underline: ['border-b', 'border-slate-200']
        } as const;

        Object.entries(variants).forEach(([variant, expectedClasses]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Tabs items={defaultItems} variant={variant as keyof typeof variants} />);
                const tabList = screen.getByRole('tablist');
                expectedClasses.forEach(className => {
                    expect(tabList).toHaveClass(className);
                });
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            sm: ['h-8', 'text-sm'],
            md: ['h-10', 'text-base'],
            lg: ['h-12', 'text-lg']
        } as const;

        Object.entries(sizes).forEach(([size, expectedClasses]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Tabs items={defaultItems} size={size as keyof typeof sizes} />);
                const firstTab = screen.getAllByRole('tab')[0];
                expectedClasses.forEach(className => {
                    expect(firstTab).toHaveClass(className);
                });
            });
        });
    });

    describe('tab interaction', () => {
        it('shows correct content for active tab', () => {
            render(<Tabs items={defaultItems} />);
            expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1');
        });

        it('switches content when clicking tabs', () => {
            render(<Tabs items={defaultItems} />);

            fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
            expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
        });

        it('handles disabled tabs', () => {
            const onChange = vi.fn();
            render(<Tabs items={defaultItems} onChange={onChange} />);

            const disabledTab = screen.getByRole('tab', { name: 'Tab 3' });
            expect(disabledTab).toBeDisabled();

            fireEvent.click(disabledTab);
            expect(onChange).not.toHaveBeenCalled();
        });

        it('calls onChange when switching tabs', () => {
            const onChange = vi.fn();
            render(<Tabs items={defaultItems} onChange={onChange} />);

            fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
            expect(onChange).toHaveBeenCalledWith(1);
        });
    });

    describe('controlled behavior', () => {
        it('respects activeTab prop', () => {
            render(<Tabs items={defaultItems} activeTab={1} />);
            expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
        });

        it('updates when activeTab prop changes', () => {
            const { rerender } = render(<Tabs items={defaultItems} activeTab={0} />);
            expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1');

            rerender(<Tabs items={defaultItems} activeTab={1} />);
            expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
        });
    });

    describe('accessibility', () => {
        it('has correct ARIA attributes', () => {
            render(<Tabs items={defaultItems} />);

            const tabs = screen.getAllByRole('tab');
            const tabpanel = screen.getByRole('tabpanel');

            // First tab should be selected
            expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
            expect(tabs[1]).toHaveAttribute('aria-selected', 'false');

            // Tab panel should be labeled by active tab
            expect(tabpanel).toHaveAttribute('aria-labelledby', `tab-0`);
        });

        it('updates ARIA attributes when switching tabs', () => {
            render(<Tabs items={defaultItems} />);

            fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));

            const tabs = screen.getAllByRole('tab');
            expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
            expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
        });
    });

    describe('icons', () => {
        it('renders tab with icon', () => {
            render(<Tabs items={defaultItems} />);
            expect(screen.getByText('🔔')).toBeInTheDocument();
        });

        it('positions icon correctly', () => {
            render(<Tabs items={defaultItems} />);
            const iconWrapper = screen.getByText('🔔').parentElement;
            expect(iconWrapper).toHaveClass('mr-2');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Tabs items={defaultItems} className="custom-class" />);
            expect(screen.getByRole('tablist').parentElement).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Tabs
                    items={defaultItems}
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                />
            );

            const tabsContainer = screen.getByRole('tablist').parentElement;
            const computedStyle = window.getComputedStyle(tabsContainer as HTMLElement);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
}); 