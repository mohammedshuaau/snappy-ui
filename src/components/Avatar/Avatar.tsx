import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const avatarVariants = cva(
    [
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-gray-200',
        'dark:bg-gray-700',
        'text-gray-900',
        'dark:text-gray-100',
        'font-medium',
        'relative',
        'overflow-hidden',
    ],
    {
        variants: {
            size: {
                xs: ['w-6', 'h-6', 'text-xs'],
                sm: ['w-8', 'h-8', 'text-sm'],
                md: ['w-10', 'h-10', 'text-base'],
                lg: ['w-12', 'h-12', 'text-lg'],
                xl: ['w-16', 'h-16', 'text-xl'],
            },
            variant: {
                circle: 'rounded-full',
                square: 'rounded-lg',
            },
            status: {
                online: ['after:absolute', 'after:w-2.5', 'after:h-2.5', 'after:bg-success-500', 'after:rounded-full', 'after:right-0', 'after:bottom-0', 'after:border-2', 'after:border-white', 'after:dark:border-gray-900'],
                offline: ['after:absolute', 'after:w-2.5', 'after:h-2.5', 'after:bg-gray-400', 'after:rounded-full', 'after:right-0', 'after:bottom-0', 'after:border-2', 'after:border-white', 'after:dark:border-gray-900'],
                busy: ['after:absolute', 'after:w-2.5', 'after:h-2.5', 'after:bg-error-500', 'after:rounded-full', 'after:right-0', 'after:bottom-0', 'after:border-2', 'after:border-white', 'after:dark:border-gray-900'],
                away: ['after:absolute', 'after:w-2.5', 'after:h-2.5', 'after:bg-warning-500', 'after:rounded-full', 'after:right-0', 'after:bottom-0', 'after:border-2', 'after:border-white', 'after:dark:border-gray-900'],
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'circle',
        },
    }
);

export interface AvatarProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
    src?: string;
    alt?: string;
    name?: string;
    fallback?: React.ReactNode;
    sx?: { [key: string]: any };
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, size, variant, status, src, alt, name, fallback, sx, ...props }, ref) => {
        const [imgError, setImgError] = React.useState(false);
        const avatarClassName = sx ? `avatar-${Math.random().toString(36).slice(2, 11)}` : '';

        const handleError = () => {
            setImgError(true);
        };

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${avatarClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                                ${Object.entries(sx)
                                .filter(([key]) => !key.startsWith('&') && !key.startsWith('@media'))
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                            ${Object.entries(sx)
                                .filter(([key]) => key.startsWith('&') || key.startsWith('@media'))
                                .map(([key, value]) => `
                                    ${key.startsWith('@media') ? key : `.${avatarClassName}${key.slice(1)}`} {
                                        ${Object.entries(value as object)
                                        .map(([k, v]) => `${k.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${v};`)
                                        .join('\n')}
                                    }
                                `)
                                .join('\n')}
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    className={twMerge(avatarVariants({ size, variant, status }), avatarClassName, className)}
                    {...props}
                >
                    {src && !imgError ? (
                        <img
                            src={src}
                            alt={alt || name || 'avatar'}
                            onError={handleError}
                            className="w-full h-full object-cover"
                        />
                    ) : fallback ? (
                        fallback
                    ) : name ? (
                        getInitials(name)
                    ) : (
                        <svg
                            className="w-5/6 h-5/6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </div>
            </>
        );
    }
);

Avatar.displayName = 'Avatar'; 