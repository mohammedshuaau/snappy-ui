import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Card, CardImage} from './Card';

describe('Card', () => {
    it('renders with default props', () => {
        render(<Card data-testid="card">Test Card</Card>);
        const card = screen.getByTestId('card');
        expect(card).toBeInTheDocument();
        expect(card).toHaveClass('bg-white', 'p-4', 'rounded-lg');
    });

    describe('variants', () => {
        const variants = {
            flat: 'border-transparent shadow-sm',
            outlined: 'border border-slate-200',
            elevated: 'border-transparent shadow-md'
        } as const;

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Card variant={variant as keyof typeof variants} data-testid="card">Card</Card>);
                expect(screen.getByTestId('card')).toHaveClass(expectedClass);
            });
        });
    });

    describe('padding', () => {
        const paddings = {
            none: 'p-0',
            sm: 'p-3',
            md: 'p-4',
            lg: 'p-6'
        } as const;

        Object.entries(paddings).forEach(([size, expectedClass]) => {
            it(`applies ${size} padding correctly`, () => {
                render(<Card padding={size as keyof typeof paddings} data-testid="card">Card</Card>);
                expect(screen.getByTestId('card')).toHaveClass(expectedClass);
            });
        });
    });

    describe('radius', () => {
        const radiuses = {
            none: 'rounded-none',
            sm: 'rounded',
            md: 'rounded-lg',
            lg: 'rounded-xl'
        } as const;

        Object.entries(radiuses).forEach(([size, expectedClass]) => {
            it(`applies ${size} radius correctly`, () => {
                render(<Card radius={size as keyof typeof radiuses} data-testid="card">Card</Card>);
                expect(screen.getByTestId('card')).toHaveClass(expectedClass);
            });
        });
    });

    describe('interactive states', () => {
        it('applies hoverable styles when isHoverable is true', () => {
            render(<Card isHoverable data-testid="card">Hoverable Card</Card>);
            const card = screen.getByTestId('card');
            expect(card).toHaveClass('hover:shadow-lg', 'hover:-translate-y-0.5');
        });

        it('applies clickable styles when isClickable is true', () => {
            render(<Card isClickable data-testid="card">Clickable Card</Card>);
            const card = screen.getByTestId('card');
            expect(card).toHaveClass('cursor-pointer', 'active:scale-[0.98]');
        });

        it('handles click events', () => {
            const onClick = vi.fn();
            render(
                <Card isClickable onClick={onClick} data-testid="card">
                    Clickable Card
                </Card>
            );

            fireEvent.click(screen.getByTestId('card'));
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Card className="custom-class" data-testid="card">Card</Card>);
            expect(screen.getByTestId('card')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Card
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="card"
                >
                    Styled Card
                </Card>
            );

            const card = screen.getByTestId('card');
            const computedStyle = window.getComputedStyle(card);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Card
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                    data-testid="card"
                >
                    Hover Card
                </Card>
            );

            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
});

describe('CardImage', () => {
    const imgSrc = 'test-image.jpg';
    const imgAlt = 'Test Image';

    it('renders with default props', () => {
        render(<CardImage src={imgSrc} alt={imgAlt} data-testid="card-image" />);
        const img = screen.getByTestId('card-image');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', imgSrc);
        expect(img).toHaveAttribute('alt', imgAlt);
    });

    describe('aspect ratios', () => {
        const aspectRatios = {
            auto: '',
            square: 'aspect-square',
            video: 'aspect-video'
        } as const;

        Object.entries(aspectRatios).forEach(([ratio, expectedClass]) => {
            it(`applies ${ratio} aspect ratio correctly`, () => {
                render(
                    <CardImage
                        src={imgSrc}
                        alt={imgAlt}
                        aspectRatio={ratio as keyof typeof aspectRatios}
                        data-testid="image-wrapper"
                    />
                );
                if (expectedClass) {
                    expect(screen.getByTestId('image-wrapper').parentElement).toHaveClass(expectedClass);
                }
            });
        });
    });

    describe('radius', () => {
        const radiuses = {
            none: 'rounded-none',
            sm: 'rounded',
            md: 'rounded-lg',
            lg: 'rounded-xl'
        } as const;

        Object.entries(radiuses).forEach(([size, expectedClass]) => {
            it(`applies ${size} radius correctly`, () => {
                render(
                    <CardImage
                        src={imgSrc}
                        alt={imgAlt}
                        radius={size as keyof typeof radiuses}
                        data-testid="image-wrapper"
                    />
                );
                expect(screen.getByTestId('image-wrapper').parentElement).toHaveClass(expectedClass);
            });
        });
    });

    it('renders overlay when provided', () => {
        const overlay = <div data-testid="overlay">Overlay Content</div>;
        render(<CardImage src={imgSrc} alt={imgAlt} overlay={overlay} />);
        expect(screen.getByTestId('overlay')).toBeInTheDocument();
        expect(screen.getByTestId('overlay').parentElement).toHaveClass('absolute', 'inset-0');
    });

    it('applies custom className', () => {
        render(
            <CardImage
                src={imgSrc}
                alt={imgAlt}
                className="custom-class"
                data-testid="image-wrapper"
            />
        );
        expect(screen.getByTestId('image-wrapper').parentElement).toHaveClass('custom-class');
    });
}); 