import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Switch} from './Switch';

describe('Switch', () => {
    it('renders with default props', () => {
        render(<Switch />);
        const switchEl = screen.getByRole('switch');
        expect(switchEl).toBeInTheDocument();
        expect(switchEl).toHaveClass('peer', 'inline-flex', 'h-5', 'w-9');
        expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });

    describe('variants', () => {
        it('renders default variant correctly', () => {
            render(<Switch variant="default" />);
            expect(screen.getByRole('switch')).toHaveClass('bg-slate-200', 'hover:bg-slate-300');
        });

        it('renders error variant correctly', () => {
            render(<Switch variant="error" />);
            expect(screen.getByRole('switch')).toHaveClass('bg-red-100', 'hover:bg-red-200');
        });

        it('applies error variant when error prop is provided', () => {
            render(<Switch error="Error message" />);
            expect(screen.getByRole('switch')).toHaveClass('bg-red-100');
            expect(screen.getByText('Error message')).toBeInTheDocument();
        });
    });

    describe('label and description', () => {
        it('renders label correctly', () => {
            render(<Switch label="Test Label" />);
            expect(screen.getByText('Test Label')).toBeInTheDocument();
        });

        it('renders description correctly', () => {
            render(<Switch description="Test Description" />);
            expect(screen.getByText('Test Description')).toBeInTheDocument();
        });

        it('renders required indicator when required prop is true', () => {
            render(<Switch label="Required Field" required />);
            expect(screen.getByText('*')).toBeInTheDocument();
            expect(screen.getByRole('switch')).toHaveAttribute('aria-required', 'true');
        });
    });

    describe('disabled state', () => {
        it('applies disabled styles correctly', () => {
            render(<Switch disabled label="Disabled Switch" />);
            const switchEl = screen.getByRole('switch');
            const label = screen.getByText('Disabled Switch');

            expect(switchEl).toBeDisabled();
            expect(switchEl).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
            expect(label).toHaveClass('opacity-50', 'cursor-not-allowed');
        });

        it('prevents toggling when disabled', () => {
            const onChange = vi.fn();
            render(<Switch disabled onChange={onChange} />);

            fireEvent.click(screen.getByRole('switch'));
            expect(onChange).not.toHaveBeenCalled();
            expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
        });
    });

    describe('controlled behavior', () => {
        it('handles checked prop correctly', () => {
            const { rerender } = render(<Switch checked={true} />);
            expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');

            rerender(<Switch checked={false} />);
            expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
        });

        it('calls onChange with correct value', () => {
            const onChange = vi.fn();
            render(<Switch checked={false} onChange={onChange} />);

            fireEvent.click(screen.getByRole('switch'));
            expect(onChange).toHaveBeenCalledWith(true);
        });
    });

    describe('uncontrolled behavior', () => {
        it('handles defaultChecked prop correctly', () => {
            render(<Switch defaultChecked />);
            expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
        });

        it('toggles state when clicked', () => {
            render(<Switch />);
            const switchEl = screen.getByRole('switch');

            expect(switchEl).toHaveAttribute('aria-checked', 'false');
            fireEvent.click(switchEl);
            expect(switchEl).toHaveAttribute('aria-checked', 'true');
            fireEvent.click(switchEl);
            expect(switchEl).toHaveAttribute('aria-checked', 'false');
        });
    });

    describe('thumb behavior', () => {
        it('renders thumb with correct position classes', () => {
            render(<Switch />);
            const thumb = screen.getByRole('switch').querySelector('[data-state]');
            expect(thumb).toHaveClass('pointer-events-none', 'block', 'h-4', 'w-4');
            expect(thumb).toHaveAttribute('data-state', 'unchecked');
        });

        it('updates thumb position on state change', () => {
            render(<Switch />);
            const switchEl = screen.getByRole('switch');
            const thumb = switchEl.querySelector('[data-state]');

            expect(thumb).toHaveAttribute('data-state', 'unchecked');
            fireEvent.click(switchEl);
            expect(thumb).toHaveAttribute('data-state', 'checked');
        });
    });

    describe('accessibility', () => {
        it('sets aria-invalid when error is provided', () => {
            render(<Switch error="Error message" />);
            expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true');
        });

        it('maintains association between label and switch', () => {
            render(<Switch label="Test Label" />);
            const switchEl = screen.getByRole('switch');
            const label = screen.getByText('Test Label');
            expect(label).toHaveAttribute('for', switchEl.id);
        });

        it('has correct ARIA attributes', () => {
            render(<Switch required aria-label="Toggle feature" />);
            const switchEl = screen.getByRole('switch');
            expect(switchEl).toHaveAttribute('aria-required', 'true');
            expect(switchEl).toHaveAttribute('aria-label', 'Toggle feature');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Switch className="custom-class" />);
            expect(screen.getByRole('switch')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Switch
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                />
            );

            const switchEl = screen.getByRole('switch');
            const computedStyle = window.getComputedStyle(switchEl);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Switch
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                />
            );

            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
}); 