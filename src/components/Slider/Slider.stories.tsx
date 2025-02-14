import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Slider} from './Slider';

const meta = {
    title: 'Form/Slider',
    component: Slider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'primary', 'success', 'warning', 'error'],
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg'],
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
        showMarks: {
            control: 'boolean',
        },
        showLabels: {
            control: 'boolean',
        },
        showTooltip: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = React.useState(50);
        return (
            <Slider
                defaultValue={50}
                value={value}
                onValueChange={(val) => setValue(Array.isArray(val) ? val[0] : val)}
                className="w-[300px]"
            />
        );
    }
};

export const WithMarks: Story = {
    render: () => {
        const [value, setValue] = React.useState(50);
        return (
            <Slider
                value={value}
                onValueChange={(val) => setValue(Array.isArray(val) ? val[0] : val)}
                showMarks
                showLabels
                className="w-[300px]"
                marks={[
                    { value: 0, label: '0°C' },
                    { value: 25, label: '25°C' },
                    { value: 50, label: '50°C' },
                    { value: 75, label: '75°C' },
                    { value: 100, label: '100°C' },
                ]}
            />
        );
    }
};

export const Range: Story = {
    render: () => {
        const [value, setValue] = React.useState([25, 75]);
        return (
            <Slider
                value={value}
                onValueChange={(val) => setValue(Array.isArray(val) ? val : [val, val])}
                showMarks
                showTooltip
                className="w-[300px]"
            />
        );
    }
};

export const Variants = () => {
    const [values, setValues] = React.useState({
        default: 50,
        primary: 60,
        success: 70,
        warning: 80,
        error: 90,
    });

    return (
        <div className="flex flex-col gap-8 w-[300px]">
            <Slider
                value={values.default}
                onValueChange={(val) => setValues(prev => ({ ...prev, default: Array.isArray(val) ? val[0] : val }))}
                variant="default"
                showTooltip
            />
            <Slider
                value={values.primary}
                onValueChange={(val) => setValues(prev => ({ ...prev, primary: Array.isArray(val) ? val[0] : val }))}
                variant="primary"
                showTooltip
            />
            <Slider
                value={values.success}
                onValueChange={(val) => setValues(prev => ({ ...prev, success: Array.isArray(val) ? val[0] : val }))}
                variant="success"
                showTooltip
            />
            <Slider
                value={values.warning}
                onValueChange={(val) => setValues(prev => ({ ...prev, warning: Array.isArray(val) ? val[0] : val }))}
                variant="warning"
                showTooltip
            />
            <Slider
                value={values.error}
                onValueChange={(val) => setValues(prev => ({ ...prev, error: Array.isArray(val) ? val[0] : val }))}
                variant="error"
                showTooltip
            />
        </div>
    );
};

export const Sizes = () => {
    const [values, setValues] = React.useState({
        sm: 30,
        default: 50,
        lg: 70,
    });

    return (
        <div className="flex flex-col gap-8 w-[300px]">
            <Slider
                value={values.sm}
                onValueChange={(val) => setValues(prev => ({ ...prev, sm: Array.isArray(val) ? val[0] : val }))}
                size="sm"
                showTooltip
            />
            <Slider
                value={values.default}
                onValueChange={(val) => setValues(prev => ({ ...prev, default: Array.isArray(val) ? val[0] : val }))}
                size="default"
                showTooltip
            />
            <Slider
                value={values.lg}
                onValueChange={(val) => setValues(prev => ({ ...prev, lg: Array.isArray(val) ? val[0] : val }))}
                size="lg"
                showTooltip
            />
        </div>
    );
};

export const StepValues = () => {
    const [value, setValue] = React.useState(50);

    return (
        <div className="flex flex-col gap-8 w-[300px]">
            <Slider
                value={value}
                onValueChange={(val) => setValue(Array.isArray(val) ? val[0] : val)}
                step={10}
                showMarks
                showLabels
                showTooltip
                marks={[
                    { value: 0, label: '0%' },
                    { value: 20, label: '20%' },
                    { value: 40, label: '40%' },
                    { value: 60, label: '60%' },
                    { value: 80, label: '80%' },
                    { value: 100, label: '100%' },
                ]}
            />
        </div>
    );
};

export const CustomFormatting: Story = {
    render: () => {
        const [value, setValue] = React.useState(500);
        return (
            <Slider
                value={value}
                onValueChange={(val) => setValue(Array.isArray(val) ? val[0] : val)}
                showTooltip
                showMarks
                showLabels
                className="w-[300px]"
                min={0}
                max={1000}
                step={100}
                formatValue={(value) => `$${value.toLocaleString()}`}
                marks={[
                    { value: 0, label: '$0' },
                    { value: 250, label: '$250' },
                    { value: 500, label: '$500' },
                    { value: 750, label: '$750' },
                    { value: 1000, label: '$1000' },
                ]}
            />
        );
    }
};

export const CustomStyled: Story = {
    render: () => {
        const [value, setValue] = React.useState(50);
        return (
            <Slider
                value={value}
                onValueChange={(val) => setValue(Array.isArray(val) ? val[0] : val)}
                showTooltip
                showMarks
                className="w-[300px]"
                sx={{
                    '[data-thumb]': {
                        background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                        borderColor: '#4f46e5',
                        borderWidth: '2px',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #4f46e5, #4338ca)',
                            transform: 'scale(1.1)',
                        },
                    },
                    '[role="slider"]': {
                        '&:focus': {
                            outline: 'none',
                            boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
                        },
                    },
                    '[data-orientation="horizontal"]': {
                        height: '20px',
                    },
                    '[role="track"]': {
                        background: 'linear-gradient(to right, #e5e7eb, #f3f4f6)',
                        height: '4px',
                        borderRadius: '9999px',
                    },
                    '[role="range"]': {
                        background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                        height: '100%',
                        borderRadius: '9999px',
                    },
                    '[data-disabled]': {
                        opacity: '0.5',
                    },
                }}
                marks={[
                    { value: 0, label: '0' },
                    { value: 25, label: '25' },
                    { value: 50, label: '50' },
                    { value: 75, label: '75' },
                    { value: 100, label: '100' },
                ]}
            />
        );
    }
}; 