import type {Meta, StoryObj} from '@storybook/react';
import {FormProvider, useForm} from 'react-hook-form';
import {RichTextEditor} from './RichTextEditor';

const meta = {
    title: 'Form/RichTextEditor',
    component: RichTextEditor,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="w-[800px]">
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
} satisfies Meta<typeof RichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Type something...',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Description',
        placeholder: 'Enter a detailed description...',
    },
};

export const WithHelperText: Story = {
    args: {
        label: 'Description',
        helperText: 'Use formatting tools to make your text more engaging.',
        placeholder: 'Enter a detailed description...',
    },
};

export const WithError: Story = {
    args: {
        label: 'Description',
        variant: 'error',
        helperText: 'Description is required.',
        placeholder: 'Enter a detailed description...',
    },
};

export const Small: Story = {
    args: {
        label: 'Short Description',
        size: 'sm',
        placeholder: 'Enter a brief description...',
    },
};

export const Large: Story = {
    args: {
        label: 'Long Description',
        size: 'lg',
        placeholder: 'Enter a detailed description...',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Description',
        disabled: true,
        value: '<p>This content cannot be edited.</p>',
    },
};

export const RightToLeft: Story = {
    args: {
        label: 'الوصف',
        dir: 'rtl',
        placeholder: 'اكتب شيئاً...',
        helperText: 'استخدم أدوات التنسيق لجعل النص أكثر جاذبية.',
    },
};

const FormExample = () => {
    const methods = useForm({
        defaultValues: {
            description: '',
        },
    });

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit((data) => {
                    console.log('Form submitted:', data);
                })}
                className="space-y-4"
            >
                <RichTextEditor
                    name="description"
                    label="Description"
                    placeholder="Enter a description..."
                />
                <button
                    type="submit"
                    className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    );
};

export const WithFormIntegration: Story = {
    render: () => <FormExample />,
}; 