import React, { useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const audioVariants = cva(
    'w-full rounded-md overflow-hidden',
    {
        variants: {
            variant: {
                default: 'border border-slate-200 dark:border-slate-700',
                borderless: '',
            },
            rounded: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                '2xl': 'rounded-2xl',
                '3xl': 'rounded-3xl',
                full: 'rounded-full',
            },
            size: {
                sm: 'max-w-sm',
                default: 'max-w-2xl',
                lg: 'max-w-4xl',
                full: 'max-w-full',
            },
        },
        defaultVariants: {
            variant: 'default',
            rounded: 'md',
            size: 'default',
        },
    }
);

export interface AudioProps
    extends Omit<React.AudioHTMLAttributes<HTMLAudioElement>, 'size'>,
    VariantProps<typeof audioVariants> {
    /**
     * The source URL of the audio
     */
    src: string;
    /**
     * Additional audio sources for different formats
     */
    sources?: Array<{
        src: string;
        type: string;
    }>;
    /**
     * Whether to show custom controls
     */
    controls?: boolean;
    /**
     * Whether to autoplay the audio
     */
    autoPlay?: boolean;
    /**
     * Whether to loop the audio
     */
    loop?: boolean;
    /**
     * Whether to mute the audio
     */
    muted?: boolean;
    /**
     * Whether to preload the audio
     */
    preload?: 'auto' | 'metadata' | 'none';
    /**
     * The playback rate
     */
    playbackRate?: number;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
}

const Audio = React.forwardRef<HTMLDivElement, AudioProps>(
    ({
        className,
        variant,
        rounded,
        size,
        src,
        sources,
        controls = true,
        autoPlay = false,
        loop = false,
        muted = false,
        preload = 'metadata',
        playbackRate = 1,
        sx,
        ...props
    }, ref) => {
        const audioRef = useRef<HTMLAudioElement>(null);
        const playerRef = useRef<Plyr | null>(null);

        // Generate unique class name for custom styles
        const audioClassName = sx ? `audio-${Math.random().toString(36).slice(2, 11)}` : '';

        useEffect(() => {
            if (audioRef.current && controls) {
                playerRef.current = new Plyr(audioRef.current, {
                    controls: [
                        'play',
                        'progress',
                        'current-time',
                        'mute',
                        'volume',
                        'settings',
                    ],
                    speed: { selected: playbackRate, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
                    autoplay: autoPlay,
                    muted: muted,
                    loop: { active: loop },
                });
            }

            return () => {
                if (playerRef.current) {
                    playerRef.current.destroy();
                }
            };
        }, [controls, playbackRate, autoPlay, muted, loop]);

        return (
            <div
                ref={ref}
                className={twMerge(
                    audioVariants({ variant, rounded, size }),
                    audioClassName,
                    className
                )}
            >
                {sx && (
                    <style>
                        {`
                            .${audioClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <audio
                    ref={audioRef}
                    className="w-full"
                    controls={controls}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    preload={preload}
                    {...props}
                >
                    <source src={src} type="audio/mpeg" />
                    {sources?.map((source, index) => (
                        <source key={index} {...source} />
                    ))}
                    Your browser does not support the audio tag.
                </audio>
            </div>
        );
    }
);

Audio.displayName = 'Audio';

export default Audio; 