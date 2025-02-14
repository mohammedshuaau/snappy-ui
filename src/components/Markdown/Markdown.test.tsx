import { render, screen } from '@testing-library/react';
import {Markdown} from './Markdown';

describe('Markdown', () => {
  const basicContent = '# Hello\nThis is a **bold** text';

  it('renders basic markdown content', () => {
    render(<Markdown content={basicContent} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello');
    expect(screen.getByText(/This is a/)).toBeInTheDocument();
    expect(screen.getByText('bold')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    const { container } = render(
      <Markdown content={basicContent} variant="article" />
    );

    expect(container.firstChild).toHaveClass('prose-base sm:prose-lg');
  });

  it('applies theme styles correctly', () => {
    const { container } = render(
      <Markdown content={basicContent} theme="github" />
    );

    expect(container.firstChild).toHaveClass('prose-headings:border-b prose-headings:pb-2');
  });

  it('renders GitHub Flavored Markdown when enabled', () => {
    render(
      <Markdown
        content="- [x] Task 1\n- [ ] Task 2"
        enableGfm={true}
      />
    );

    const checkbox = screen.getByRole('checkbox', { checked: true });
    expect(checkbox).toBeInTheDocument();
  });

  it('disables GitHub Flavored Markdown when specified', () => {
    render(
      <Markdown
        content="- [x] Task 1\n- [ ] Task 2"
        enableGfm={false}
      />
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('renders HTML content when allowed', () => {
    render(
      <Markdown
        content="<span data-testid='html-content'>HTML content</span>"
        allowHtml={true}
      />
    );

    expect(screen.getByTestId('html-content')).toBeInTheDocument();
    expect(screen.getByText('HTML content')).toBeInTheDocument();
  });

  it('sanitizes HTML content when not allowed', () => {
    render(
      <Markdown
        content="<div data-testid='html-content'>HTML content</div>"
        allowHtml={false}
      />
    );

    expect(screen.queryByTestId('html-content')).not.toBeInTheDocument();
  });

  it('applies custom styles through sx prop', () => {
    const { container } = render(
      <Markdown
        content={basicContent}
        sx={{ padding: '1rem' }}
      />
    );

    const styleElement = container.querySelector('style');
    expect(styleElement?.textContent).toContain('padding: 1rem');
  });
}); 