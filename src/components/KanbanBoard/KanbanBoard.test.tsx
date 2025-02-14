import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import KanbanBoard from './KanbanBoard';

describe('KanbanBoard', () => {
  const mockColumns = [
    {
      id: 'todo',
      title: 'To Do',
      cards: [
        {
          id: 'card1',
          title: 'Task 1',
          description: 'Description 1',
          labels: ['Priority'],
        },
        {
          id: 'card2',
          title: 'Task 2',
          labels: ['Bug'],
        },
      ],
    },
    {
      id: 'doing',
      title: 'In Progress',
      cards: [],
    },
  ];

  const mockHandlers = {
    onCardMove: vi.fn(),
    onColumnAdd: vi.fn(),
    onColumnRemove: vi.fn(),
    onCardAdd: vi.fn(),
    onCardRemove: vi.fn(),
    onCardClick: vi.fn(),
    onCardDragStart: vi.fn(),
    onCardDragEnd: vi.fn(),
    onCardMenuOpen: vi.fn(),
  };

  beforeEach(() => {
    Object.values(mockHandlers).forEach(handler => handler.mockClear());
  });

  it('renders columns and cards', () => {
    render(<KanbanBoard columns={mockColumns} />);
    
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('handles card click', () => {
    render(
      <KanbanBoard 
        columns={mockColumns} 
        onCardClick={mockHandlers.onCardClick}
      />
    );

    fireEvent.click(screen.getByText('Task 1'));
    expect(mockHandlers.onCardClick).toHaveBeenCalledWith(mockColumns[0].cards[0]);
  });

  it('handles column removal', () => {
    render(
      <KanbanBoard 
        columns={mockColumns} 
        onColumnRemove={mockHandlers.onColumnRemove}
      />
    );

    const removeButtons = screen.getAllByRole('button', { name: /remove column/i });
    fireEvent.click(removeButtons[0]);
    
    expect(mockHandlers.onColumnRemove).toHaveBeenCalledWith(mockColumns[0].id);
  });

  it('handles card menu open', () => {
    render(
      <KanbanBoard 
        columns={mockColumns} 
        onCardMenuOpen={mockHandlers.onCardMenuOpen}
      />
    );

    const menuButtons = screen.getAllByRole('button', { name: /card menu/i });
    fireEvent.click(menuButtons[0]);
    
    expect(mockHandlers.onCardMenuOpen).toHaveBeenCalledWith(mockColumns[0].cards[0]);
  });

  it('applies variant styles', () => {
    render(
      <KanbanBoard 
        columns={mockColumns} 
        variant="compact"
      />
    );

    expect(screen.getByTestId('kanban-board')).toHaveClass('p-2');
  });
}); 