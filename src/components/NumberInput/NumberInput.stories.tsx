import type {Meta, StoryObj} from '@storybook/react';
import {NumberInput} from './NumberInput';

const meta = {
    title: 'Form/NumberInput',
    component: NumberInput,
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
        showStepper: {
            control: 'boolean',
        },
        min: {
            control: 'number',
        },
        max: {
            control: 'number',
        },
        step: {
            control: 'number',
        },
    },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Enter a number',
    },
};

export const WithStepper: Story = {
    args: {
        placeholder: 'Enter a number',
        showStepper: true,
        min: 0,
        max: 100,
        step: 1,
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Quantity',
        placeholder: 'Enter quantity',
        showStepper: true,
        min: 0,
        max: 100,
    },
};

export const WithHelperText: Story = {
    args: {
        label: 'Age',
        placeholder: 'Enter age',
        helperText: 'Must be between 18 and 100',
        showStepper: true,
        min: 18,
        max: 100,
    },
};

export const Sizes = () => (
    <div className="flex flex-col gap-4 w-[300px]">
        <NumberInput size="sm" placeholder="Small" showStepper />
        <NumberInput size="default" placeholder="Default" showStepper />
        <NumberInput size="lg" placeholder="Large" showStepper />
    </div>
);

export const CustomStep: Story = {
    args: {
        label: 'Price',
        placeholder: 'Enter price',
        showStepper: true,
        min: 0,
        max: 1000,
        step: 0.5,
        isCurrency: true,
        currencySymbol: '$',
        decimalPlaces: 2,
    },
};

export const Currency = () => (
    <div className="flex flex-col gap-4 w-[300px]">
        <NumberInput
            label="USD"
            placeholder="Enter amount"
            isCurrency
            currencySymbol="$"
            decimalPlaces={2}
            showStepper
            step={0.01}
        />
        <NumberInput
            label="EUR"
            placeholder="Enter amount"
            isCurrency
            currencySymbol="€"
            decimalPlaces={2}
            thousandsSeparator="."
            decimalSeparator=","
            showStepper
            step={0.01}
        />
        <NumberInput
            label="JPY"
            placeholder="Enter amount"
            isCurrency
            currencySymbol="¥"
            decimalPlaces={0}
            showStepper
            step={1}
        />
    </div>
);

export const WithError: Story = {
    args: {
        label: 'Quantity',
        placeholder: 'Enter quantity',
        variant: 'error',
        helperText: 'This field is required',
        showStepper: true,
    },
};

export const CustomStyled: Story = {
    args: {
        label: 'Custom Styled Input',
        placeholder: 'Enter number',
        showStepper: true,
        sx: {
            '& input': {
                background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)',
                borderRadius: '0.75rem',
                borderColor: '#6366f1',
                '&:focus': {
                    borderColor: '#4f46e5',
                    boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
                },
            },
            '& button': {
                background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                color: 'white',
                '&:hover': {
                    background: 'linear-gradient(45deg, #4f46e5, #4338ca)',
                },
            },
        },
    },
}; 