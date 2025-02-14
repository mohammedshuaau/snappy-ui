import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Alert} from './Alert';

describe('Alert', () => {
    it('renders with default props', () => {
        render(<Alert>Test alert</Alert>);
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent('Test alert');
        expect(alert).toHaveClass('bg-blue-50'); // Default variant is info
    });

    describe('variants', () => {
        const variants = {
            info: 'bg-blue-50',
            success: 'bg-green-50',
            warning: 'bg-yellow-50',
            error: 'bg-red-50'
        } as const;

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Alert variant={variant as keyof typeof variants}>Alert content</Alert>);
                expect(screen.getByRole('alert')).toHaveClass(expectedClass);
            });
        });
    });

    it('renders with title', () => {
        render(
            <Alert title="Alert Title">
                Alert content
            </Alert>
        );
        expect(screen.getByText('Alert Title')).toBeInTheDocument();
        expect(screen.getByText('Alert content')).toBeInTheDocument();
    });

    it('renders with custom icon', () => {
        const customIcon = <span data-testid="custom-icon">🔔</span>;
        render(
            <Alert icon={customIcon}>
                Alert with custom icon
            </Alert>
        );
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    describe('dismissible behavior', () => {
        it('renders dismiss button when dismissible is true', () => {
            render(
                <Alert dismissible>
                    Dismissible alert
                </Alert>
            );
            expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
        });

        it('calls onDismiss when dismiss button is clicked', () => {
            const onDismiss = vi.fn();
            render(
                <Alert dismissible onDismiss={onDismiss}>
                    Dismissible alert
                </Alert>
            );

            fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
            expect(onDismiss).toHaveBeenCalledTimes(1);
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(
                <Alert className="custom-class">
                    Alert content
                </Alert>
            );
            expect(screen.getByRole('alert')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Alert
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                >
                    Styled alert
                </Alert>
            );

            const alert = screen.getByRole('alert');
            const computedStyle = window.getComputedStyle(alert);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
}); 