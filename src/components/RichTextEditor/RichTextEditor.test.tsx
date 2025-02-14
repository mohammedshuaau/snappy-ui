import {render} from '@testing-library/react';
import {vi} from 'vitest';
import {RichTextEditor} from './RichTextEditor';

// Mock the useEditor hook from TipTap
vi.mock('@tiptap/react', () => ({
  useEditor: vi.fn(() => ({
    getHTML: () => '<p>Test content</p>',
    isActive: () => false,
    chain: () => ({
      focus: () => ({
        toggleBold: () => ({ run: vi.fn() }),
        toggleItalic: () => ({ run: vi.fn() }),
        toggleUnderline: () => ({ run: vi.fn() }),
        setTextAlign: () => ({ run: vi.fn() }),
        setColor: () => ({ run: vi.fn() }),
      }),
    }),
  })),
  EditorContent: ({ children }: any) => (
    <div data-testid="editor-content">{children}</div>
  ),
}));

describe('RichTextEditor', () => {
  it('renders with default props', () => {
    const { container } = render(<RichTextEditor />);
    expect(container).toBeInTheDocument();
  });

  it('renders with custom value', () => {
    const { container } = render(
      <RichTextEditor value="<p>Test content</p>" />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders with label', () => {
    const { container } = render(
      <RichTextEditor label="Content Editor" />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    const { container } = render(<RichTextEditor disabled />);
    expect(container).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(<RichTextEditor size="sm" />);
    expect(container).toBeInTheDocument();
  });
}); 