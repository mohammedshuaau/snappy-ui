import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { useInView } from 'react-intersection-observer';
import { decode } from 'blurhash';

const imageVariants = cva(
    'transition-opacity duration-300',
    {
        variants: {
            fit: {
                fill: 'object-fill',
                contain: 'object-contain',
                cover: 'object-cover',
                none: 'object-none',
                scaleDown: 'object-scale-down',
            },
            loading: {
                eager: '',
                lazy: '',
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
        },
        defaultVariants: {
            fit: 'cover',
            loading: 'lazy',
            rounded: 'none',
        },
    }
);

export interface ImageProps
    extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'>,
    VariantProps<typeof imageVariants> {
    /**
     * The source URL of the image
     */
    src: string;
    /**
     * Alternative text for the image
     */
    alt: string;
    /**
     * Blur hash string for placeholder
     */
    blurHash?: string;
    /**
     * Whether to show loading skeleton
     */
    showSkeleton?: boolean;
    /**
     * Whether to enable image zoom on hover
     */
    zoomOnHover?: boolean;
    /**
     * Whether to show error state with fallback
     */
    showError?: boolean;
    /**
     * Fallback image URL to show on error
     */
    fallbackSrc?: string;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Whether to use native lazy loading
     */
    useNativeLazy?: boolean;
    /**
     * Callback when image is in view
     */
    onInView?: () => void;
    /**
     * Whether to enable caching
     */
    enableCaching?: boolean;
    /**
     * Cache duration in milliseconds
     */
    cacheDuration?: number;
}

// Add this type at the top with other imports
type HTMLImageElementConstructor = new () => HTMLImageElement;

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
    ({
        className,
        src,
        alt,
        fit,
        loading,
        rounded,
        blurHash,
        showSkeleton = true,
        zoomOnHover = false,
        showError = true,
        fallbackSrc = '/placeholder.png',
        sx,
        useNativeLazy = true,
        onInView,
        enableCaching = true,
        cacheDuration = 1000 * 60 * 5, // 5 minutes
        ...props
    }, ref) => {
        const [isLoaded, setIsLoaded] = useState(false);
        const [hasError, setHasError] = useState(false);
        const [blurDataUrl, setBlurDataUrl] = useState<string | null>(null);
        const { ref: inViewRef, inView } = useInView({
            triggerOnce: true,
            threshold: 0.1,
        });

        // Generate unique class name for custom styles
        const imageClassName = sx ? `image-${Math.random().toString(36).slice(2, 11)}` : '';

        useEffect(() => {
            if (inView && onInView) {
                onInView();
            }
        }, [inView, onInView]);

        useEffect(() => {
            if (blurHash) {
                // Convert blur hash to data URL
                const pixels = decode(blurHash, 32, 32);
                const canvas = document.createElement('canvas');
                canvas.width = 32;
                canvas.height = 32;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const imageData = ctx.createImageData(32, 32);
                    imageData.data.set(pixels);
                    ctx.putImageData(imageData, 0, 0);
                    setBlurDataUrl(canvas.toDataURL());
                }
            }
        }, [blurHash]);

        useEffect(() => {
            if (enableCaching && src) {
                const cachedImage = localStorage.getItem(`image_${src}`);
                if (cachedImage) {
                    const { data, timestamp } = JSON.parse(cachedImage);
                    const isExpired = Date.now() - timestamp > cacheDuration;

                    if (!isExpired) {
                        // Use cached image data
                        setBlurDataUrl(data);
                        return;
                    }
                }

                // Cache new image data
                const img = new (window.Image as HTMLImageElementConstructor)();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(img, 0, 0);
                        const dataUrl = canvas.toDataURL();
                        localStorage.setItem(`image_${src}`, JSON.stringify({
                            data: dataUrl,
                            timestamp: Date.now(),
                        }));
                    }
                };
                img.src = src;
            }
        }, [src, enableCaching, cacheDuration]);

        const handleLoad = () => {
            setIsLoaded(true);
        };

        const handleError = () => {
            setHasError(true);
            if (showError && fallbackSrc) {
                const img = new (window.Image as HTMLImageElementConstructor)();
                img.src = fallbackSrc;
            }
        };

        return (
            <div
                className={twMerge(
                    'relative overflow-hidden',
                    zoomOnHover && 'group',
                    className
                )}
                ref={inViewRef}
            >
                {sx && (
                    <style>
                        {`
                            .${imageClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                {showSkeleton && !isLoaded && !hasError && (
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
                )}
                {blurDataUrl && !isLoaded && !hasError && (
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-lg"
                        style={{ backgroundImage: `url(${blurDataUrl})` }}
                    />
                )}
                <img
                    ref={ref}
                    src={hasError && fallbackSrc ? fallbackSrc : src}
                    alt={alt}
                    className={twMerge(
                        imageVariants({ fit, loading, rounded }),
                        !isLoaded && 'opacity-0',
                        isLoaded && 'opacity-100',
                        zoomOnHover && 'group-hover:scale-110 transition-transform duration-300',
                        imageClassName
                    )}
                    loading={useNativeLazy ? 'lazy' : undefined}
                    onLoad={handleLoad}
                    onError={handleError}
                    {...props}
                />
            </div>
        );
    }
);

Image.displayName = 'Image';