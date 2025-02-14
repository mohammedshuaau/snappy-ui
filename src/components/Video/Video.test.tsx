import {render} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import Video from './Video';

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

describe('Video', () => {
    const testSrc = 'test-video.mp4';
    const testPoster = 'test-poster.jpg';

    it('renders with default props', () => {
        const { container } = render(<Video src={testSrc} />);
        const videoElement = container.querySelector('video') as HTMLVideoElement;
        expect(videoElement).toBeInTheDocument();
        expect(videoElement).toHaveAttribute('controls');
        expect(videoElement).not.toHaveAttribute('autoplay');
        expect(videoElement).not.toHaveAttribute('loop');
        expect(videoElement.muted).toBe(false);
        expect(videoElement).toHaveAttribute('preload', 'metadata');
    });

    describe('variants', () => {
        const variants = {
            default: ['border', 'border-slate-200'],
            borderless: []
        } as const;

        Object.entries(variants).forEach(([variant, expectedClasses]) => {
            it(`renders ${variant} variant correctly`, () => {
                const { container } = render(<Video src={testSrc} variant={variant as keyof typeof variants} />);
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
                const { container } = render(<Video src={testSrc} size={size as keyof typeof sizes} />);
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
                const { container } = render(<Video src={testSrc} rounded={rounded as keyof typeof roundedVariants} />);
                expect(container.firstChild).toHaveClass(expectedClass);
            });
        });
    });

    describe('video attributes', () => {
        it('handles autoPlay prop', () => {
            const { container } = render(<Video src={testSrc} autoPlay />);
            const videoElement = container.querySelector('video') as HTMLVideoElement;
            expect(videoElement.autoplay).toBe(true);
        });

        it('handles loop prop', () => {
            const { container } = render(<Video src={testSrc} loop />);
            const videoElement = container.querySelector('video') as HTMLVideoElement;
            expect(videoElement.loop).toBe(true);
        });

        it('handles muted prop', () => {
            const { container } = render(<Video src={testSrc} muted />);
            const videoElement = container.querySelector('video') as HTMLVideoElement;
            expect(videoElement.muted).toBe(true);
        });

        it('handles preload prop', () => {
            const { container } = render(<Video src={testSrc} preload="auto" />);
            const videoElement = container.querySelector('video') as HTMLVideoElement;
            expect(videoElement).toHaveAttribute('preload', 'auto');
        });

        it('handles controls prop', () => {
            const { container } = render(<Video src={testSrc} controls={false} />);
            const videoElement = container.querySelector('video') as HTMLVideoElement;
            expect(videoElement).not.toHaveAttribute('controls');
        });

        it('handles poster prop', () => {
            const { container } = render(<Video src={testSrc} poster={testPoster} />);
            const videoElement = container.querySelector('video') as HTMLVideoElement;
            expect(videoElement).toHaveAttribute('poster', testPoster);
        });
    });

    describe('sources', () => {
        it('renders with multiple sources', () => {
            const { container } = render(
                <Video
                    src={testSrc}
                    sources={[
                        { src: 'video.mp4', type: 'video/mp4' },
                        { src: 'video.webm', type: 'video/webm' }
                    ]}
                />
            );
            const sourceElements = container.querySelectorAll('source');
            expect(sourceElements).toHaveLength(3); // Including the default source
            expect(sourceElements[1]).toHaveAttribute('src', 'video.mp4');
            expect(sourceElements[1]).toHaveAttribute('type', 'video/mp4');
            expect(sourceElements[2]).toHaveAttribute('src', 'video.webm');
            expect(sourceElements[2]).toHaveAttribute('type', 'video/webm');
        });
    });

    describe('Plyr configuration', () => {
        it('initializes Plyr with default controls when controls are enabled', () => {
            const { container } = render(<Video src={testSrc} />);
            const videoElement = container.querySelector('video');
            expect(videoElement).toBeInTheDocument();
            // Plyr is mocked, so we can't test its actual functionality
            // but we can verify that the video element exists and has controls
            expect(videoElement).toHaveAttribute('controls');
        });

        it('does not initialize Plyr when controls are disabled', () => {
            const { container } = render(<Video src={testSrc} controls={false} />);
            const videoElement = container.querySelector('video');
            expect(videoElement).toBeInTheDocument();
            expect(videoElement).not.toHaveAttribute('controls');
        });

        it('handles pip prop', () => {
            const { container } = render(<Video src={testSrc} pip={false} />);
            const videoElement = container.querySelector('video');
            expect(videoElement).toBeInTheDocument();
            // Since Plyr is mocked, we can only verify that the video element exists
            // The actual PiP functionality would be handled by Plyr
        });

        it('handles fullscreen prop', () => {
            const { container } = render(<Video src={testSrc} fullscreen={false} />);
            const videoElement = container.querySelector('video');
            expect(videoElement).toBeInTheDocument();
            // Since Plyr is mocked, we can only verify that the video element exists
            // The actual fullscreen functionality would be handled by Plyr
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            const { container } = render(<Video src={testSrc} className="custom-class" />);
            expect(container.firstChild).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            const { container } = render(
                <Video
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