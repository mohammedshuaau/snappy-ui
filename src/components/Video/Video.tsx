import React, { useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const videoVariants = cva(
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

export interface VideoProps
    extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'size'>,
    VariantProps<typeof videoVariants> {
    /**
     * The source URL of the video
     */
    src: string;
    /**
     * Additional video sources for different formats
     */
    sources?: Array<{
        src: string;
        type: string;
    }>;
    /**
     * The poster image URL
     */
    poster?: string;
    /**
     * Whether to show custom controls
     */
    controls?: boolean;
    /**
     * Whether to autoplay the video
     */
    autoPlay?: boolean;
    /**
     * Whether to loop the video
     */
    loop?: boolean;
    /**
     * Whether to mute the video
     */
    muted?: boolean;
    /**
     * Whether to preload the video
     */
    preload?: 'auto' | 'metadata' | 'none';
    /**
     * The playback rate
     */
    playbackRate?: number;
    /**
     * Whether to show picture-in-picture button
     */
    pip?: boolean;
    /**
     * Whether to show fullscreen button
     */
    fullscreen?: boolean;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
}

const Video = React.forwardRef<HTMLDivElement, VideoProps>(
    ({
        className,
        variant,
        rounded,
        size,
        src,
        sources,
        poster,
        controls = true,
        autoPlay = false,
        loop = false,
        muted = false,
        preload = 'metadata',
        playbackRate = 1,
        pip = true,
        fullscreen = true,
        sx,
        ...props
    }, ref) => {
        const videoRef = useRef<HTMLVideoElement>(null);
        const playerRef = useRef<Plyr | null>(null);

        // Generate unique class name for custom styles
        const videoClassName = sx ? `video-${Math.random().toString(36).slice(2, 11)}` : '';

        useEffect(() => {
            if (videoRef.current && controls) {
                playerRef.current = new Plyr(videoRef.current, {
                    controls: [
                        'play-large',
                        'play',
                        'progress',
                        'current-time',
                        'mute',
                        'volume',
                        'settings',
                        pip ? 'pip' : '',
                        fullscreen ? 'fullscreen' : '',
                    ].filter(Boolean),
                    ratio: '16:9',
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
        }, [controls, playbackRate, autoPlay, muted, loop, pip, fullscreen]);

        return (
            <div
                ref={ref}
                className={twMerge(
                    videoVariants({ variant, rounded, size }),
                    videoClassName,
                    className
                )}
            >
                {sx && (
                    <style>
                        {`
                            .${videoClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <video
                    ref={videoRef}
                    className="w-full h-full"
                    poster={poster}
                    controls={controls}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    preload={preload}
                    {...props}
                >
                    <source src={src} type="video/mp4" />
                    {sources?.map((source, index) => (
                        <source key={index} {...source} />
                    ))}
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }
);

Video.displayName = 'Video';

export default Video; 