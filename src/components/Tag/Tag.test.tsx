import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Tag} from './Tag';

describe('Tag', () => {
    it('renders with default props', () => {
        render(<Tag>Test Tag</Tag>);
        expect(screen.getByText('Test Tag')).toBeInTheDocument();
    });

    it('applies variant styles correctly', () => {
        const { rerender } = render(<Tag variant="primary">Primary Tag</Tag>);
        expect(screen.getByText('Primary Tag').parentElement).toHaveClass('bg-primary-100');

        rerender(<Tag variant="success">Success Tag</Tag>);
        expect(screen.getByText('Success Tag').parentElement).toHaveClass('bg-success-100');

        rerender(<Tag variant="error">Error Tag</Tag>);
        expect(screen.getByText('Error Tag').parentElement).toHaveClass('bg-error-100');
    });

    it('renders with different sizes', () => {
        const { rerender } = render(<Tag size="sm">Small Tag</Tag>);
        expect(screen.getByText('Small Tag').parentElement).toHaveClass('text-xs');

        rerender(<Tag size="lg">Large Tag</Tag>);
        expect(screen.getByText('Large Tag').parentElement).toHaveClass('text-base');
    });

    it('renders with rounded style when rounded prop is true', () => {
        render(<Tag rounded>Rounded Tag</Tag>);
        expect(screen.getByText('Rounded Tag').parentElement).toHaveClass('rounded-full');
    });

    it('renders with left icon', () => {
        const leftIcon = <span data-testid="left-icon">🏷️</span>;
        render(<Tag leftIcon={leftIcon}>Tag with Left Icon</Tag>);
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
        const rightIcon = <span data-testid="right-icon">🏷️</span>;
        render(<Tag rightIcon={rightIcon}>Tag with Right Icon</Tag>);
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('handles close button click', () => {
        const onClose = vi.fn();
        render(<Tag onClose={onClose}>Closable Tag</Tag>);

        const closeButton = screen.getByRole('button', { name: /remove tag/i });
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('renders with custom close icon', () => {
        const customCloseIcon = <span data-testid="custom-close">×</span>;
        render(<Tag onClose={() => { }} closeIcon={customCloseIcon}>Custom Close Icon</Tag>);
        expect(screen.getByTestId('custom-close')).toBeInTheDocument();
    });
}); 