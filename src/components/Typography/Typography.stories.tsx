import type {Meta, StoryObj} from '@storybook/react';
import {Typography} from './Typography';

const meta = {
    title: 'Data Display/Typography',
    component: Typography,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A versatile Typography component that supports various text styles, weights, sizes, and transformations.

Features:
- Multiple semantic variants (h1-h6, p, blockquote, code, etc.)
- Customizable text sizes
- Font weights from thin to black
- Text alignment options
- Text transformations
- Text decorations
- Line clamping
- Dark mode support
- HTML content support
- Polymorphic component (can render as any HTML element)

\`\`\`jsx
import { Typography } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <Typography 
      variant="h1" 
      weight="bold" 
      align="center"
    >
      Hello World
    </Typography>
  );
}
\`\`\`
`,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'p', 'blockquote', 'code', 'lead',
                'large', 'small', 'muted', 'subtle',
            ],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
        },
        weight: {
            control: 'select',
            options: [
                'thin', 'extralight', 'light', 'normal',
                'medium', 'semibold', 'bold', 'extrabold', 'black',
            ],
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right', 'justify'],
        },
        transform: {
            control: 'select',
            options: ['uppercase', 'lowercase', 'capitalize', 'normal'],
        },
        decoration: {
            control: 'select',
            options: ['underline', 'line-through', 'no-underline'],
        },
    },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
        </div>
    ),
};

export const TextStyles: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography variant="p">
                Default paragraph text with good line height for readability.
            </Typography>
            <Typography variant="lead">
                Lead text is slightly larger and has a different color.
            </Typography>
            <Typography variant="large">
                Large text is bigger than normal but smaller than headings.
            </Typography>
            <Typography variant="small">
                Small text is useful for labels and captions.
            </Typography>
            <Typography variant="muted">
                Muted text is used for less important content.
            </Typography>
            <Typography variant="subtle">
                Subtle text has a softer color but maintains readability.
            </Typography>
        </div>
    ),
};

export const BlockElements: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography variant="blockquote">
                This is a blockquote. It has a left border and is italicized.
            </Typography>
            <Typography variant="code">
                const example = "This is a code block";
            </Typography>
        </div>
    ),
};

export const FontSizes: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography size="xs">Extra Small Text</Typography>
            <Typography size="sm">Small Text</Typography>
            <Typography size="base">Base Text</Typography>
            <Typography size="lg">Large Text</Typography>
            <Typography size="xl">Extra Large Text</Typography>
            <Typography size="2xl">2XL Text</Typography>
            <Typography size="3xl">3XL Text</Typography>
            <Typography size="4xl">4XL Text</Typography>
            <Typography size="5xl">5XL Text</Typography>
            <Typography size="6xl">6XL Text</Typography>
        </div>
    ),
};

export const FontWeights: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography weight="thin">Thin Text</Typography>
            <Typography weight="extralight">Extra Light Text</Typography>
            <Typography weight="light">Light Text</Typography>
            <Typography weight="normal">Normal Text</Typography>
            <Typography weight="medium">Medium Text</Typography>
            <Typography weight="semibold">Semibold Text</Typography>
            <Typography weight="bold">Bold Text</Typography>
            <Typography weight="extrabold">Extra Bold Text</Typography>
            <Typography weight="black">Black Text</Typography>
        </div>
    ),
};

export const TextAlignment: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography align="left">Left aligned text</Typography>
            <Typography align="center">Center aligned text</Typography>
            <Typography align="right">Right aligned text</Typography>
            <Typography align="justify">
                Justified text that spans multiple lines. This text is long enough
                to demonstrate how justified alignment works.
            </Typography>
        </div>
    ),
};

export const TextTransformations: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography transform="uppercase">Uppercase Text</Typography>
            <Typography transform="lowercase">Lowercase Text</Typography>
            <Typography transform="capitalize">capitalized text</Typography>
            <Typography transform="normal">Normal Case Text</Typography>
        </div>
    ),
};

export const TextDecorations: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography decoration="underline">Underlined Text</Typography>
            <Typography decoration="line-through">Strikethrough Text</Typography>
            <Typography decoration="no-underline">No Decoration Text</Typography>
        </div>
    ),
};

export const LineClamp: Story = {
    render: () => (
        <div className="space-y-8 max-w-md">
            <Typography lineClamp={2}>
                This is a long text that will be clamped to 2 lines. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris.
            </Typography>
            <Typography lineClamp={3}>
                This is a long text that will be clamped to 3 lines. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </Typography>
        </div>
    ),
};

export const Truncate: Story = {
    render: () => (
        <div className="max-w-md">
            <Typography truncate>
                This is a very long text that will be truncated with an ellipsis
                at the end instead of wrapping to the next line.
            </Typography>
        </div>
    ),
};

export const WithHTML: Story = {
    render: () => (
        <Typography
            html="This text contains <strong>bold</strong> and <em>italic</em> HTML elements."
        />
    ),
};

export const Polymorphic: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography as="span" variant="lead">
                This renders as a span
            </Typography>
            <Typography as="div" variant="large">
                This renders as a div
            </Typography>
            <Typography as="label" variant="small">
                This renders as a label
            </Typography>
        </div>
    ),
}; 