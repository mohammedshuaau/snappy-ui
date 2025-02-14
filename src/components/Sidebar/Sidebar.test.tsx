import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {Sidebar} from './Sidebar';

const mockItems = [
  {
    label: 'Dashboard',
    icon: <span>📊</span>,
  },
  {
    label: 'Settings',
    icon: <span>⚙️</span>,
  },
  {
    label: 'Group',
    items: [
      { label: 'Item 1' },
      { label: 'Item 2' },
    ],
  },
];

describe('Sidebar', () => {
  it('renders with default props', () => {
    render(<Sidebar items={mockItems} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders brand content', () => {
    render(
      <Sidebar
        items={mockItems}
        brand={<div>Brand Logo</div>}
      />
    );
    expect(screen.getByText('Brand Logo')).toBeInTheDocument();
  });

  it('renders grouped items', () => {
    render(<Sidebar items={mockItems} />);
    expect(screen.getByText('Group')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('handles item click', () => {
    const onClick = vi.fn();
    const items = [{ label: 'Click Me', onClick }];
    
    render(<Sidebar items={items} />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(onClick).toHaveBeenCalled();
  });

  it('handles collapsible state', () => {
    render(
      <Sidebar
        items={mockItems}
        collapsible
        brand={<div>Brand</div>}
      />
    );
    
    const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i });
    expect(toggleButton).toBeInTheDocument();
    
    fireEvent.click(toggleButton);
    expect(screen.getByRole('complementary')).toHaveClass('w-16');
  });

  it('applies floating variant styles', () => {
    render(
      <Sidebar
        items={mockItems}
        variant="floating"
      />
    );
    expect(screen.getByRole('complementary')).toHaveClass('shadow-lg', 'rounded-lg');
  });

  it('renders active items correctly', () => {
    const items = [
      { label: 'Active Item', active: true },
      { label: 'Inactive Item', active: false },
    ];
    
    render(<Sidebar items={items} />);
    expect(screen.getByText('Active Item').closest('button')).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Inactive Item').closest('button')).not.toHaveAttribute('data-state', 'active');
  });
}); 