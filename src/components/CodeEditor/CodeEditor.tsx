import React, { useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { EditorState } from '@codemirror/state';
import { EditorView, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldGutter, indentOnInput, LanguageSupport } from '@codemirror/language';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { php } from '@codemirror/lang-php';
import { yaml } from '@codemirror/lang-yaml';

const codeEditorVariants = cva(
    'relative overflow-hidden rounded-md border focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent',
    {
        variants: {
            variant: {
                default: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800',
                ghost: 'border-transparent bg-transparent',
            },
            size: {
                sm: 'min-h-[200px]',
                default: 'min-h-[300px]',
                lg: 'min-h-[400px]',
                xl: 'min-h-[500px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

type Language =
    | 'javascript'
    | 'typescript'
    | 'jsx'
    | 'tsx'
    | 'html'
    | 'css'
    | 'json'
    | 'markdown'
    | 'python'
    | 'sql'
    | 'xml'
    | 'rust'
    | 'cpp'
    | 'java'
    | 'php'
    | 'yaml';

const languageMap: Record<Language, () => LanguageSupport> = {
    javascript: () => javascript(),
    typescript: () => javascript({ typescript: true }),
    jsx: () => javascript({ jsx: true }),
    tsx: () => javascript({ jsx: true, typescript: true }),
    html: () => html(),
    css: () => css(),
    json: () => json(),
    markdown: () => markdown(),
    python: () => python(),
    sql: () => sql(),
    xml: () => xml(),
    rust: () => rust(),
    cpp: () => cpp(),
    java: () => java(),
    php: () => php(),
    yaml: () => yaml(),
};

export interface CodeEditorProps extends VariantProps<typeof codeEditorVariants> {
    /**
     * The initial value of the editor
     */
    value?: string;
    /**
     * Callback when the content changes
     */
    onChange?: (value: string) => void;
    /**
     * The programming language for syntax highlighting
     */
    language?: Language;
    /**
     * Whether to use dark theme
     */
    darkTheme?: boolean;
    /**
     * Whether the editor is read-only
     */
    readOnly?: boolean;
    /**
     * Whether to show line numbers
     */
    showLineNumbers?: boolean;
    /**
     * Whether to enable auto-completion
     */
    enableAutocompletion?: boolean;
    /**
     * Custom styles
     */
    sx?: React.CSSProperties;
    /**
     * Additional class names
     */
    className?: string;
}

export const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
    ({
        value = '',
        onChange,
        language = 'javascript',
        darkTheme = false,
        readOnly = false,
        showLineNumbers = true,
        enableAutocompletion = true,
        variant,
        size,
        sx,
        className,
    }, ref) => {
        const editorRef = useRef<HTMLDivElement>(null);
        const viewRef = useRef<EditorView>();

        // Generate unique class name for custom styles
        const editorClassName = sx ? `code-editor-${Math.random().toString(36).slice(2, 11)}` : '';

        useEffect(() => {
            if (!editorRef.current) return;

            // Basic editor extensions
            const extensions = [
                history(),
                keymap.of(defaultKeymap),
                keymap.of(historyKeymap),
                highlightSpecialChars(),
                bracketMatching(),
                indentOnInput(),
                syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                EditorState.readOnly.of(readOnly),
                languageMap[language](),
                darkTheme ? oneDark : [],
            ];

            // Optional extensions
            if (showLineNumbers) {
                extensions.push(
                    lineNumbers(),
                    highlightActiveLineGutter(),
                    foldGutter(),
                );
            }

            // Create editor state
            const state = EditorState.create({
                doc: value,
                extensions: [
                    ...extensions,
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged && onChange) {
                            onChange(update.state.doc.toString());
                        }
                    }),
                ],
            });

            // Create editor view
            const view = new EditorView({
                state,
                parent: editorRef.current,
            });

            viewRef.current = view;

            return () => {
                view.destroy();
            };
        }, [value, onChange, language, darkTheme, readOnly, showLineNumbers, enableAutocompletion]);

        return (
            <>
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
                <div
                    ref={ref}
                    className={twMerge(
                        codeEditorVariants({ variant, size }),
                        editorClassName,
                        className
                    )}
                >
                    <div
                        ref={editorRef}
                        className="h-full w-full [&_.cm-editor]:h-full [&_.cm-editor]:w-full [&_.cm-scroller]:h-full"
                    />
                </div>
            </>
        );
    }
);

CodeEditor.displayName = 'CodeEditor';