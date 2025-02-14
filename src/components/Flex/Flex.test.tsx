import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Flex} from './Flex';

describe('Flex', () => {
    it('renders with default props', () => {
        render(<Flex data-testid="flex">Test Flex</Flex>);
        const flex = screen.getByTestId('flex');
        expect(flex).toBeInTheDocument();
        expect(flex).toHaveClass('flex', 'flex-row', 'flex-nowrap', 'justify-start', 'items-stretch', 'gap-0');
    });

    describe('direction', () => {
        const directions = {
            row: 'flex-row',
            'row-reverse': 'flex-row-reverse',
            column: 'flex-col',
            'column-reverse': 'flex-col-reverse'
        } as const;

        Object.entries(directions).forEach(([direction, expectedClass]) => {
            it(`renders ${direction} direction correctly`, () => {
                render(<Flex direction={direction as keyof typeof directions} data-testid="flex">Flex</Flex>);
                expect(screen.getByTestId('flex')).toHaveClass(expectedClass);
            });
        });
    });

    describe('wrap', () => {
        const wraps = {
            nowrap: 'flex-nowrap',
            wrap: 'flex-wrap',
            'wrap-reverse': 'flex-wrap-reverse'
        } as const;

        Object.entries(wraps).forEach(([wrap, expectedClass]) => {
            it(`renders ${wrap} wrap correctly`, () => {
                render(<Flex wrap={wrap as keyof typeof wraps} data-testid="flex">Flex</Flex>);
                expect(screen.getByTestId('flex')).toHaveClass(expectedClass);
            });
        });
    });

    describe('justify', () => {
        const justifyValues = {
            start: 'justify-start',
            end: 'justify-end',
            center: 'justify-center',
            between: 'justify-between',
            around: 'justify-around',
            evenly: 'justify-evenly'
        } as const;

        Object.entries(justifyValues).forEach(([justify, expectedClass]) => {
            it(`renders ${justify} justify correctly`, () => {
                render(<Flex justify={justify as keyof typeof justifyValues} data-testid="flex">Flex</Flex>);
                expect(screen.getByTestId('flex')).toHaveClass(expectedClass);
            });
        });
    });

    describe('align', () => {
        const alignValues = {
            start: 'items-start',
            end: 'items-end',
            center: 'items-center',
            baseline: 'items-baseline',
            stretch: 'items-stretch'
        } as const;

        Object.entries(alignValues).forEach(([align, expectedClass]) => {
            it(`renders ${align} align correctly`, () => {
                render(<Flex align={align as keyof typeof alignValues} data-testid="flex">Flex</Flex>);
                expect(screen.getByTestId('flex')).toHaveClass(expectedClass);
            });
        });
    });

    describe('gap', () => {
        const gaps = {
            0: 'gap-0',
            1: 'gap-1',
            2: 'gap-2',
            3: 'gap-3',
            4: 'gap-4',
            5: 'gap-5',
            6: 'gap-6',
            8: 'gap-8',
            10: 'gap-10',
            12: 'gap-12',
            16: 'gap-16'
        } as const;

        Object.entries(gaps).forEach(([gap, expectedClass]) => {
            it(`renders ${gap} gap correctly`, () => {
                render(<Flex gap={Number(gap) as keyof typeof gaps} data-testid="flex">Flex</Flex>);
                expect(screen.getByTestId('flex')).toHaveClass(expectedClass);
            });
        });
    });

    describe('inline', () => {
        it('renders as inline-flex when inline is true', () => {
            render(<Flex inline data-testid="flex">Flex</Flex>);
            expect(screen.getByTestId('flex')).toHaveClass('inline-flex');
        });

        it('renders as flex when inline is false', () => {
            render(<Flex inline={false} data-testid="flex">Flex</Flex>);
            expect(screen.getByTestId('flex')).toHaveClass('flex');
            expect(screen.getByTestId('flex')).not.toHaveClass('inline-flex');
        });
    });

    describe('as prop', () => {
        it('renders as a different HTML element', () => {
            render(<Flex as="section" data-testid="flex">Flex as section</Flex>);
            const flex = screen.getByTestId('flex');
            expect(flex.tagName.toLowerCase()).toBe('section');
        });

        it('renders as div by default', () => {
            render(<Flex data-testid="flex">Default Flex</Flex>);
            const flex = screen.getByTestId('flex');
            expect(flex.tagName.toLowerCase()).toBe('div');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Flex className="custom-class" data-testid="flex">Flex</Flex>);
            expect(screen.getByTestId('flex')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Flex
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="flex"
                >
                    Styled Flex
                </Flex>
            );

            const flex = screen.getByTestId('flex');
            const computedStyle = window.getComputedStyle(flex);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Flex
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                    data-testid="flex"
                >
                    Hover Flex
                </Flex>
            );

            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
}); 