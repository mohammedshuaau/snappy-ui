import {fireEvent, render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it} from 'vitest';
import {Popover, PopoverContent, PopoverTrigger} from './Popover';

// Mock ResizeObserver
class ResizeObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}

global.ResizeObserver = ResizeObserverMock;

describe('Popover', () => {
    beforeEach(() => {
        // Create portal root
        const portalRoot = document.createElement('div');
        portalRoot.setAttribute('id', 'portal-root');
        document.body.appendChild(portalRoot);
    });

    it('renders trigger element', () => {
        render(
            <Popover>
                <PopoverTrigger>Click me</PopoverTrigger>
                <PopoverContent>Content</PopoverContent>
            </Popover>
        );
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('shows content when trigger is clicked', () => {
        render(
            <Popover>
                <PopoverTrigger>Click me</PopoverTrigger>
                <PopoverContent>Content</PopoverContent>
            </Popover>
        );
        fireEvent.click(screen.getByText('Click me'));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    describe('PopoverTrigger', () => {
        it('applies focus styles', () => {
            render(
                <Popover>
                    <PopoverTrigger>Click me</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );
            const trigger = screen.getByText('Click me');
            expect(trigger).toHaveClass('focus:ring-2', 'focus:ring-primary-500', 'focus:ring-offset-2');
        });

        it('applies custom className', () => {
            render(
                <Popover>
                    <PopoverTrigger className="custom-trigger">Click me</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );
            expect(screen.getByText('Click me')).toHaveClass('custom-trigger');
        });
    });

    describe('PopoverContent', () => {
        it('renders with default side (bottom)', () => {
            render(
                <Popover>
                    <PopoverTrigger>Click me</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );
            fireEvent.click(screen.getByText('Click me'));
            const content = screen.getByRole('dialog');
            expect(content).toHaveAttribute('data-side', 'bottom');
        });

        it('renders with different sides', () => {
            const { rerender } = render(
                <Popover>
                    <PopoverTrigger>Click me</PopoverTrigger>
                    <PopoverContent side="top">Content</PopoverContent>
                </Popover>
            );
            fireEvent.click(screen.getByText('Click me'));
            let content = screen.getByRole('dialog');
            expect(content).toHaveAttribute('data-side', 'top');

            // Close the popover
            fireEvent.click(screen.getByText('Click me'));

            rerender(
                <Popover>
                    <PopoverTrigger>Click me</PopoverTrigger>
                    <PopoverContent side="right">Content</PopoverContent>
                </Popover>
            );

            // Open the popover again
            fireEvent.click(screen.getByText('Click me'));
            content = screen.getByRole('dialog');
            expect(content).toHaveAttribute('data-side', 'right');
        });

        it('applies custom sideOffset', () => {
            render(
                <Popover>
                    <PopoverTrigger>Click me</PopoverTrigger>
                    <PopoverContent sideOffset={8}>Content</PopoverContent>
                </Popover>
            );
            fireEvent.click(screen.getByText('Click me'));
            const content = screen.getByRole('dialog');
            expect(content).toBeInTheDocument();
        });

        it('renders arrow element', () => {
            render(
                <Popover>
                    <PopoverTrigger>Click me</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );
            fireEvent.click(screen.getByText('Click me'));
            const arrow = document.querySelector('svg.fill-white');
            expect(arrow).toBeInTheDocument();
            expect(arrow).toHaveClass('fill-white', 'dark:fill-gray-800');
        });

        it('applies custom className', () => {
            render(
                <Popover>
                    <PopoverTrigger>Click me</PopoverTrigger>
                    <PopoverContent className="custom-class">Content</PopoverContent>
                </Popover>
            );
            fireEvent.click(screen.getByText('Click me'));
            const content = screen.getByRole('dialog');
            expect(content.className).toContain('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Popover>
                    <PopoverTrigger>Click me</PopoverTrigger>
                    <PopoverContent
                        sx={{
                            backgroundColor: 'blue',
                            padding: '20px'
                        }}
                    >
                        Content
                    </PopoverContent>
                </Popover>
            );
            fireEvent.click(screen.getByText('Click me'));

            // Get the style element that was created
            const styleElements = document.getElementsByTagName('style');
            const lastStyleElement = styleElements[styleElements.length - 1];

            expect(lastStyleElement).toBeDefined();
            expect(lastStyleElement.textContent).toContain('background-color: blue');
            expect(lastStyleElement.textContent).toContain('padding: 20px');
        });
    });
}); 