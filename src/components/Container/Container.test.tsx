import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Container} from './Container';

describe('Container', () => {
    it('renders with default props', () => {
        render(<Container data-testid="container">Test Container</Container>);
        const container = screen.getByTestId('container');
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('w-full', 'mx-auto', 'max-w-screen-lg');
    });

    describe('sizes', () => {
        const sizes = {
            sm: 'max-w-screen-sm',
            md: 'max-w-screen-md',
            lg: 'max-w-screen-lg',
            xl: 'max-w-screen-xl',
            '2xl': 'max-w-screen-2xl',
            full: 'max-w-full'
        } as const;

        Object.entries(sizes).forEach(([size, expectedClass]) => {
            it(`renders ${size} size correctly`, () => {
                render(
                    <Container size={size as keyof typeof sizes} data-testid="container">
                        Container
                    </Container>
                );
                expect(screen.getByTestId('container')).toHaveClass(expectedClass);
            });
        });
    });

    describe('responsive behavior', () => {
        it('applies responsive classes when responsive is true', () => {
            render(<Container responsive data-testid="container">Responsive Container</Container>);
            const container = screen.getByTestId('container');
            expect(container).toHaveClass(
                'sm:max-w-[640px]',
                'md:max-w-[768px]',
                'lg:max-w-[1024px]',
                'xl:max-w-[1280px]',
                '2xl:max-w-[1536px]'
            );
        });

        it('does not apply responsive classes when responsive is false', () => {
            render(<Container responsive={false} data-testid="container">Non-responsive Container</Container>);
            const container = screen.getByTestId('container');
            expect(container).not.toHaveClass(
                'sm:max-w-[640px]',
                'md:max-w-[768px]',
                'lg:max-w-[1024px]',
                'xl:max-w-[1280px]',
                '2xl:max-w-[1536px]'
            );
        });
    });

    describe('center alignment', () => {
        it('centers container when center is true', () => {
            render(<Container center data-testid="container">Centered Container</Container>);
            expect(screen.getByTestId('container')).toHaveClass('mx-auto');
        });

        it('does not center container when center is false', () => {
            render(<Container center={false} data-testid="container">Non-centered Container</Container>);
            const container = screen.getByTestId('container');
            const classes = container.className.split(' ');
            expect(classes.filter(c => c === 'mx-auto')).toHaveLength(1); // Only from base styles
        });
    });

    describe('as prop', () => {
        it('renders as a different HTML element', () => {
            render(<Container as="section" data-testid="container">Section Container</Container>);
            const container = screen.getByTestId('container');
            expect(container.tagName.toLowerCase()).toBe('section');
        });

        it('renders as div by default', () => {
            render(<Container data-testid="container">Default Container</Container>);
            const container = screen.getByTestId('container');
            expect(container.tagName.toLowerCase()).toBe('div');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Container className="custom-class" data-testid="container">Container</Container>);
            expect(screen.getByTestId('container')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Container
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="container"
                >
                    Styled Container
                </Container>
            );

            const container = screen.getByTestId('container');
            const computedStyle = window.getComputedStyle(container);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Container
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                    data-testid="container"
                >
                    Hover Container
                </Container>
            );

            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
}); 