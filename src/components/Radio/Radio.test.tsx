import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Radio} from './Radio';

describe('Radio', () => {
    it('renders with default props', () => {
        render(<Radio />);
        const radio = screen.getByRole('radio');
        expect(radio).toBeInTheDocument();
        expect(radio).toHaveClass('peer', 'h-4', 'w-4');
    });

    describe('variants', () => {
        it('renders default variant correctly', () => {
            render(<Radio variant="default" />);
            expect(screen.getByRole('radio')).toHaveClass('border-slate-300', 'bg-white');
        });

        it('renders error variant correctly', () => {
            render(<Radio variant="error" />);
            expect(screen.getByRole('radio')).toHaveClass('border-red-300', 'bg-white');
        });

        it('applies error variant when error prop is provided', () => {
            render(<Radio error="Error message" />);
            expect(screen.getByRole('radio')).toHaveClass('border-red-300');
            expect(screen.getByText('Error message')).toBeInTheDocument();
        });
    });

    describe('label and description', () => {
        it('renders label correctly', () => {
            render(<Radio label="Test Label" />);
            expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
        });

        it('renders description correctly', () => {
            render(<Radio description="Test Description" />);
            expect(screen.getByText('Test Description')).toBeInTheDocument();
        });

        it('renders required indicator when required prop is true', () => {
            render(<Radio label="Required Field" required />);
            expect(screen.getByText('*')).toBeInTheDocument();
            expect(screen.getByRole('radio')).toHaveAttribute('aria-required', 'true');
        });
    });

    describe('disabled state', () => {
        it('applies disabled styles correctly', () => {
            render(<Radio disabled label="Disabled Radio" />);
            const radio = screen.getByRole('radio');
            const label = screen.getByText('Disabled Radio');

            expect(radio).toBeDisabled();
            expect(radio).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
            expect(label).toHaveClass('opacity-50', 'cursor-not-allowed');
        });
    });

    describe('interaction', () => {
        it('handles change events', () => {
            const onChange = vi.fn();
            render(<Radio onChange={onChange} />);

            fireEvent.click(screen.getByRole('radio'));
            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it('updates checked state correctly', () => {
            render(<Radio />);
            const radio = screen.getByRole('radio');

            expect(radio).not.toBeChecked();
            fireEvent.click(radio);
            expect(radio).toBeChecked();
        });

        it('maintains controlled checked state', () => {
            const { rerender } = render(<Radio checked={true} readOnly />);
            expect(screen.getByRole('radio')).toBeChecked();

            rerender(<Radio checked={false} readOnly />);
            expect(screen.getByRole('radio')).not.toBeChecked();
        });
    });

    describe('accessibility', () => {
        it('sets aria-invalid when error is provided', () => {
            render(<Radio error="Error message" />);
            expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
        });

        it('maintains association between label and input', () => {
            render(<Radio label="Test Label" />);
            const radio = screen.getByLabelText('Test Label');
            expect(radio).toHaveAttribute('type', 'radio');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Radio className="custom-class" />);
            expect(screen.getByRole('radio')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Radio
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                />
            );

            const radio = screen.getByRole('radio');
            const computedStyle = window.getComputedStyle(radio);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Radio
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