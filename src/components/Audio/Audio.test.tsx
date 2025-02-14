import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Audio} from './Audio';

// Mock Plyr
vi.mock('plyr', () => {
    return {
        default: class MockPlyr {
            destroy = vi.fn();
            constructor() {
                return {
                    destroy: this.destroy
                };
            }
        }
    };
});

describe('Audio', () => {
    const testSrc = 'test-audio.mp3';

    it('renders with default props', () => {
        render(<Audio src={testSrc} data-testid="audio-element" />);
        const audioElement = screen.getByTestId('audio-element');
        expect(audioElement).toBeInTheDocument();
        expect(audioElement).toHaveAttribute('controls');
        expect(audioElement).not.toHaveAttribute('autoplay');
        expect(audioElement).not.toHaveAttribute('loop');
        expect(audioElement).not.toHaveAttribute('muted');
        expect(audioElement).toHaveAttribute('preload', 'metadata');
    });

    describe('variants', () => {
        const variants = {
            default: ['border', 'border-slate-200'],
            borderless: []
        } as const;

        Object.entries(variants).forEach(([variant, expectedClasses]) => {
            it(`renders ${variant} variant correctly`, () => {
                const { container } = render(<Audio src={testSrc} variant={variant as keyof typeof variants} />);
                const wrapper = container.firstChild as HTMLElement;
                if (expectedClasses.length > 0) {
                    expectedClasses.forEach(className => {
                        expect(wrapper).toHaveClass(className);
                    });
                } else {
                    expect(wrapper).not.toHaveClass('border', 'border-slate-200');
                }
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            sm: 'max-w-sm',
            default: 'max-w-2xl',
            lg: 'max-w-4xl',
            full: 'max-w-full'
        } as const;

        Object.entries(sizes).forEach(([size, expectedClass]) => {
            it(`renders ${size} size correctly`, () => {
                const { container } = render(<Audio src={testSrc} size={size as keyof typeof sizes} />);
                expect(container.firstChild).toHaveClass(expectedClass);
            });
        });
    });

    describe('rounded variants', () => {
        const roundedVariants = {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            '2xl': 'rounded-2xl',
            '3xl': 'rounded-3xl',
            full: 'rounded-full'
        } as const;

        Object.entries(roundedVariants).forEach(([rounded, expectedClass]) => {
            it(`renders ${rounded} rounded variant correctly`, () => {
                const { container } = render(<Audio src={testSrc} rounded={rounded as keyof typeof roundedVariants} />);
                expect(container.firstChild).toHaveClass(expectedClass);
            });
        });
    });

    describe('audio attributes', () => {
        it('handles autoPlay prop', () => {
            render(<Audio src={testSrc} autoPlay data-testid="audio-element" />);
            expect(screen.getByTestId('audio-element')).toHaveAttribute('autoplay');
        });

        it('handles loop prop', () => {
            render(<Audio src={testSrc} loop data-testid="audio-element" />);
            expect(screen.getByTestId('audio-element')).toHaveAttribute('loop');
        });

        it('handles muted prop', () => {
            const { container } = render(<Audio src={testSrc} muted />);
            const audioElement = container.querySelector('audio') as HTMLAudioElement;
            expect(audioElement.muted).toBe(true);
        });

        it('handles preload prop', () => {
            render(<Audio src={testSrc} preload="auto" data-testid="audio-element" />);
            expect(screen.getByTestId('audio-element')).toHaveAttribute('preload', 'auto');
        });

        it('handles controls prop', () => {
            render(<Audio src={testSrc} controls={false} data-testid="audio-element" />);
            expect(screen.getByTestId('audio-element')).not.toHaveAttribute('controls');
        });
    });

    describe('sources', () => {
        it('renders with multiple sources', () => {
            render(
                <Audio
                    src={testSrc}
                    sources={[
                        { src: 'audio.mp3', type: 'audio/mpeg' },
                        { src: 'audio.ogg', type: 'audio/ogg' }
                    ]}
                    data-testid="audio-element"
                />
            );
            const sourceElements = screen.getByTestId('audio-element').querySelectorAll('source');
            expect(sourceElements).toHaveLength(3); // Including the default source
            expect(sourceElements[1]).toHaveAttribute('src', 'audio.mp3');
            expect(sourceElements[1]).toHaveAttribute('type', 'audio/mpeg');
            expect(sourceElements[2]).toHaveAttribute('src', 'audio.ogg');
            expect(sourceElements[2]).toHaveAttribute('type', 'audio/ogg');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            const { container } = render(<Audio src={testSrc} className="custom-class" />);
            expect(container.firstChild).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            const { container } = render(
                <Audio
                    src={testSrc}
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                />
            );

            // Check if the style tag is created with the correct styles
            const styleTag = container.querySelector('style');
            expect(styleTag).toBeInTheDocument();
            expect(styleTag?.textContent).toContain('background-color: rgb(0, 0, 255)');
            expect(styleTag?.textContent).toContain('padding: 20px');
        });
    });
}); 