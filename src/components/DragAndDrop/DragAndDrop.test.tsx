import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {Draggable, Droppable} from './DragAndDrop';

describe('DragAndDrop', () => {
  const mockItem = {
    id: '1',
    type: 'test-item',
    data: { title: 'Test Item' }
  };

  describe('Draggable', () => {
    it('renders with required props', () => {
      render(
        <Draggable id={mockItem.id} type={mockItem.type} data={mockItem.data} index={0}>
          <div>Draggable Content</div>
        </Draggable>
      );
      expect(screen.getByText('Draggable Content')).toBeInTheDocument();
    });

    it('shows drag handle when enabled', () => {
      render(
        <Draggable id={mockItem.id} type={mockItem.type} data={mockItem.data} index={0} showHandle>
          <div>Draggable Content</div>
        </Draggable>
      );
      expect(screen.getByTestId('drag-handle')).toBeInTheDocument();
    });

    it('applies disabled styles when disabled', () => {
      render(
        <Draggable id={mockItem.id} type={mockItem.type} data={mockItem.data} index={0} disabled>
          <div>Draggable Content</div>
        </Draggable>
      );
      expect(screen.getByRole('button')).toHaveClass('opacity-50');
    });
  });

  describe('Droppable', () => {
    const mockOnDrop = vi.fn();

    beforeEach(() => {
      mockOnDrop.mockClear();
    });

    it('renders with required props', () => {
      render(
        <Droppable id="test-drop" accepts={['test-item']}>
          <div>Droppable Content</div>
        </Droppable>
      );
      expect(screen.getByText('Droppable Content')).toBeInTheDocument();
    });

    it('handles drop events', () => {
      render(
        <Droppable id="test-drop" accepts={['test-item']} onDrop={mockOnDrop}>
          <div>Drop here</div>
        </Droppable>
      );

      const droppable = screen.getByRole('region');
      
      // Mock drag data
      const mockDataTransfer = {
        getData: () => JSON.stringify(mockItem),
        dropEffect: 'none',
        effectAllowed: 'all'
      };

      // Simulate drag and drop
      fireEvent.dragOver(droppable, { 
        dataTransfer: mockDataTransfer,
        preventDefault: vi.fn()
      });
      fireEvent.drop(droppable, { 
        dataTransfer: mockDataTransfer,
        preventDefault: vi.fn()
      });

      expect(mockOnDrop).toHaveBeenCalledWith(expect.objectContaining({
        item: mockItem,
        destination: expect.any(Object)
      }));
    });

    it('ignores drops of invalid types', () => {
      render(
        <Droppable id="test-drop" accepts={['other-type']} onDrop={mockOnDrop}>
          <div>Drop here</div>
        </Droppable>
      );

      const droppable = screen.getByRole('region');
      
      // Mock drag data with wrong type
      const mockDataTransfer = {
        getData: () => JSON.stringify({ ...mockItem, type: 'wrong-type' }),
        dropEffect: 'none',
        effectAllowed: 'all'
      };

      // Simulate drag and drop
      fireEvent.dragOver(droppable, { 
        dataTransfer: mockDataTransfer,
        preventDefault: vi.fn()
      });
      fireEvent.drop(droppable, { 
        dataTransfer: mockDataTransfer,
        preventDefault: vi.fn()
      });

      expect(mockOnDrop).not.toHaveBeenCalled();
    });
  });
});