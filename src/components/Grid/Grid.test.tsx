import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Grid} from './Grid';

describe('Grid', () => {
    it('renders with default props', () => {
        render(<Grid data-testid="grid">Test Grid</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toBeInTheDocument();
        expect(grid).toHaveClass('grid', 'grid-cols-1', 'gap-4');
    });

    describe('columns', () => {
        const columns = {
            1: 'grid-cols-1',
            2: 'grid-cols-2',
            3: 'grid-cols-3',
            4: 'grid-cols-4',
            5: 'grid-cols-5',
            6: 'grid-cols-6',
            7: 'grid-cols-7',
            8: 'grid-cols-8',
            9: 'grid-cols-9',
            10: 'grid-cols-10',
            11: 'grid-cols-11',
            12: 'grid-cols-12'
        } as const;

        Object.entries(columns).forEach(([cols, expectedClass]) => {
            it(`renders ${cols} columns correctly`, () => {
                render(<Grid cols={Number(cols) as keyof typeof columns} data-testid="grid">Grid</Grid>);
                expect(screen.getByTestId('grid')).toHaveClass(expectedClass);
            });
        });
    });

    describe('rows', () => {
        const rows = {
            1: 'grid-rows-1',
            2: 'grid-rows-2',
            3: 'grid-rows-3',
            4: 'grid-rows-4',
            5: 'grid-rows-5',
            6: 'grid-rows-6'
        } as const;

        Object.entries(rows).forEach(([row, expectedClass]) => {
            it(`renders ${row} rows correctly`, () => {
                render(<Grid rows={Number(row) as 1 | 2 | 3 | 4 | 5 | 6} data-testid="grid">Grid</Grid>);
                expect(screen.getByTestId('grid')).toHaveClass(expectedClass);
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
                render(<Grid gap={Number(gap) as keyof typeof gaps} data-testid="grid">Grid</Grid>);
                expect(screen.getByTestId('grid')).toHaveClass(expectedClass);
            });
        });
    });

    describe('row gap', () => {
        const rowGaps = {
            0: 'row-gap-0',
            1: 'row-gap-1',
            2: 'row-gap-2',
            3: 'row-gap-3',
            4: 'row-gap-4',
            5: 'row-gap-5',
            6: 'row-gap-6',
            8: 'row-gap-8',
            10: 'row-gap-10',
            12: 'row-gap-12',
            16: 'row-gap-16'
        } as const;

        Object.entries(rowGaps).forEach(([rowGap, expectedClass]) => {
            it(`renders ${rowGap} row gap correctly`, () => {
                render(<Grid rowGap={Number(rowGap) as keyof typeof rowGaps} data-testid="grid">Grid</Grid>);
                expect(screen.getByTestId('grid')).toHaveClass(expectedClass);
            });
        });
    });

    describe('column gap', () => {
        const colGaps = {
            0: 'col-gap-0',
            1: 'col-gap-1',
            2: 'col-gap-2',
            3: 'col-gap-3',
            4: 'col-gap-4',
            5: 'col-gap-5',
            6: 'col-gap-6',
            8: 'col-gap-8',
            10: 'col-gap-10',
            12: 'col-gap-12',
            16: 'col-gap-16'
        } as const;

        Object.entries(colGaps).forEach(([colGap, expectedClass]) => {
            it(`renders ${colGap} column gap correctly`, () => {
                render(<Grid colGap={Number(colGap) as keyof typeof colGaps} data-testid="grid">Grid</Grid>);
                expect(screen.getByTestId('grid')).toHaveClass(expectedClass);
            });
        });
    });

    describe('flow', () => {
        const flows = {
            row: 'grid-flow-row',
            col: 'grid-flow-col',
            dense: 'grid-flow-dense',
            'row-dense': 'grid-flow-row-dense',
            'col-dense': 'grid-flow-col-dense'
        } as const;

        Object.entries(flows).forEach(([flow, expectedClass]) => {
            it(`renders ${flow} flow correctly`, () => {
                render(<Grid flow={flow as keyof typeof flows} data-testid="grid">Grid</Grid>);
                expect(screen.getByTestId('grid')).toHaveClass(expectedClass);
            });
        });
    });

    describe('auto rows', () => {
        const autoRows = {
            auto: 'auto-rows-auto',
            min: 'auto-rows-min',
            max: 'auto-rows-max',
            fr: 'auto-rows-fr'
        } as const;

        Object.entries(autoRows).forEach(([autoRow, expectedClass]) => {
            it(`renders ${autoRow} auto rows correctly`, () => {
                render(<Grid autoRows={autoRow as keyof typeof autoRows} data-testid="grid">Grid</Grid>);
                expect(screen.getByTestId('grid')).toHaveClass(expectedClass);
            });
        });
    });

    describe('auto columns', () => {
        const autoCols = {
            auto: 'auto-cols-auto',
            min: 'auto-cols-min',
            max: 'auto-cols-max',
            fr: 'auto-cols-fr'
        } as const;

        Object.entries(autoCols).forEach(([autoCol, expectedClass]) => {
            it(`renders ${autoCol} auto columns correctly`, () => {
                render(<Grid autoCols={autoCol as keyof typeof autoCols} data-testid="grid">Grid</Grid>);
                expect(screen.getByTestId('grid')).toHaveClass(expectedClass);
            });
        });
    });

    describe('responsive', () => {
        it('applies responsive classes when responsive is true', () => {
            render(<Grid responsive data-testid="grid">Responsive Grid</Grid>);
            const grid = screen.getByTestId('grid');
            expect(grid).toHaveClass(
                'sm:grid-cols-2',
                'md:grid-cols-3',
                'lg:grid-cols-4',
                'xl:grid-cols-5',
                '2xl:grid-cols-6'
            );
        });

        it('does not apply responsive classes when responsive is false', () => {
            render(<Grid responsive={false} data-testid="grid">Non-responsive Grid</Grid>);
            const grid = screen.getByTestId('grid');
            expect(grid).not.toHaveClass(
                'sm:grid-cols-2',
                'md:grid-cols-3',
                'lg:grid-cols-4',
                'xl:grid-cols-5',
                '2xl:grid-cols-6'
            );
        });
    });

    describe('as prop', () => {
        it('renders as a different HTML element', () => {
            render(<Grid as="section" data-testid="grid">Grid as section</Grid>);
            const grid = screen.getByTestId('grid');
            expect(grid.tagName.toLowerCase()).toBe('section');
        });

        it('renders as div by default', () => {
            render(<Grid data-testid="grid">Default Grid</Grid>);
            const grid = screen.getByTestId('grid');
            expect(grid.tagName.toLowerCase()).toBe('div');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Grid className="custom-class" data-testid="grid">Grid</Grid>);
            expect(screen.getByTestId('grid')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Grid
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="grid"
                >
                    Styled Grid
                </Grid>
            );

            const grid = screen.getByTestId('grid');
            const computedStyle = window.getComputedStyle(grid);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Grid
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                    data-testid="grid"
                >
                    Hover Grid
                </Grid>
            );

            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
}); 