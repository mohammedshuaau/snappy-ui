import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import DynamicComponent from '../../shared/DynamicComponent';

const typographyVariants = cva(
    'text-slate-900 dark:text-slate-100',
    {
        variants: {
            variant: {
                h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
                h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
                h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
                h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
                h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
                h6: 'scroll-m-20 text-base font-semibold tracking-tight',
                p: 'leading-7',
                blockquote: 'mt-6 border-l-2 border-slate-300 pl-6 italic dark:border-slate-700',
                code: 'relative rounded bg-slate-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold dark:bg-slate-800',
                lead: 'text-xl text-slate-700 dark:text-slate-400',
                large: 'text-lg font-semibold',
                small: 'text-sm font-medium leading-none',
                muted: 'text-sm text-slate-500 dark:text-slate-400',
                subtle: 'text-slate-700 dark:text-slate-300',
            },
            size: {
                xs: 'text-xs',
                sm: 'text-sm',
                base: 'text-base',
                lg: 'text-lg',
                xl: 'text-xl',
                '2xl': 'text-2xl',
                '3xl': 'text-3xl',
                '4xl': 'text-4xl',
                '5xl': 'text-5xl',
                '6xl': 'text-6xl',
            },
            weight: {
                thin: 'font-thin',
                extralight: 'font-extralight',
                light: 'font-light',
                normal: 'font-normal',
                medium: 'font-medium',
                semibold: 'font-semibold',
                bold: 'font-bold',
                extrabold: 'font-extrabold',
                black: 'font-black',
            },
            align: {
                left: 'text-left',
                center: 'text-center',
                right: 'text-right',
                justify: 'text-justify',
            },
            transform: {
                uppercase: 'uppercase',
                lowercase: 'lowercase',
                capitalize: 'capitalize',
                normal: 'normal-case',
            },
            decoration: {
                underline: 'underline',
                'line-through': 'line-through',
                'no-underline': 'no-underline',
            },
            lineClamp: {
                1: 'line-clamp-1',
                2: 'line-clamp-2',
                3: 'line-clamp-3',
                4: 'line-clamp-4',
                5: 'line-clamp-5',
                6: 'line-clamp-6',
            },
            truncate: {
                true: 'truncate',
            },
            italic: {
                true: 'italic',
            },
            nowrap: {
                true: 'whitespace-nowrap',
            },
        },
        defaultVariants: {
            variant: 'p',
            size: 'base',
            weight: 'normal',
            align: 'left',
        },
    }
);

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type AsProp<C extends React.ElementType> = {
    as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
    C extends React.ElementType,
    Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
    Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponentPropWithRef<
    C extends React.ElementType,
    Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

export interface TypographyProps extends VariantProps<typeof typographyVariants> {
    /**
     * Custom styles using the sx prop
     */
    sx?: React.CSSProperties;
    /**
     * Additional class names
     */
    className?: string;
    /**
     * Whether to preserve whitespace
     */
    preserveWhitespace?: boolean;
    /**
     * Whether to render as raw HTML
     */
    html?: string;
}

const Typography = React.forwardRef(function Typography<C extends React.ElementType = 'p'>(
    props: PolymorphicComponentPropWithRef<C, TypographyProps>,
    ref: React.Ref<any>
) {
    const { as, children, ...rest } = props;
    const { variant, size, weight, align, transform, decoration, lineClamp, truncate, italic, nowrap, className, sx, preserveWhitespace, html } = rest;

    const Component = as || (variant === 'code' ? 'code' : variant || 'p');
    const typographyClassName = sx ? `typography-${Math.random().toString(36).slice(2, 11)}` : '';

    return (
        <>
            {sx && (
                <style>
                    {`
                        .${typographyClassName} {
                            ${Object.entries(sx)
                            .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                            .join('\n')}
                        }
                    `}
                </style>
            )}
            <DynamicComponent
                as={Component}
                ref={ref}
                className={twMerge(
                    typographyVariants({
                        variant,
                        size,
                        weight,
                        align,
                        transform,
                        decoration,
                        lineClamp,
                        truncate,
                        italic,
                        nowrap,
                    }),
                    preserveWhitespace && 'whitespace-pre-wrap',
                    typographyClassName,
                    className
                )}
                {...rest}
            >
                {html ? (
                    <span dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                    children
                )}
            </DynamicComponent>
        </>
    );
});

Typography.displayName = 'Typography';

export default Typography; 