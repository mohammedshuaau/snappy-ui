import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { useFormContext } from 'react-hook-form';

const richTextEditorVariants = cva(
    'w-full rounded-md border text-sm transition-colors focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-slate-200 bg-white text-slate-900 focus-within:border-primary-500 focus-within:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus-within:border-primary-400 dark:focus-within:ring-primary-400',
                error:
                    'border-red-500 bg-white text-slate-900 focus-within:border-red-500 focus-within:ring-red-500 dark:border-red-500 dark:bg-slate-950 dark:text-slate-100 dark:focus-within:border-red-400 dark:focus-within:ring-red-400',
            },
            size: {
                default: 'min-h-[200px]',
                sm: 'min-h-[150px]',
                lg: 'min-h-[300px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const menubarVariants = cva(
    'flex flex-wrap items-center gap-1 border-b p-2',
    {
        variants: {
            variant: {
                default: 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900',
                error: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'hover:bg-slate-100 dark:hover:bg-slate-800',
                active: 'bg-slate-200 dark:bg-slate-800',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const labelVariants = cva('block text-sm font-medium mb-1.5', {
    variants: {
        variant: {
            default: 'text-slate-700 dark:text-slate-200',
            error: 'text-red-500 dark:text-red-400',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const helperTextVariants = cva('text-xs mt-1.5', {
    variants: {
        variant: {
            default: 'text-slate-500 dark:text-slate-400',
            error: 'text-red-500 dark:text-red-400',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

// Custom styles for the editor content
const editorStyles = `
.ProseMirror {
    padding: 1rem;
    min-height: inherit;
    outline: none;
}

.ProseMirror p {
    margin: 1em 0;
}

.ProseMirror > *:first-child {
    margin-top: 0;
}

.ProseMirror > *:last-child {
    margin-bottom: 0;
}

.ProseMirror ul,
.ProseMirror ol {
    padding: 0 1rem;
}

.ProseMirror h1 {
    font-size: 2em;
}

.ProseMirror h2 {
    font-size: 1.5em;
}

.ProseMirror h3 {
    font-size: 1.25em;
}

.ProseMirror a {
    color: #2563eb;
    text-decoration: underline;
}

.ProseMirror.is-empty:before {
    content: attr(data-placeholder);
    float: left;
    color: #9ca3af;
    pointer-events: none;
    height: 0;
}

.ProseMirror[dir="rtl"] {
    text-align: right;
}

.dark .ProseMirror a {
    color: #60a5fa;
}
`;

export interface RichTextEditorProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof richTextEditorVariants> {
    /**
     * The label for the rich text editor
     */
    label?: string;
    /**
     * Helper text to be displayed below the rich text editor
     */
    helperText?: string;
    /**
     * The initial HTML content
     */
    value?: string;
    /**
     * Callback when content changes
     */
    onChange?: (html: string) => void;
    /**
     * Whether the editor is disabled
     */
    disabled?: boolean;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Placeholder text
     */
    placeholder?: string;
    /**
     * Name of the field when used with forms
     */
    name?: string;
    /**
     * Text direction (ltr or rtl)
     */
    dir?: 'ltr' | 'rtl';
}

const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
    ({
        className,
        variant,
        size,
        label,
        helperText,
        value = '',
        onChange,
        disabled = false,
        name,
        placeholder,
        dir = 'ltr',
        sx,
        ...props
    }, ref) => {
        // Get form context if available
        const formContext = useFormContext();
        const isFormField = formContext && name;

        // Get field state from form context
        const fieldState = isFormField ? formContext.getFieldState(name, formContext.formState) : null;
        const hasError = Boolean(fieldState?.error);
        const errorMessage = fieldState?.error?.message;

        // Initialize editor
        const editor = useEditor({
            extensions: [
                StarterKit,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                Placeholder.configure({
                    placeholder,
                }),
                Link.configure({
                    openOnClick: false,
                }),
                TextStyle,
                Color,
                Underline,
            ],
            content: value,
            editable: !disabled,
            editorProps: {
                attributes: {
                    dir,
                    class: 'prose prose-sm dark:prose-invert max-w-none',
                },
            },
            onUpdate: ({ editor }) => {
                const html = editor.getHTML();

                // Update form field if using react-hook-form
                if (isFormField) {
                    formContext.setValue(name, html, { shouldValidate: true });
                }

                // Call onChange callback
                onChange?.(html);
            },
        });

        // Generate a unique class name for custom styles
        const editorClassName = sx ? `editor-${Math.random().toString(36).slice(2, 11)}` : '';

        return (
            <div className="w-full" ref={ref} {...props}>
                <style>{editorStyles}</style>
                {sx && (
                    <style>
                        {`
                            .${editorClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                {label && (
                    <label
                        htmlFor={name}
                        className={labelVariants({ variant: hasError ? 'error' : variant })}
                        style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
                    >
                        {label}
                    </label>
                )}
                <div
                    className={twMerge(
                        richTextEditorVariants({ variant: hasError ? 'error' : variant, size }),
                        editorClassName,
                        className
                    )}
                >
                    <div className={menubarVariants({ variant: hasError ? 'error' : variant })}>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleBold().run()}
                            className={buttonVariants({
                                variant: editor?.isActive('bold') ? 'active' : 'default'
                            })}
                            disabled={disabled}
                            title="Bold"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h8a4 4 0 100-8H6v8zm0 0h8a4 4 0 110 8H6v-8z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                            className={buttonVariants({
                                variant: editor?.isActive('italic') ? 'active' : 'default'
                            })}
                            disabled={disabled}
                            title="Italic"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleUnderline().run()}
                            className={buttonVariants({
                                variant: editor?.isActive('underline') ? 'active' : 'default'
                            })}
                            disabled={disabled}
                            title="Underline"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                        </button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
                        <button
                            type="button"
                            onClick={() => {
                                const url = window.prompt('Enter URL');
                                if (url) {
                                    editor?.chain().focus().setLink({ href: url }).run();
                                }
                            }}
                            className={buttonVariants({
                                variant: editor?.isActive('link') ? 'active' : 'default'
                            })}
                            disabled={disabled}
                            title="Add Link"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().unsetLink().run()}
                            className={buttonVariants({ variant: 'default' })}
                            disabled={!editor?.isActive('link') || disabled}
                            title="Remove Link"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                            className={buttonVariants({
                                variant: editor?.isActive('bulletList') ? 'active' : 'default'
                            })}
                            disabled={disabled}
                            title="Bullet List"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                            className={buttonVariants({
                                variant: editor?.isActive('orderedList') ? 'active' : 'default'
                            })}
                            disabled={disabled}
                            title="Numbered List"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h7M9 12h7M9 19h7M4 5h1v1H4V5zm0 7h1v1H4v-1zm0 7h1v1H4v-1z" />
                            </svg>
                        </button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                            className={buttonVariants({
                                variant: editor?.isActive({ textAlign: 'left' }) ? 'active' : 'default'
                            })}
                            disabled={disabled}
                            title="Align Left"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                            className={buttonVariants({
                                variant: editor?.isActive({ textAlign: 'center' }) ? 'active' : 'default'
                            })}
                            disabled={disabled}
                            title="Align Center"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                            className={buttonVariants({
                                variant: editor?.isActive({ textAlign: 'right' }) ? 'active' : 'default'
                            })}
                            disabled={disabled}
                            title="Align Right"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <EditorContent editor={editor} />
                </div>
                {(helperText || hasError) && (
                    <p
                        id={`${name}-description`}
                        className={helperTextVariants({ variant: hasError ? 'error' : variant })}
                        style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
                    >
                        {errorMessage || helperText}
                    </p>
                )}
            </div>
        );
    }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor; 