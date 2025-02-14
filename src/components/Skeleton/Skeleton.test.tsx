import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Skeleton, SkeletonCircle, SkeletonRectangle, SkeletonText} from './Skeleton';

describe('Skeleton', () => {
    it('renders with default props', () => {
        render(<Skeleton data-testid="skeleton" />);
        const skeleton = screen.getByTestId('skeleton');
        expect(skeleton).toBeInTheDocument();
        expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200');
    });

    describe('variants', () => {
        const variants = {
            default: 'rounded-md',
            circular: 'rounded-full',
            rectangular: 'rounded-none'
        } as const;

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Skeleton variant={variant as keyof typeof variants} data-testid="skeleton" />);
                expect(screen.getByTestId('skeleton')).toHaveClass(expectedClass);
            });
        });
    });

    describe('animations', () => {
        const animations = {
            pulse: 'animate-pulse',
            wave: 'animate-skeleton-wave',
            none: ''
        } as const;

        Object.entries(animations).forEach(([animation, expectedClass]) => {
            it(`renders ${animation} animation correctly`, () => {
                render(<Skeleton animation={animation as keyof typeof animations} data-testid="skeleton" />);
                const skeleton = screen.getByTestId('skeleton');
                if (expectedClass) {
                    expect(skeleton).toHaveClass(expectedClass);
                } else {
                    expect(skeleton).not.toHaveClass('animate-pulse', 'animate-skeleton-wave');
                }
            });
        });
    });

    describe('dimensions', () => {
        it('applies width correctly', () => {
            render(<Skeleton width={200} data-testid="skeleton" />);
            expect(screen.getByTestId('skeleton')).toHaveStyle({ width: '200px' });
        });

        it('applies height correctly', () => {
            render(<Skeleton height={100} data-testid="skeleton" />);
            expect(screen.getByTestId('skeleton')).toHaveStyle({ height: '100px' });
        });

        it('handles string dimensions', () => {
            render(<Skeleton width="50%" height="10rem" data-testid="skeleton" />);
            const skeleton = screen.getByTestId('skeleton');
            expect(skeleton).toHaveStyle({ width: '50%', height: '10rem' });
        });
    });

    describe('compound components', () => {
        describe('SkeletonText', () => {
            it('renders with correct default height', () => {
                render(<SkeletonText data-testid="skeleton-text" />);
                expect(screen.getByTestId('skeleton-text')).toHaveStyle({ height: '16px' });
            });

            it('allows width customization', () => {
                render(<SkeletonText width={300} data-testid="skeleton-text" />);
                expect(screen.getByTestId('skeleton-text')).toHaveStyle({ width: '300px' });
            });
        });

        describe('SkeletonCircle', () => {
            it('renders with circular variant', () => {
                render(<SkeletonCircle data-testid="skeleton-circle" />);
                expect(screen.getByTestId('skeleton-circle')).toHaveClass('rounded-full');
            });

            it('allows dimension customization', () => {
                render(
                    <SkeletonCircle
                        width={50}
                        height={50}
                        data-testid="skeleton-circle"
                    />
                );
                const circle = screen.getByTestId('skeleton-circle');
                expect(circle).toHaveStyle({ width: '50px', height: '50px' });
            });
        });

        describe('SkeletonRectangle', () => {
            it('renders with rectangular variant', () => {
                render(<SkeletonRectangle data-testid="skeleton-rectangle" />);
                expect(screen.getByTestId('skeleton-rectangle')).toHaveClass('rounded-none');
            });

            it('allows dimension customization', () => {
                render(
                    <SkeletonRectangle
                        width={200}
                        height={100}
                        data-testid="skeleton-rectangle"
                    />
                );
                const rectangle = screen.getByTestId('skeleton-rectangle');
                expect(rectangle).toHaveStyle({ width: '200px', height: '100px' });
            });
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Skeleton className="custom-class" data-testid="skeleton" />);
            expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Skeleton
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        borderRadius: '8px'
                    }}
                    data-testid="skeleton"
                />
            );

            const skeleton = screen.getByTestId('skeleton');
            const computedStyle = window.getComputedStyle(skeleton);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.borderRadius).toBe('8px');
        });

        it('applies animation styles correctly', () => {
            render(
                <Skeleton
                    animation="wave"
                    data-testid="skeleton"
                />
            );

            const skeleton = screen.getByTestId('skeleton');
            expect(skeleton).toHaveClass('animate-skeleton-wave');
        });
    });
}); 