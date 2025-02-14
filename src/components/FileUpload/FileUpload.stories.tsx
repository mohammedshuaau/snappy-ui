import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import {FileUpload} from './FileUpload';

const meta = {
    title: 'Form/FileUpload',
    component: FileUpload,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'error'],
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg'],
        },
    },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [_files, setFiles] = useState<File[]>([]);
        return (
            <div className="w-[500px]">
                <FileUpload
                    name="file"
                    onChange={setFiles}
                />
            </div>
        );
    }
};

export const WithLabel: Story = {
    render: () => {
        const [_files, setFiles] = useState<File[]>([]);
        return (
            <div className="w-[500px]">
                <FileUpload
                    label="Upload Documents"
                    name="documents"
                    onChange={setFiles}
                />
            </div>
        );
    }
};

export const WithHelperText: Story = {
    render: () => {
        const [_files, setFiles] = useState<File[]>([]);
        return (
            <div className="w-[500px]">
                <FileUpload
                    label="Upload Files"
                    helperText="Drag and drop files here or click to browse"
                    name="files"
                    onChange={setFiles}
                />
            </div>
        );
    }
};

export const MultipleFiles: Story = {
    render: () => {
        const [_files, setFiles] = useState<File[]>([]);
        return (
            <div className="w-[500px]">
                <FileUpload
                    label="Upload Multiple Files"
                    helperText="You can select multiple files"
                    name="multipleFiles"
                    onChange={setFiles}
                    multiple
                />
            </div>
        );
    }
};

export const WithFileTypes: Story = {
    render: () => {
        const [_files, setFiles] = useState<File[]>([]);
        return (
            <div className="w-[500px]">
                <FileUpload
                    label="Upload Images"
                    helperText="Only image files are allowed"
                    name="images"
                    onChange={setFiles}
                    accept="image/*"
                />
            </div>
        );
    }
};

export const WithMaxSize: Story = {
    render: () => {
        const [_files, setFiles] = useState<File[]>([]);
        return (
            <div className="w-[500px]">
                <FileUpload
                    label="Upload Files"
                    helperText="Maximum file size: 5MB"
                    name="limitedFiles"
                    onChange={setFiles}
                    maxSize={5 * 1024 * 1024} // 5MB in bytes
                />
            </div>
        );
    }
};

export const WithoutPreview: Story = {
    render: () => {
        const [_files, setFiles] = useState<File[]>([]);
        return (
            <div className="w-[500px]">
                <FileUpload
                    label="Upload Files"
                    helperText="File preview is disabled"
                    name="noPreview"
                    onChange={setFiles}
                    showPreview={false}
                />
            </div>
        );
    }
};

export const WithError: Story = {
    render: () => {
        const methods = useForm();

        React.useEffect(() => {
            methods.setError('errorFile', {
                type: 'required',
                message: 'Please upload a file',
            });
        }, []);

        return (
            <FormProvider {...methods}>
                <div className="w-[500px]">
                    <FileUpload
                        label="Upload File"
                        name="errorFile"
                        variant="error"
                    />
                </div>
            </FormProvider>
        );
    }
};

export const Disabled: Story = {
    render: () => {
        const [_files, setFiles] = useState<File[]>([]);
        return (
            <div className="w-[500px]">
                <FileUpload
                    label="Upload Files"
                    helperText="File upload is disabled"
                    name="disabledUpload"
                    onChange={setFiles}
                    disabled
                />
            </div>
        );
    }
};

export const Sizes: Story = {
    render: () => {
        const [_files, setFiles] = useState({
            small: [] as File[],
            default: [] as File[],
            large: [] as File[],
        });

        return (
            <div className="space-y-4 w-[500px]">
                <FileUpload
                    label="Small"
                    size="sm"
                    name="small"
                    onChange={(newFiles) => setFiles(prev => ({ ...prev, small: newFiles }))}
                />
                <FileUpload
                    label="Default"
                    name="default"
                    onChange={(newFiles) => setFiles(prev => ({ ...prev, default: newFiles }))}
                />
                <FileUpload
                    label="Large"
                    size="lg"
                    name="large"
                    onChange={(newFiles) => setFiles(prev => ({ ...prev, large: newFiles }))}
                />
            </div>
        );
    }
};

export const CustomStyled: Story = {
    render: () => {
        const [_files, setFiles] = useState<File[]>([]);
        return (
            <div className="w-[500px]">
                <FileUpload
                    label="Custom Styled"
                    name="customStyled"
                    onChange={setFiles}
                    sx={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.75rem',
                        '&:hover': {
                            borderColor: '#3b82f6',
                        },
                    }}
                />
            </div>
        );
    }
}; 