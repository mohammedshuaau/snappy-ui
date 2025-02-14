import type { Meta, StoryObj } from '@storybook/react';
import {Markdown} from './Markdown';
import { CustomStyle } from '../../types/custom-style.types';

const meta = {
    title: 'Advanced/Markdown',
    component: Markdown,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A powerful markdown rendering component built with [react-markdown](https://github.com/remarkjs/react-markdown).
Features include GitHub Flavored Markdown support, syntax highlighting, and customizable styling.

Features:
- GitHub Flavored Markdown support
- Syntax highlighting for code blocks
- Multiple themes and variants
- HTML support (optional)
- Dark mode support
- Responsive typography
- Custom styling options

\`\`\`jsx
import { Markdown } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <Markdown
      content="# Hello World\nThis is a **markdown** example."
      theme="github"
      enableHighlight={true}
    />
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
            options: ['default', 'compact', 'article'],
        },
        theme: {
            control: 'select',
            options: ['default', 'github', 'documentation'],
        },
        allowHtml: {
            control: 'boolean',
        },
        enableHighlight: {
            control: 'boolean',
        },
        enableGfm: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicExample = `# Markdown Example

This is a basic markdown example with various features.

## Text Formatting

You can make text **bold**, *italic*, or ***both***. You can also use ~~strikethrough~~.

## Lists

Unordered list:
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

## Code

Inline code: \`const example = "hello";\`

Code block:
\`\`\`javascript
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
\`\`\`

## Links and Images

[Visit OpenAI](https://openai.com)

![Example Image](https://via.placeholder.com/150)

## Blockquotes

> This is a blockquote
> It can span multiple lines
>
> And have multiple paragraphs

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;

const htmlExample = `# HTML Support

<div style="padding: 1rem; background-color: #f8fafc; border-radius: 0.5rem;">
  <h2 style="color: #2563eb;">Custom HTML Content</h2>
  <p>This example demonstrates HTML support in markdown.</p>
  <ul>
    <li>Custom styling</li>
    <li>Interactive elements</li>
    <li>Complex layouts</li>
  </ul>
</div>

Regular markdown content still works:
- List item 1
- List item 2

\`\`\`html
<button class="btn">Click me</button>
\`\`\`
`;

export const Basic: Story = {
    args: {
        content: basicExample,
    },
};

export const WithHTML: Story = {
    args: {
        content: htmlExample,
        allowHtml: true,
    },
};

export const CompactVariant: Story = {
    args: {
        content: basicExample,
        variant: 'compact',
    },
};

export const ArticleVariant: Story = {
    args: {
        content: basicExample,
        variant: 'article',
    },
};

export const GithubTheme: Story = {
    args: {
        content: basicExample,
        theme: 'github',
    },
};

export const DocumentationTheme: Story = {
    args: {
        content: basicExample,
        theme: 'documentation',
    },
};

export const WithoutSyntaxHighlighting: Story = {
    args: {
        content: basicExample,
        enableHighlight: false,
    },
};

export const WithoutGfm: Story = {
    args: {
        content: basicExample,
        enableGfm: false,
    },
};

export const CustomStyled: StoryObj<typeof Markdown> = {
    args: {
        content: basicExample,
        sx: {
            padding: '2rem',
            backgroundColor: 'rgb(248 250 252)',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            '&:hover': {
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out',
            },
        } as CustomStyle,
    },
};