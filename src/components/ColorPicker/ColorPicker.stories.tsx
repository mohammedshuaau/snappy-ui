import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {FormProvider, useForm} from 'react-hook-form';

import {ColorPicker} from './ColorPicker';

const meta = {
    title: 'Form/ColorPicker',
    component: ColorPicker,
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
        format: {
            control: 'select',
            options: ['hex', 'rgb', 'hsl'],
        },
    },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [color, setColor] = useState('#000000');
        return (
            <div className="w-[300px]">
                <ColorPicker
                    name="color"
                    value={color}
                    onChange={setColor}
                />
            </div>
        );
    }
};

export const WithLabel: Story = {
    render: () => {
        const [color, setColor] = useState('#000000');
        return (
            <div className="w-[300px]">
                <ColorPicker
                    label="Brand Color"
                    name="brandColor"
                    value={color}
                    onChange={setColor}
                />
            </div>
        );
    }
};

export const WithHelperText: Story = {
    render: () => {
        const [color, setColor] = useState('#000000');
        return (
            <div className="w-[300px]">
                <ColorPicker
                    label="Theme Color"
                    helperText="Select your primary theme color"
                    name="themeColor"
                    value={color}
                    onChange={setColor}
                />
            </div>
        );
    }
};

export const WithCustomColors: Story = {
    render: () => {
        const [color, setColor] = useState('#000000');
        const customColors = [
            '#1a365d', '#2a4365', '#2c5282', '#2b6cb0', '#2b6cb0', '#3182ce',
            '#63b3ed', '#90cdf4', '#bee3f8', '#ebf8ff', '#fff5f5', '#fed7d7',
            '#feb2b2', '#fc8181', '#f56565', '#e53e3e', '#c53030', '#9b2c2c',
        ];

        return (
            <div className="w-[300px]">
                <ColorPicker
                    label="Custom Colors"
                    name="customColor"
                    value={color}
                    onChange={setColor}
                    colors={customColors}
                />
            </div>
        );
    }
};

export const WithOpacity: Story = {
    render: () => {
        const [color, setColor] = useState('#000000');
        return (
            <div className="w-[300px]">
                <ColorPicker
                    label="Color with Opacity"
                    name="colorWithOpacity"
                    value={color}
                    onChange={setColor}
                    showAlpha
                />
            </div>
        );
    }
};

export const DifferentFormats: Story = {
    render: () => {
        const [colors, setColors] = useState({
            hex: '#000000',
            rgb: 'rgb(0,0,0)',
            hsl: 'hsl(0,0%,0%)',
        });

        return (
            <div className="space-y-4 w-[300px]">
                <ColorPicker
                    label="HEX Format"
                    name="hexColor"
                    value={colors.hex}
                    onChange={(color) => setColors(prev => ({ ...prev, hex: color }))}
                    format="hex"
                />
                <ColorPicker
                    label="RGB Format"
                    name="rgbColor"
                    value={colors.rgb}
                    onChange={(color) => setColors(prev => ({ ...prev, rgb: color }))}
                    format="rgb"
                />
                <ColorPicker
                    label="HSL Format"
                    name="hslColor"
                    value={colors.hsl}
                    onChange={(color) => setColors(prev => ({ ...prev, hsl: color }))}
                    format="hsl"
                />
            </div>
        );
    }
};

export const WithError: Story = {
    render: () => {
        const methods = useForm({
            defaultValues: {
                color: '#000000',
            },
        });

        methods.setError('color', {
            type: 'required',
            message: 'Color is required',
        });

        return (
            <FormProvider {...methods}>
                <div className="w-[300px]">
                    <ColorPicker
                        label="Color"
                        name="color"
                        variant="error"
                    />
                </div>
            </FormProvider>
        );
    }
};

export const Disabled: Story = {
    render: () => {
        const [color, setColor] = useState('#000000');
        return (
            <div className="w-[300px]">
                <ColorPicker
                    label="Disabled Color"
                    name="disabledColor"
                    value={color}
                    onChange={setColor}
                    disabled
                />
            </div>
        );
    }
};

export const Sizes: Story = {
    render: () => {
        const [colors, setColors] = useState({
            small: '#000000',
            default: '#000000',
            large: '#000000',
        });

        return (
            <div className="space-y-4 w-[300px]">
                <ColorPicker
                    label="Small"
                    size="sm"
                    name="small"
                    value={colors.small}
                    onChange={(color) => setColors(prev => ({ ...prev, small: color }))}
                />
                <ColorPicker
                    label="Default"
                    name="default"
                    value={colors.default}
                    onChange={(color) => setColors(prev => ({ ...prev, default: color }))}
                />
                <ColorPicker
                    label="Large"
                    size="lg"
                    name="large"
                    value={colors.large}
                    onChange={(color) => setColors(prev => ({ ...prev, large: color }))}
                />
            </div>
        );
    }
};

export const CustomStyled: Story = {
    render: () => {
        const [color, setColor] = useState('#000000');
        return (
            <div className="w-[300px]">
                <ColorPicker
                    label="Custom Styled"
                    name="customStyled"
                    value={color}
                    onChange={setColor}
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