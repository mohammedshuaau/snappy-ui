import {act, fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {InfiniteScroll} from './InfiniteScroll';

describe('InfiniteScroll', () => {
  const mockLoadMore = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    mockLoadMore.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children', () => {
    render(
      <InfiniteScroll onLoadMore={mockLoadMore} hasMore={true}>
        <div>Test content</div>
      </InfiniteScroll>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <InfiniteScroll onLoadMore={mockLoadMore} hasMore={true} isLoading={true}>
        <div>Content</div>
      </InfiniteScroll>
    );
    expect(screen.getByRole('feed')).toHaveAttribute('aria-busy', 'true');
  });

  it('shows end message when no more items', () => {
    render(
      <InfiniteScroll onLoadMore={mockLoadMore} hasMore={false}>
        <div>Content</div>
      </InfiniteScroll>
    );
    expect(screen.getByText('No more items to load')).toBeInTheDocument();
  });

  it('shows error message when error occurs', () => {
    render(
      <InfiniteScroll 
        onLoadMore={mockLoadMore} 
        hasMore={true} 
        error={new Error('Test error')}
      >
        <div>Content</div>
      </InfiniteScroll>
    );
    expect(screen.getByText('Error loading items. Please try again.')).toBeInTheDocument();
  });

  it('triggers load more when scrolling near bottom', async () => {
    const { container } = render(
      <InfiniteScroll 
        onLoadMore={mockLoadMore} 
        hasMore={true}
        variant="contained"
        useWindow={false}
      >
        <div style={{ height: '1000px' }}>Tall content</div>
      </InfiniteScroll>
    );

    // Mock scroll event
    Object.defineProperty(container.firstChild!, 'scrollHeight', { value: 1000 });
    Object.defineProperty(container.firstChild!, 'clientHeight', { value: 500 });
    Object.defineProperty(container.firstChild!, 'scrollTop', { value: 400 });

    fireEvent.scroll(container.firstChild!);

    // Wait for scroll handler
    act(() => {
      vi.runAllTimers();
    });

    expect(mockLoadMore).toHaveBeenCalled();
  });
}); 