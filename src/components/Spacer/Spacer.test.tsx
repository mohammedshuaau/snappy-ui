import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Spacer} from './Spacer';

describe('Spacer', () => {
    it('renders with default props', () => {
        render(<Spacer data-testid="spacer" />);
        const spacer = screen.getByTestId('spacer');
        expect(spacer).toBeInTheDocument();
        expect(spacer).toHaveClass('block', 'transition-all');
    });

    describe('sizes', () => {
        const testSizes = [
            { size: 1, classes: ['h-1', 'w-1'] },
            { size: 2, classes: ['h-2', 'w-2'] },
            { size: 3, classes: ['h-3', 'w-3'] },
            { size: 4, classes: ['h-4', 'w-4'] },
            { size: 5, classes: ['h-5', 'w-5'] },
            { size: 6, classes: ['h-6', 'w-6'] },
            { size: 8, classes: ['h-8', 'w-8'] },
            { size: 10, classes: ['h-10', 'w-10'] },
            { size: 12, classes: ['h-12', 'w-12'] },
            { size: 16, classes: ['h-16', 'w-16'] }
        ] as const;

        testSizes.forEach(({ size, classes }) => {
            it(`renders size ${size} correctly`, () => {
                render(<Spacer size={size} data-testid="spacer" />);
                const spacer = screen.getByTestId('spacer');
                classes.forEach(className => {
                    expect(spacer).toHaveClass(className);
                });
            });
        });
    });

    describe('axis', () => {
        it('renders both axis by default', () => {
            render(<Spacer data-testid="spacer" />);
            const spacer = screen.getByTestId('spacer');
            expect(spacer).not.toHaveClass('h-0', 'w-0');
        });

        it('renders x axis correctly', () => {
            render(<Spacer axis="x" data-testid="spacer" />);
            const spacer = screen.getByTestId('spacer');
            expect(spacer).toHaveClass('h-0');
            expect(spacer).not.toHaveClass('w-0');
        });

        it('renders y axis correctly', () => {
            render(<Spacer axis="y" data-testid="spacer" />);
            const spacer = screen.getByTestId('spacer');
            expect(spacer).toHaveClass('w-0');
            expect(spacer).not.toHaveClass('h-0');
        });
    });

    describe('grow', () => {
        it('applies flex-grow when grow is true', () => {
            render(<Spacer grow data-testid="spacer" />);
            expect(screen.getByTestId('spacer')).toHaveClass('flex-grow');
        });

        it('does not apply flex-grow when grow is false', () => {
            render(<Spacer data-testid="spacer" />);
            expect(screen.getByTestId('spacer')).not.toHaveClass('flex-grow');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Spacer className="custom-class" data-testid="spacer" />);
            expect(screen.getByTestId('spacer')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Spacer
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="spacer"
                />
            );

            const spacer = screen.getByTestId('spacer');
            const computedStyle = window.getComputedStyle(spacer);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
});
