import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {Dropdown, DropdownItem, DropdownMenu} from './Dropdown';
import {Button} from '../Button/Button';

// Mock createPortal
const mockCreatePortal = vi.fn((children: React.ReactNode) => children);
vi.mock('react-dom', () => ({
    createPortal: (children: React.ReactNode) => mockCreatePortal(children),
}));

describe('Dropdown', () => {
    const BasicDropdown = ({ isOpen = false, onClose = () => { } }) => (
        <Dropdown
            open={isOpen}
            onClose={onClose}
            trigger={<Button>Toggle</Button>}
        >
            <DropdownMenu>
                <DropdownItem>Item 1</DropdownItem>
                <DropdownItem>Item 2</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders with default props', () => {
        render(<BasicDropdown />);
        expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
    });

    describe('trigger behavior', () => {
        it('shows dropdown content when open is true', () => {
            render(<BasicDropdown isOpen={true} />);
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });

        it('hides dropdown content when open is false', () => {
            render(<BasicDropdown isOpen={false} />);
            expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
        });

        it('calls onClose when clicking outside', async () => {
            const onClose = vi.fn();
            render(<BasicDropdown isOpen={true} onClose={onClose} />);

            fireEvent.mouseDown(document.body);
            expect(onClose).toHaveBeenCalled();
        });
    });

    describe('keyboard interaction', () => {
        it('closes on escape key press', () => {
            const onClose = vi.fn();
            render(<BasicDropdown isOpen={true} onClose={onClose} />);

            fireEvent.keyDown(document, { key: 'Escape' });
            expect(onClose).toHaveBeenCalled();
        });
    });

    describe('DropdownMenu', () => {
        it('renders with default variant', () => {
            render(
                <Dropdown open={true} trigger={<Button>Toggle</Button>}>
                    <DropdownMenu data-testid="menu">
                        <DropdownItem>Item</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
            const menu = screen.getByTestId('menu');
            expect(menu).toHaveClass('bg-white');
        });

        it('renders with destructive variant', () => {
            render(
                <Dropdown open={true} trigger={<Button>Toggle</Button>}>
                    <DropdownMenu variant="destructive" data-testid="menu">
                        <DropdownItem>Item</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
            const menu = screen.getByTestId('menu');
            expect(menu).toHaveClass('bg-red-50');
        });

        it('applies custom styles through sx prop', async () => {
            render(
                <Dropdown open={true} trigger={<Button>Toggle</Button>}>
                    <DropdownMenu
                        data-testid="menu"
                        style={{
                            backgroundColor: 'rgb(0, 0, 255)',
                            padding: '20px'
                        }}
                    >
                        <DropdownItem>Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            const menu = screen.getByTestId('menu');
            expect(menu).toHaveStyle({
                backgroundColor: 'rgb(0, 0, 255)',
                padding: '20px'
            });
        });
    });

    describe('DropdownItem', () => {
        it('renders with default variant', () => {
            render(
                <Dropdown open={true} trigger={<Button>Toggle</Button>}>
                    <DropdownMenu>
                        <DropdownItem data-testid="item">Item</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
            const item = screen.getByTestId('item');
            expect(item).toHaveClass('text-slate-700');
        });

        it('renders with destructive variant', () => {
            render(
                <Dropdown open={true} trigger={<Button>Toggle</Button>}>
                    <DropdownMenu>
                        <DropdownItem variant="destructive" data-testid="item">Item</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
            const item = screen.getByTestId('item');
            expect(item).toHaveClass('text-red-700');
        });

        it('handles disabled state', () => {
            render(<DropdownItem disabled data-testid="item">Item 1</DropdownItem>);
            const item = screen.getByTestId('item');
            expect(item).toBeDisabled();
            expect(item).toHaveClass('data-[disabled]:pointer-events-none', 'data-[disabled]:opacity-50');
        });

        it('renders with icon', () => {
            const icon = <span data-testid="icon">🔍</span>;
            render(
                <Dropdown open={true} trigger={<Button>Toggle</Button>}>
                    <DropdownMenu>
                        <DropdownItem icon={icon}>Item</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
            expect(screen.getByTestId('icon')).toBeInTheDocument();
        });

        it('handles click events', async () => {
            const onClick = vi.fn();
            const user = userEvent.setup();

            render(
                <Dropdown open={true} trigger={<Button>Toggle</Button>}>
                    <DropdownMenu>
                        <DropdownItem onClick={onClick}>Item</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await user.click(screen.getByText('Item'));
            expect(onClick).toHaveBeenCalled();
        });
    });

    describe('positioning', () => {
        it('updates position on scroll', () => {
            const triggerRect = {
                bottom: 100,
                left: 50,
                right: 150,
                top: 80,
                width: 100,
                height: 20,
                x: 50,
                y: 80,
                toJSON: () => { }
            };

            const getBoundingClientRect = vi.fn(() => triggerRect);
            Element.prototype.getBoundingClientRect = getBoundingClientRect;

            render(<BasicDropdown isOpen={true} />);

            fireEvent.scroll(window);

            expect(getBoundingClientRect).toHaveBeenCalled();
        });

        it('updates position on resize', () => {
            const triggerRect = {
                bottom: 100,
                left: 50,
                right: 150,
                top: 80,
                width: 100,
                height: 20,
                x: 50,
                y: 80,
                toJSON: () => { }
            };

            const getBoundingClientRect = vi.fn(() => triggerRect);
            Element.prototype.getBoundingClientRect = getBoundingClientRect;

            render(<BasicDropdown isOpen={true} />);

            fireEvent.resize(window);

            expect(getBoundingClientRect).toHaveBeenCalled();
        });
    });

    describe('animation states', () => {
        it('applies correct animation states when opening', async () => {
            const { rerender } = render(<BasicDropdown isOpen={false} />);

            await act(async () => {
                rerender(<BasicDropdown isOpen={true} />);
            });

            const menu = screen.getByRole('button', { name: 'Item 1' }).closest('[data-state]');
            expect(menu).toHaveAttribute('data-state', 'open');
        });

        it('applies correct animation states when closing', async () => {
            const { rerender } = render(
                <Dropdown open={true} trigger={<Button>Toggle</Button>}>
                    <DropdownMenu>
                        <DropdownItem>Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            await act(async () => {
                rerender(
                    <Dropdown open={false} trigger={<Button>Toggle</Button>}>
                        <DropdownMenu>
                            <DropdownItem>Item 1</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );
                await new Promise(resolve => setTimeout(resolve, 300)); // Wait for animation
            });

            const menu = screen.queryByRole('menu');
            expect(menu).not.toBeInTheDocument();
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(
                <Dropdown
                    open={true}
                    trigger={<Button>Toggle</Button>}
                    className="custom-class"
                    data-testid="dropdown"
                >
                    <DropdownMenu>
                        <DropdownItem>Item</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
            expect(screen.getByTestId('dropdown')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Dropdown
                    open={true}
                    trigger={<Button>Toggle</Button>}
                    data-testid="dropdown"
                    style={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                >
                    <DropdownMenu>
                        <DropdownItem>Item 1</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );

            const dropdown = screen.getByTestId('dropdown');
            expect(dropdown).toHaveStyle({
                backgroundColor: 'rgb(0, 0, 255)',
                padding: '20px'
            });
        });
    });
}); 