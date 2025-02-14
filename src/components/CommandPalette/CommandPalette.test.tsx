import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {CommandPalette} from './CommandPalette';
import {Settings} from 'lucide-react';

// Mock cmdk (Command Menu)
vi.mock('cmdk', () => {
  const Command = ({ children, ...props }: any) => (
    <div role="dialog" {...props}>
      {children}
    </div>
  );
  
  Command.Input = (props: any) => <input {...props} />;
  Command.List = (props: any) => <div {...props} />;
  Command.Group = (props: any) => <div {...props} />;
  Command.Item = (props: any) => <div role="option" {...props} />;

  return { Command };
});

describe('CommandPalette', () => {
  const mockItems = [
    {
      id: 'settings',
      title: 'Settings',
      description: 'Manage settings',
      icon: <Settings className="h-4 w-4" />,
      category: 'System',
      action: vi.fn()
    },
    {
      id: 'profile',
      title: 'Profile',
      description: 'View profile',
      category: 'System',
      action: vi.fn()
    }
  ];

  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockItems.forEach(item => item.action.mockClear());
  });

  it('renders when open', () => {
    render(
      <CommandPalette
        items={mockItems}
        open={true}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByTestId('command-palette-overlay')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <CommandPalette
        items={mockItems}
        open={false}
        onClose={mockOnClose}
      />
    );
    expect(screen.queryByTestId('command-palette-overlay')).not.toBeInTheDocument();
  });

  it('closes when clicking overlay', () => {
    render(
      <CommandPalette
        items={mockItems}
        open={true}
        onClose={mockOnClose}
      />
    );
    fireEvent.click(screen.getByTestId('command-palette-overlay'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('applies variant styles', () => {
    render(
      <CommandPalette
        items={mockItems}
        open={true}
        onClose={mockOnClose}
        variant="blur"
      />
    );
    expect(screen.getByTestId('command-palette-overlay')).toHaveClass('backdrop-blur-sm');
  });

  it('applies size styles', () => {
    render(
      <CommandPalette
        items={mockItems}
        open={true}
        onClose={mockOnClose}
        size="sm"
      />
    );
    expect(screen.getByRole('dialog')).toHaveClass('h-[320px]');
  });
}); 