import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const markdownVariants = cva(
    'prose prose-slate max-w-none dark:prose-invert',
    {
        variants: {
            variant: {
                default: 'prose-sm sm:prose-base',
                compact: 'prose-sm',
                article: 'prose-base sm:prose-lg',
            },
            theme: {
                default: 'prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800',
                github: 'prose-headings:border-b prose-headings:pb-2 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800',
                documentation: 'prose-headings:text-primary-600 dark:prose-headings:text-primary-400 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800',
            },
        },
        defaultVariants: {
            variant: 'default',
            theme: 'default',
        },
    }
);

export interface MarkdownProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof markdownVariants> {
    /**
     * The markdown content to render
     */
    content: string;
    /**
     * Whether to allow HTML in markdown
     */
    allowHtml?: boolean;
    /**
     * Whether to enable syntax highlighting for code blocks
     */
    enableHighlight?: boolean;
    /**
     * Whether to enable GitHub Flavored Markdown
     */
    enableGfm?: boolean;
    /**
     * Custom styles using the sx prop
     */
    sx?: React.CSSProperties;
}

const Markdown = React.forwardRef<HTMLDivElement, MarkdownProps>(
    ({
        content,
        allowHtml = false,
        enableHighlight = true,
        enableGfm = true,
        variant,
        theme,
        className,
        sx,
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const markdownClassName = sx ? `markdown-${Math.random().toString(36).slice(2, 11)}` : '';

        // Configure markdown plugins
        const remarkPlugins = [
            ...(enableGfm ? [remarkGfm] : []),
        ];

        const rehypePlugins = [
            ...(allowHtml ? [rehypeRaw] : [rehypeSanitize]),
            ...(enableHighlight ? [rehypeHighlight] : []),
        ];

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${markdownClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    className={twMerge(
                        markdownVariants({ variant, theme }),
                        markdownClassName,
                        className
                    )}
                    {...props}
                >
                    <ReactMarkdown
                        remarkPlugins={remarkPlugins}
                        rehypePlugins={rehypePlugins}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </>
        );
    }
);

Markdown.displayName = 'Markdown';

export default Markdown; 