import {render} from '@testing-library/react';
import {vi} from 'vitest';
import CodeEditor from './CodeEditor';

// Mock all CodeMirror imports
vi.mock('@codemirror/state', () => ({
  EditorState: {
    create: vi.fn(() => ({})),
    readOnly: {
      of: vi.fn()
    }
  }
}));

const mockDestroy = vi.fn();

vi.mock('@codemirror/view', () => ({
  EditorView: class {
    static updateListener = {
      of: vi.fn((callback) => callback)
    };
    constructor() {
      return {
        destroy: mockDestroy
      };
    }
  },
  lineNumbers: vi.fn(),
  highlightActiveLineGutter: vi.fn(),
  highlightSpecialChars: vi.fn(),
  keymap: {
    of: vi.fn()
  }
}));

vi.mock('@codemirror/commands', () => ({
  defaultKeymap: [],
  history: vi.fn(),
  historyKeymap: []
}));

vi.mock('@codemirror/language', () => ({
  syntaxHighlighting: vi.fn(),
  defaultHighlightStyle: {},
  bracketMatching: vi.fn(),
  foldGutter: vi.fn(),
  indentOnInput: vi.fn(),
  LanguageSupport: vi.fn()
}));

// Mock one language as an example
vi.mock('@codemirror/lang-javascript', () => ({
  javascript: vi.fn(() => ({ extension: [] }))
}));

describe('CodeEditor', () => {
  beforeEach(() => {
    mockDestroy.mockClear();
  });

  it('renders with default props', () => {
    const { container } = render(<CodeEditor />);
    expect(container.firstChild).toHaveClass('border-slate-200');
  });

  it('applies different sizes', () => {
    const { container } = render(<CodeEditor size="sm" />);
    expect(container.firstChild).toHaveClass('min-h-[200px]');
  });

  it('applies ghost variant', () => {
    const { container } = render(<CodeEditor variant="ghost" />);
    expect(container.firstChild).toHaveClass('border-transparent', 'bg-transparent');
  });

  it('cleans up on unmount', () => {
    const { unmount } = render(<CodeEditor />);
    unmount();
    expect(mockDestroy).toHaveBeenCalled();
  });
}); 