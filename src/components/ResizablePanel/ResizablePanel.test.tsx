import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {ResizablePanel} from './ResizablePanel';

describe('ResizablePanel', () => {
  const mockContent = <div>Panel Content</div>;
  const mockOnResize = vi.fn();

  beforeEach(() => {
    mockOnResize.mockClear();
  });

  it('renders with initial size', () => {
    const { container } = render(
      <ResizablePanel initialSize={200}>
        {mockContent}
      </ResizablePanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveStyle({ width: '200px' });
    expect(screen.getByText('Panel Content')).toBeInTheDocument();
  });

  it('renders with vertical direction', () => {
    const { container } = render(
      <ResizablePanel direction="vertical" initialSize={200}>
        {mockContent}
      </ResizablePanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveStyle({ height: '200px' });
  });

  it('handles resize events', () => {
    render(
      <ResizablePanel initialSize={200} onResize={mockOnResize}>
        {mockContent}
      </ResizablePanel>
    );

    const handle = screen.getByRole('separator');

    // Simulate drag start
    fireEvent.mouseDown(handle, { clientX: 200 });

    // Simulate drag
    fireEvent.mouseMove(document, { clientX: 300 });

    // Simulate drag end
    fireEvent.mouseUp(document);

    expect(mockOnResize).toHaveBeenCalled();
  });

  it('respects min and max size constraints', () => {
    render(
      <ResizablePanel
        initialSize={200}
        minSize={100}
        maxSize={300}
        onResize={mockOnResize}
      >
        {mockContent}
      </ResizablePanel>
    );

    const handle = screen.getByRole('separator');

    // Try to resize below min size
    fireEvent.mouseDown(handle, { clientX: 200 });
    fireEvent.mouseMove(document, { clientX: 50 });
    fireEvent.mouseUp(document);

    expect(mockOnResize).toHaveBeenCalledWith(100);

    // Try to resize above max size
    fireEvent.mouseDown(handle, { clientX: 200 });
    fireEvent.mouseMove(document, { clientX: 400 });
    fireEvent.mouseUp(document);

    expect(mockOnResize).toHaveBeenCalledWith(300);
  });

  it('handles collapsible behavior', () => {
    render(
      <ResizablePanel
        initialSize={200}
        minSize={100}
        collapsible
        onResize={mockOnResize}
      >
        {mockContent}
      </ResizablePanel>
    );

    const handle = screen.getByRole('separator');

    // Double click to collapse
    fireEvent.doubleClick(handle);
    expect(mockOnResize).toHaveBeenCalledWith(100);

    // Double click again to expand
    fireEvent.doubleClick(handle);
    expect(mockOnResize).toHaveBeenCalledWith(200);
  });

  it('applies variant styles correctly', () => {
    const { container } = render(
      <ResizablePanel variant="ghost" initialSize={200}>
        {mockContent}
      </ResizablePanel>
    );

    expect(container.firstChild).toHaveClass('bg-transparent');
  });

  it('shows resize handle by default', () => {
    render(
      <ResizablePanel initialSize={200}>
        {mockContent}
      </ResizablePanel>
    );

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('hides resize handle when showHandle is false', () => {
    render(
      <ResizablePanel initialSize={200} showHandle={false}>
        {mockContent}
      </ResizablePanel>
    );

    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  it('applies custom styles through sx prop', () => {
    const { container } = render(
      <ResizablePanel
        initialSize={200}
        sx={{ padding: '1rem' }}
      >
        {mockContent}
      </ResizablePanel>
    );

    const styleElement = container.querySelector('style');
    expect(styleElement?.textContent).toContain('padding: 1rem');
  });
}); 