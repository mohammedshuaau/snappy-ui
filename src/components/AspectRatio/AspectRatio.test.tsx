import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {AspectRatio} from './AspectRatio';

describe('AspectRatio', () => {
    it('renders with default props', () => {
        render(
            <AspectRatio data-testid="aspect-ratio">
                <div>Content</div>
            </AspectRatio>
        );
        const container = screen.getByTestId('aspect-ratio');
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('relative', 'w-full', 'aspect-square');
    });

    describe('ratios', () => {
        const ratios = {
            '1/1': 'aspect-square',
            '4/3': 'aspect-[4/3]',
            '16/9': 'aspect-video',
            '21/9': 'aspect-[21/9]',
            '3/4': 'aspect-[3/4]',
            '9/16': 'aspect-[9/16]'
        } as const;

        Object.entries(ratios).forEach(([ratio, expectedClass]) => {
            it(`renders ${ratio} ratio correctly`, () => {
                render(
                    <AspectRatio ratio={ratio as keyof typeof ratios} data-testid="aspect-ratio">
                        <div>Content</div>
                    </AspectRatio>
                );
                expect(screen.getByTestId('aspect-ratio')).toHaveClass(expectedClass);
            });
        });
    });

    describe('rounded corners', () => {
        const roundedValues = {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            '2xl': 'rounded-2xl',
            '3xl': 'rounded-3xl',
            full: 'rounded-full'
        } as const;

        Object.entries(roundedValues).forEach(([rounded, expectedClass]) => {
            it(`renders ${rounded} rounded corners correctly`, () => {
                render(
                    <AspectRatio rounded={rounded as keyof typeof roundedValues} data-testid="aspect-ratio">
                        <div>Content</div>
                    </AspectRatio>
                );
                expect(screen.getByTestId('aspect-ratio')).toHaveClass(expectedClass);
            });
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(
                <AspectRatio className="custom-class" data-testid="aspect-ratio">
                    <div>Content</div>
                </AspectRatio>
            );
            expect(screen.getByTestId('aspect-ratio')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <AspectRatio
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="aspect-ratio"
                >
                    <div>Content</div>
                </AspectRatio>
            );

            const container = screen.getByTestId('aspect-ratio');
            const computedStyle = window.getComputedStyle(container);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });

    it('renders children in absolute positioned container', () => {
        render(
            <AspectRatio data-testid="aspect-ratio">
                <div data-testid="content">Content</div>
            </AspectRatio>
        );

        const content = screen.getByTestId('content').parentElement;
        expect(content).toHaveClass('absolute', 'inset-0');
    });
});