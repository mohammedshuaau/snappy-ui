import type {Meta, StoryObj} from '@storybook/react';
import {CodeEditor} from './CodeEditor';

const meta = {
    title: 'Advanced/CodeEditor',
    component: CodeEditor,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A powerful code editor component built with [CodeMirror](https://codemirror.net/). 
Features include syntax highlighting for multiple languages, line numbers, dark theme support, 
and customizable styling.

Features:
- Syntax highlighting for multiple languages (JavaScript, TypeScript, JSX, HTML, CSS, and more)
- Line numbers
- Dark theme support
- Read-only mode
- Auto-completion (optional)
- Custom styling options
- Ghost variant for transparent background
- Multiple size variants

\`\`\`jsx
import { CodeEditor } from '@mohammedshuaau/snappy-ui';

function Example() {
  return (
    <CodeEditor
      value="const greeting = 'Hello, World!';"
      language="javascript"
      darkTheme={false}
      showLineNumbers={true}
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
        language: {
            control: 'select',
            options: [
                'javascript',
                'typescript',
                'jsx',
                'tsx',
                'html',
                'css',
                'json',
                'markdown',
                'python',
                'sql',
                'xml',
                'rust',
                'cpp',
                'java',
                'php',
                'yaml',
            ],
        },
        variant: {
            control: 'select',
            options: ['default', 'ghost'],
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg', 'xl'],
        },
        darkTheme: {
            control: 'boolean',
        },
        readOnly: {
            control: 'boolean',
        },
        showLineNumbers: {
            control: 'boolean',
        },
        enableAutocompletion: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof CodeEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const jsExample = `// Example JavaScript code
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
const results = [];
for (let i = 0; i < 10; i++) {
    results.push(fibonacci(i));
}
console.log(results);`;

const pythonExample = `# Example Python code
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Calculate first 10 Fibonacci numbers
results = [fibonacci(i) for i in range(10)]
print(results)`;

const htmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example</title>
    <style>
        body {
            font-family: system-ui;
            margin: 2rem;
        }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is an example HTML document.</p>
</body>
</html>`;

export const JavaScript: Story = {
    args: {
        value: jsExample,
        language: 'javascript',
    },
};

export const TypeScript: Story = {
    args: {
        value: jsExample.replace('function fibonacci(n)', 'function fibonacci(n: number): number'),
        language: 'typescript',
    },
};

export const Python: Story = {
    args: {
        value: pythonExample,
        language: 'python',
    },
};

export const HTML: Story = {
    args: {
        value: htmlExample,
        language: 'html',
    },
};

export const DarkTheme: Story = {
    args: {
        value: jsExample,
        language: 'javascript',
        darkTheme: true,
    },
};

export const ReadOnly: Story = {
    args: {
        value: jsExample,
        language: 'javascript',
        readOnly: true,
    },
};

export const NoLineNumbers: Story = {
    args: {
        value: jsExample,
        language: 'javascript',
        showLineNumbers: false,
    },
};

export const CustomSized: Story = {
    args: {
        value: jsExample,
        language: 'javascript',
        size: 'lg',
    },
};

export const GhostVariant: Story = {
    args: {
        value: jsExample,
        language: 'javascript',
        variant: 'ghost',
    },
};

export const CustomStyled: Story = {
    args: {
        value: jsExample,
        language: 'javascript',
        sx: {
            maxWidth: '600px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        },
    },
}; 