import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Checkbox} from './Checkbox';

describe('Checkbox', () => {
    it('renders with default props', () => {
        render(<Checkbox />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveClass('peer', 'h-4', 'w-4');
    });

    describe('variants', () => {
        it('renders default variant correctly', () => {
            render(<Checkbox variant="default" />);
            expect(screen.getByRole('checkbox')).toHaveClass('border-slate-300', 'bg-white');
        });

        it('renders error variant correctly', () => {
            render(<Checkbox variant="error" />);
            expect(screen.getByRole('checkbox')).toHaveClass('border-red-300', 'bg-white');
        });

        it('applies error variant when error prop is provided', () => {
            render(<Checkbox error="Error message" />);
            expect(screen.getByRole('checkbox')).toHaveClass('border-red-300');
            expect(screen.getByText('Error message')).toBeInTheDocument();
        });
    });

    describe('label and description', () => {
        it('renders label correctly', () => {
            render(<Checkbox label="Test Label" />);
            expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
        });

        it('renders description correctly', () => {
            render(<Checkbox description="Test Description" />);
            expect(screen.getByText('Test Description')).toBeInTheDocument();
        });

        it('renders required indicator when required prop is true', () => {
            render(<Checkbox label="Required Field" required />);
            expect(screen.getByText('*')).toBeInTheDocument();
            expect(screen.getByRole('checkbox')).toHaveAttribute('aria-required', 'true');
        });
    });

    describe('disabled state', () => {
        it('applies disabled styles correctly', () => {
            render(<Checkbox disabled label="Disabled Checkbox" />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText('Disabled Checkbox');

            expect(checkbox).toBeDisabled();
            expect(checkbox).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
            expect(label).toHaveClass('opacity-50', 'cursor-not-allowed');
        });
    });

    describe('interaction', () => {
        it('handles change events', () => {
            const onChange = vi.fn();
            render(<Checkbox onChange={onChange} />);

            fireEvent.click(screen.getByRole('checkbox'));
            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it('updates checked state correctly', () => {
            render(<Checkbox />);
            const checkbox = screen.getByRole('checkbox');

            expect(checkbox).not.toBeChecked();
            fireEvent.click(checkbox);
            expect(checkbox).toBeChecked();
        });

        it('maintains controlled checked state', () => {
            const { rerender } = render(<Checkbox checked={true} readOnly />);
            expect(screen.getByRole('checkbox')).toBeChecked();

            rerender(<Checkbox checked={false} readOnly />);
            expect(screen.getByRole('checkbox')).not.toBeChecked();
        });
    });

    describe('accessibility', () => {
        it('sets aria-invalid when error is provided', () => {
            render(<Checkbox error="Error message" />);
            expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
        });

        it('maintains association between label and input', () => {
            render(<Checkbox label="Test Label" />);
            const checkbox = screen.getByLabelText('Test Label');
            expect(checkbox).toHaveAttribute('type', 'checkbox');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Checkbox className="custom-class" />);
            expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Checkbox
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                />
            );

            const checkbox = screen.getByRole('checkbox');
            const computedStyle = window.getComputedStyle(checkbox);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Checkbox
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