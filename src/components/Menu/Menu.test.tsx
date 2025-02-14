import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {Menu} from './Menu';

// Mock createPortal
vi.mock('react-dom', () => ({
    createPortal: (children: React.ReactNode) => children,
}));

describe('Menu', () => {
    const defaultItems = [
        { label: 'Item 1', onClick: vi.fn() },
        { label: 'Item 2', onClick: vi.fn() },
        { label: 'Item 3', disabled: true, onClick: vi.fn() },
        { label: 'Item 4', destructive: true, onClick: vi.fn() },
        { label: 'Item 5', icon: <span>🔔</span>, shortcut: '⌘+K', onClick: vi.fn() }
    ];

    beforeEach(() => {
        // Create portal root
        const portalRoot = document.createElement('div');
        portalRoot.setAttribute('id', 'portal-root');
        document.body.appendChild(portalRoot);

        // Mock getBoundingClientRect
        Element.prototype.getBoundingClientRect = vi.fn(() => ({
            width: 120,
            height: 40,
            top: 100,
            left: 100,
            bottom: 140,
            right: 220,
            x: 100,
            y: 100,
            toJSON: () => { }
        }));

        // Mock window scroll positions
        Object.defineProperty(window, 'scrollX', { value: 0, writable: true });
        Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    });

    it('renders nothing when closed', () => {
        render(<Menu items={defaultItems} open={false} />);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('renders menu items when open', () => {
        render(<Menu items={defaultItems} open={true} />);
        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();
        defaultItems.forEach(item => {
            expect(screen.getByText(item.label)).toBeInTheDocument();
        });
    });

    describe('variants', () => {
        it('renders default variant correctly', () => {
            render(<Menu items={defaultItems} open={true} variant="default" />);
            expect(screen.getByRole('menu')).toHaveClass('bg-white', 'text-slate-950');
        });

        it('renders destructive variant correctly', () => {
            render(<Menu items={defaultItems} open={true} variant="destructive" />);
            expect(screen.getByRole('menu')).toHaveClass('bg-red-50', 'text-red-900');
        });
    });

    describe('menu items', () => {
        it('handles item click', () => {
            render(<Menu items={defaultItems} open={true} />);
            fireEvent.click(screen.getByText('Item 1'));
            expect(defaultItems[0].onClick).toHaveBeenCalledTimes(1);
        });

        it('renders disabled items correctly', () => {
            render(<Menu items={defaultItems} open={true} />);
            const disabledItem = screen.getByText('Item 3').closest('div');
            expect(disabledItem).toHaveAttribute('data-disabled');
            expect(disabledItem).toHaveClass('data-[disabled]:pointer-events-none');
        });

        it('renders destructive items correctly', () => {
            render(<Menu items={defaultItems} open={true} />);
            const destructiveItem = screen.getByText('Item 4').closest('div');
            expect(destructiveItem).toHaveClass('text-red-700');
        });

        it('renders items with icons', () => {
            render(<Menu items={defaultItems} open={true} />);
            expect(screen.getByText('🔔')).toBeInTheDocument();
        });

        it('renders items with shortcuts', () => {
            render(<Menu items={defaultItems} open={true} />);
            expect(screen.getByText('⌘+K')).toBeInTheDocument();
        });
    });

    describe('keyboard navigation', () => {
        it('handles arrow key navigation', () => {
            render(<Menu items={defaultItems} open={true} />);
            const menu = screen.getByRole('menu');

            // Press arrow down
            fireEvent.keyDown(menu, { key: 'ArrowDown' });
            expect(screen.getByText('Item 1').closest('div')).toHaveAttribute('data-highlighted', 'true');

            // Press arrow down again
            fireEvent.keyDown(menu, { key: 'ArrowDown' });
            expect(screen.getByText('Item 2').closest('div')).toHaveAttribute('data-highlighted', 'true');

            // Press arrow up
            fireEvent.keyDown(menu, { key: 'ArrowUp' });
            expect(screen.getByText('Item 1').closest('div')).toHaveAttribute('data-highlighted', 'true');
        });

        it('handles Enter key selection', () => {
            const onClose = vi.fn();
            render(<Menu items={defaultItems} open={true} onClose={onClose} />);
            const menu = screen.getByRole('menu');

            // Navigate to first item
            fireEvent.keyDown(menu, { key: 'ArrowDown' });
            // Press Enter
            fireEvent.keyDown(menu, { key: 'Enter' });

            expect(defaultItems[0].onClick).toHaveBeenCalled();
            expect(onClose).toHaveBeenCalled();
        });

        it('handles Escape key to close menu', () => {
            const onClose = vi.fn();
            render(<Menu items={defaultItems} open={true} onClose={onClose} />);
            const menu = screen.getByRole('menu');

            fireEvent.keyDown(menu, { key: 'Escape' });
            expect(onClose).toHaveBeenCalled();
        });
    });

    describe('positioning', () => {
        it('positions relative to anchorEl', () => {
            const anchorEl = document.createElement('button');
            document.body.appendChild(anchorEl);

            render(<Menu items={defaultItems} open={true} anchorEl={anchorEl} />);
            const menu = screen.getByRole('menu');

            expect(menu.style.top).toBe('140px'); // anchorEl.bottom + scrollY
            expect(menu.style.left).toBe('100px'); // anchorEl.left + scrollX
        });

        it('positions at custom coordinates', () => {
            render(<Menu items={defaultItems} open={true} position={{ x: 200, y: 300 }} />);
            const menu = screen.getByRole('menu');

            expect(menu.style.top).toBe('300px');
            expect(menu.style.left).toBe('200px');
        });
    });

    describe('click outside behavior', () => {
        it('closes menu when clicking outside', () => {
            const onClose = vi.fn();
            render(<Menu items={defaultItems} open={true} onClose={onClose} />);

            fireEvent.mouseDown(document.body);
            expect(onClose).toHaveBeenCalled();
        });

        it('does not close menu when clicking inside', () => {
            const onClose = vi.fn();
            render(<Menu items={defaultItems} open={true} onClose={onClose} />);
            const menu = screen.getByRole('menu');

            fireEvent.mouseDown(menu);
            expect(onClose).not.toHaveBeenCalled();
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Menu items={defaultItems} open={true} className="custom-class" />);
            expect(screen.getByRole('menu')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Menu
                    items={defaultItems}
                    open={true}
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                />
            );

            const menu = screen.getByRole('menu');
            const computedStyle = window.getComputedStyle(menu);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
});
