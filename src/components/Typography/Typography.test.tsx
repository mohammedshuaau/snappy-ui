import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Typography} from './Typography';

describe('Typography', () => {
    const baseClasses = ['text-slate-900', 'dark:text-slate-100'];

    it('renders with default props', () => {
        render(<Typography>Test Text</Typography>);
        const text = screen.getByText('Test Text');
        expect(text).toBeInTheDocument();
        expect(text).toHaveClass(...baseClasses, 'text-base', 'font-normal', 'text-left');
    });

    describe('variants', () => {
        it('renders h1 variant correctly', () => {
            render(<Typography variant="h1">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses, 'scroll-m-20', 'tracking-tight', 'lg:text-5xl');
            expect(text.tagName.toLowerCase()).toBe('h1');
        });

        it('renders h2 variant correctly', () => {
            render(<Typography variant="h2">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses, 'scroll-m-20', 'tracking-tight');
            expect(text.tagName.toLowerCase()).toBe('h2');
        });

        it('renders h3 variant correctly', () => {
            render(<Typography variant="h3">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses, 'scroll-m-20', 'tracking-tight');
            expect(text.tagName.toLowerCase()).toBe('h3');
        });

        it('renders h4 variant correctly', () => {
            render(<Typography variant="h4">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses, 'scroll-m-20', 'tracking-tight');
            expect(text.tagName.toLowerCase()).toBe('h4');
        });

        it('renders h5 variant correctly', () => {
            render(<Typography variant="h5">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses, 'scroll-m-20', 'tracking-tight');
            expect(text.tagName.toLowerCase()).toBe('h5');
        });

        it('renders h6 variant correctly', () => {
            render(<Typography variant="h6">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses, 'scroll-m-20', 'tracking-tight');
            expect(text.tagName.toLowerCase()).toBe('h6');
        });

        it('renders p variant correctly', () => {
            render(<Typography variant="p">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses);
            expect(text.tagName.toLowerCase()).toBe('p');
        });

        it('renders blockquote variant correctly', () => {
            render(<Typography variant="blockquote">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses, 'mt-6', 'border-l-2', 'border-slate-300', 'pl-6', 'italic', 'dark:border-slate-700');
            expect(text.tagName.toLowerCase()).toBe('blockquote');
        });

        it('renders code variant correctly', () => {
            render(<Typography variant="code">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(
                ...baseClasses,
                'relative',
                'rounded',
                'bg-slate-100',
                'px-[0.3rem]',
                'py-[0.2rem]',
                'font-mono',
                'dark:bg-slate-800'
            );
            expect(text.tagName.toLowerCase()).toBe('code');
        });

        it('renders lead variant correctly', () => {
            render(<Typography as="p" variant="lead">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass('text-slate-700', 'dark:text-slate-400');
            expect(text.tagName.toLowerCase()).toBe('p');
        });

        it('renders large variant correctly', () => {
            render(<Typography as="p" variant="large">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses);
            expect(text.tagName.toLowerCase()).toBe('p');
        });

        it('renders small variant correctly', () => {
            render(<Typography as="p" variant="small">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses);
            expect(text.tagName.toLowerCase()).toBe('p');
        });

        it('renders muted variant correctly', () => {
            render(<Typography as="p" variant="muted">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass('text-slate-500', 'dark:text-slate-400');
            expect(text.tagName.toLowerCase()).toBe('p');
        });

        it('renders subtle variant correctly', () => {
            render(<Typography as="p" variant="subtle">Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass('text-slate-700', 'dark:text-slate-300');
            expect(text.tagName.toLowerCase()).toBe('p');
        });
    });

    describe('sizes', () => {
        const sizes = {
            xs: 'text-xs',
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl',
            '4xl': 'text-4xl',
            '5xl': 'text-5xl',
            '6xl': 'text-6xl'
        } as const;

        Object.entries(sizes).forEach(([size, expectedClass]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Typography size={size as keyof typeof sizes}>Test Text</Typography>);
                expect(screen.getByText('Test Text')).toHaveClass(expectedClass);
            });
        });
    });

    describe('weights', () => {
        const weights = {
            thin: 'font-thin',
            extralight: 'font-extralight',
            light: 'font-light',
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
            extrabold: 'font-extrabold',
            black: 'font-black'
        } as const;

        Object.entries(weights).forEach(([weight, expectedClass]) => {
            it(`renders ${weight} weight correctly`, () => {
                render(<Typography weight={weight as keyof typeof weights}>Test Text</Typography>);
                expect(screen.getByText('Test Text')).toHaveClass(expectedClass);
            });
        });
    });

    describe('alignment', () => {
        const alignments = {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
            justify: 'text-justify'
        } as const;

        Object.entries(alignments).forEach(([align, expectedClass]) => {
            it(`renders ${align} alignment correctly`, () => {
                render(<Typography align={align as keyof typeof alignments}>Test Text</Typography>);
                expect(screen.getByText('Test Text')).toHaveClass(expectedClass);
            });
        });
    });

    describe('transforms', () => {
        const transforms = {
            uppercase: 'uppercase',
            lowercase: 'lowercase',
            capitalize: 'capitalize',
            normal: 'normal-case'
        } as const;

        Object.entries(transforms).forEach(([transform, expectedClass]) => {
            it(`renders ${transform} transform correctly`, () => {
                render(<Typography transform={transform as keyof typeof transforms}>Test Text</Typography>);
                expect(screen.getByText('Test Text')).toHaveClass(expectedClass);
            });
        });
    });

    describe('decorations', () => {
        const decorations = {
            underline: 'underline',
            'line-through': 'line-through',
            'no-underline': 'no-underline'
        } as const;

        Object.entries(decorations).forEach(([decoration, expectedClass]) => {
            it(`renders ${decoration} decoration correctly`, () => {
                render(<Typography decoration={decoration as keyof typeof decorations}>Test Text</Typography>);
                expect(screen.getByText('Test Text')).toHaveClass(expectedClass);
            });
        });
    });

    describe('line clamp', () => {
        const lineClamps = {
            1: 'line-clamp-1',
            2: 'line-clamp-2',
            3: 'line-clamp-3',
            4: 'line-clamp-4',
            5: 'line-clamp-5',
            6: 'line-clamp-6'
        } as const;

        Object.entries(lineClamps).forEach(([clamp, expectedClass]) => {
            it(`renders line clamp ${clamp} correctly`, () => {
                render(
                    <Typography lineClamp={Number(clamp) as keyof typeof lineClamps}>
                        Test Text
                    </Typography>
                );
                expect(screen.getByText('Test Text')).toHaveClass(expectedClass);
            });
        });
    });

    describe('special features', () => {
        it('renders truncated text correctly', () => {
            render(<Typography truncate>Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses, 'truncate');
        });

        it('renders italic text correctly', () => {
            render(<Typography italic>Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses, 'italic');
        });

        it('renders nowrap text correctly', () => {
            render(<Typography nowrap>Test Text</Typography>);
            const text = screen.getByText('Test Text');
            expect(text).toHaveClass(...baseClasses, 'whitespace-nowrap');
        });

        it('preserves whitespace when preserveWhitespace is true', () => {
            render(<Typography preserveWhitespace>Test    Text</Typography>);
            const text = screen.getByText(/Test\s+Text/);
            expect(text).toHaveClass(...baseClasses, 'whitespace-pre-wrap');
        });

        it('renders HTML content when html prop is provided', () => {
            render(<Typography html="<strong>Bold</strong> text" />);
            const element = screen.getByText(/Bold/);
            expect(element.tagName.toLowerCase()).toBe('strong');
            expect(screen.getByText(/text/)).toBeInTheDocument();
        });
    });

    describe('polymorphic behavior', () => {
        it('renders as different HTML elements', () => {
            const { rerender } = render(<Typography as="span">Test Text</Typography>);
            expect(screen.getByText('Test Text').tagName.toLowerCase()).toBe('span');

            rerender(<Typography as="div">Test Text</Typography>);
            expect(screen.getByText('Test Text').tagName.toLowerCase()).toBe('div');

            rerender(<Typography as="label">Test Text</Typography>);
            expect(screen.getByText('Test Text').tagName.toLowerCase()).toBe('label');
        });

        it('automatically sets appropriate element based on variant', () => {
            render(<Typography variant="code">Test Code</Typography>);
            expect(screen.getByText('Test Code').tagName.toLowerCase()).toBe('code');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Typography className="custom-class">Test Text</Typography>);
            expect(screen.getByText('Test Text')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Typography
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                >
                    Styled Text
                </Typography>
            );

            const text = screen.getByText('Styled Text');
            const computedStyle = window.getComputedStyle(text);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
}); 