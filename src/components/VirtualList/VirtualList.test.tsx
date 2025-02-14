import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {VirtualList} from './VirtualList';

describe('VirtualList', () => {
  // Mock items
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
  }));

  // Mock render item function
  const renderItem = (item: any, index: number, style: React.CSSProperties) => (
    <div key={item.id} data-testid={`item-${index}`} style={style}>
      {item.title}
    </div>
  );

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial items within viewport', () => {
    render(
      <VirtualList
        items={items}
        height={300}
        itemHeight={50}
        renderItem={renderItem}
      />
    );

    // With a height of 300px and item height of 50px, we should see 6 items
    // plus overscan items (default overscan is 3)
    const renderedItems = screen.getAllByTestId(/^item-/);
    expect(renderedItems.length).toBeLessThanOrEqual(12); // 6 visible + 6 overscan
    expect(renderedItems.length).toBeGreaterThanOrEqual(6); // At least visible items
  });

  it('handles scroll events and updates visible items', () => {
    const { container } = render(
      <VirtualList
        items={items}
        height={300}
        itemHeight={50}
        renderItem={renderItem}
      />
    );

    const virtualList = container.firstChild as HTMLElement;

    // Mock scroll event
    Object.defineProperty(virtualList, 'scrollTop', { value: 200 });
    Object.defineProperty(virtualList, 'scrollHeight', { value: 1000 });
    Object.defineProperty(virtualList, 'clientHeight', { value: 300 });

    fireEvent.scroll(virtualList);

    // Wait for scroll handler
    act(() => {
      vi.runAllTimers();
    });

    // Check that items at new scroll position are rendered
    // const renderedItems = screen.getAllByTestId(/^item-/);
    const firstVisibleIndex = Math.floor(200 / 50); // scrollTop / itemHeight
    expect(screen.getByTestId(`item-${firstVisibleIndex}`)).toBeInTheDocument();
  });

  it('supports dynamic item heights', () => {
    const dynamicHeightFn = (item: any) => (item.id % 2 === 0 ? 50 : 75);

    render(
      <VirtualList
        items={items}
        height={300}
        itemHeight={dynamicHeightFn}
        renderItem={renderItem}
      />
    );

    const renderedItems = screen.getAllByTestId(/^item-/);
    const firstItem = renderedItems[0];
    const secondItem = renderedItems[1];

    expect(firstItem).toHaveStyle({ height: '50px' });
    expect(secondItem).toHaveStyle({ height: '75px' });
  });

  it('applies variant styles correctly', () => {
    const { container } = render(
      <VirtualList
        items={items}
        height={300}
        itemHeight={50}
        renderItem={renderItem}
        variant="contained"
      />
    );

    expect(container.firstChild).toHaveClass('border border-slate-200 dark:border-slate-700 rounded-lg');
  });

  it('respects overscan prop', () => {
    render(
      <VirtualList
        items={items}
        height={300}
        itemHeight={50}
        renderItem={renderItem}
        overscan={1}
      />
    );

    // With height 300px, item height 50px, and overscan 1:
    // We should see 6 visible items + 1 overscan item above and below
    const renderedItems = screen.getAllByTestId(/^item-/);
    expect(renderedItems.length).toBe(7); // 6 visible + 1 overscan
  });

  it('handles window scroll when useWindow is true', () => {
    render(
      <VirtualList
        items={items}
        height={300}
        itemHeight={50}
        renderItem={renderItem}
        useWindow={true}
      />
    );

    // Mock window scroll
    Object.defineProperty(window, 'scrollY', { value: 200 });
    Object.defineProperty(window, 'innerHeight', { value: 300 });

    fireEvent.scroll(window);

    // Wait for scroll handler
    act(() => {
      vi.runAllTimers();
    });

    // Check that items at new scroll position are rendered
    // const renderedItems = screen.getAllByTestId(/^item-/);
    const firstVisibleIndex = Math.floor(200 / 50); // scrollY / itemHeight
    expect(screen.getByTestId(`item-${firstVisibleIndex}`)).toBeInTheDocument();
  });

  it('applies custom styles through sx prop', () => {
    const { container } = render(
      <VirtualList
        items={items}
        height={300}
        itemHeight={50}
        renderItem={renderItem}
        sx={{ padding: '1rem' }}
      />
    );

    const styleElement = container.querySelector('style');
    expect(styleElement?.textContent).toContain('padding: 1rem');
  });
});