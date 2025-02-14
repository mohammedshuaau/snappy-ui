import React, { useState, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { useFormContext } from 'react-hook-form';

const fileUploadVariants = cva(
    'w-full rounded-md border-2 border-dashed transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-slate-200 hover:border-primary-500 dark:border-slate-700 dark:hover:border-primary-400',
                error:
                    'border-red-500 hover:border-red-600 dark:border-red-500 dark:hover:border-red-400',
            },
            size: {
                default: 'p-6',
                sm: 'p-4',
                lg: 'p-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
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

export interface FileUploadProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>,
    VariantProps<typeof fileUploadVariants> {
    /**
     * The label for the file upload
     */
    label?: string;
    /**
     * Helper text to be displayed below the file upload
     */
    helperText?: string;
    /**
     * Callback when files are selected
     */
    onChange?: (files: File[]) => void;
    /**
     * Whether to accept multiple files
     */
    multiple?: boolean;
    /**
     * Accepted file types
     */
    accept?: string;
    /**
     * Maximum file size in bytes
     */
    maxSize?: number;
    /**
     * Whether to show file preview
     */
    showPreview?: boolean;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
    ({
        className,
        variant,
        size,
        label,
        helperText,
        onChange,
        multiple = false,
        accept,
        maxSize,
        showPreview = true,
        name,
        disabled,
        sx,
        ...props
    }, ref) => {
        const [isDragging, setIsDragging] = useState(false);
        const [files, setFiles] = useState<File[]>([]);
        const [progress, setProgress] = useState<{ [key: string]: number }>({});
        const fileInputRef = useRef<HTMLInputElement>(null);

        // Get form context if available
        const formContext = useFormContext();
        const isFormField = formContext && name;

        // Get field state from form context
        const fieldState = isFormField ? formContext.getFieldState(name, formContext.formState) : null;
        const hasError = Boolean(fieldState?.error);
        const errorMessage = fieldState?.error?.message;

        // Generate a unique class name for custom styles
        const fileUploadClassName = sx ? `fileupload-${Math.random().toString(36).slice(2, 11)}` : '';

        const handleDragEnter = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled) setIsDragging(true);
        };

        const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
        };

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled) setIsDragging(true);
        };

        const validateFile = (file: File): boolean => {
            if (maxSize && file.size > maxSize) {
                console.error(`File ${file.name} is too large`);
                return false;
            }

            if (accept) {
                const acceptedTypes = accept.split(',').map(type => type.trim());
                const fileType = file.type || '';
                const fileExtension = `.${file.name.split('.').pop()}`;

                if (!acceptedTypes.some(type =>
                    fileType.startsWith(type.replace('/*', '')) ||
                    type === fileExtension
                )) {
                    console.error(`File ${file.name} type not accepted`);
                    return false;
                }
            }

            return true;
        };

        const handleFiles = (newFiles: FileList | null) => {
            if (!newFiles) return;

            const validFiles = Array.from(newFiles).filter(validateFile);
            const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;

            setFiles(updatedFiles);
            if (isFormField) {
                formContext.setValue(name, updatedFiles);
            }
            onChange?.(updatedFiles);

            // Simulate upload progress
            validFiles.forEach(file => {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 10;
                    setProgress(prev => ({ ...prev, [file.name]: progress }));
                    if (progress >= 100) clearInterval(interval);
                }, 200);
            });
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            if (!disabled) {
                handleFiles(e.dataTransfer.files);
            }
        };

        const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!disabled) {
                handleFiles(e.target.files);
            }
        };

        const removeFile = (fileToRemove: File) => {
            const updatedFiles = files.filter(file => file !== fileToRemove);
            setFiles(updatedFiles);
            if (isFormField) {
                formContext.setValue(name, updatedFiles);
            }
            onChange?.(updatedFiles);
            setProgress(prev => {
                const updated = { ...prev };
                delete updated[fileToRemove.name];
                return updated;
            });
        };

        const formatFileSize = (bytes: number): string => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
        };

        return (
            <div className="w-full" ref={ref}>
                {sx && (
                    <style>
                        {`
                            .${fileUploadClassName} {
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
                    >
                        {label}
                    </label>
                )}
                <div
                    className={twMerge(
                        fileUploadVariants({ variant: hasError ? 'error' : variant, size }),
                        isDragging && 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20',
                        disabled && 'cursor-not-allowed opacity-50',
                        fileUploadClassName,
                        className
                    )}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => !disabled && fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileInputChange}
                        multiple={multiple}
                        accept={accept}
                        disabled={disabled}
                        {...props}
                    />
                    <div className="text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {isDragging ? (
                                'Drop files here'
                            ) : (
                                <>
                                    Drag and drop files here, or{' '}
                                    <span className="text-primary-500 dark:text-primary-400">browse</span>
                                </>
                            )}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {multiple ? 'Upload multiple files' : 'Upload a file'}
                            {maxSize && ` up to ${formatFileSize(maxSize)}`}
                            {accept && ` (${accept})`}
                        </p>
                    </div>
                </div>
                {showPreview && files.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-slate-50 rounded dark:bg-slate-800"
                            >
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="h-5 w-5 text-slate-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {progress[file.name] !== undefined && progress[file.name] < 100 && (
                                        <div className="w-24 h-1 bg-slate-200 rounded-full dark:bg-slate-700">
                                            <div
                                                className="h-full bg-primary-500 rounded-full dark:bg-primary-400"
                                                style={{ width: `${progress[file.name]}%` }}
                                            />
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className="p-1 hover:bg-slate-200 rounded dark:hover:bg-slate-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(file);
                                        }}
                                    >
                                        <svg
                                            className="h-4 w-4 text-slate-500 dark:text-slate-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {(helperText || hasError) && (
                    <p
                        id={`${name}-description`}
                        className={helperTextVariants({ variant: hasError ? 'error' : variant })}
                    >
                        {errorMessage || helperText}
                    </p>
                )}
            </div>
        );
    }
);

FileUpload.displayName = 'FileUpload';