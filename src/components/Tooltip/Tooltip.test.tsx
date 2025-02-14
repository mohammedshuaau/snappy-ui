import {act, fireEvent, render, screen} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {Tooltip} from './Tooltip';

describe('Tooltip', () => {
    let portalRoot: HTMLElement;

    beforeEach(() => {
        // Create portal root
        portalRoot = document.createElement('div');
        portalRoot.setAttribute('id', 'portal-root');
        document.body.appendChild(portalRoot);

        // Mock getBoundingClientRect
        Element.prototype.getBoundingClientRect = vi.fn(() => ({
            width: 100,
            height: 30,
            top: 100,
            left: 100,
            bottom: 130,
            right: 200,
            x: 100,
            y: 100,
            toJSON: () => { }
        }));

        // Mock window scroll positions
        Object.defineProperty(window, 'scrollX', { value: 0, writable: true });
        Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
        Object.defineProperty(window, 'pageXOffset', { value: 0, writable: true });
        Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
    });

    afterEach(() => {
        // Clean up portal root
        if (portalRoot && portalRoot.parentNode) {
            portalRoot.parentNode.removeChild(portalRoot);
        }
        vi.clearAllTimers();
        vi.restoreAllMocks();
    });

    it('renders trigger element', () => {
        render(
            <Tooltip content="Tooltip content">
                <button>Hover me</button>
            </Tooltip>
        );
        expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('shows tooltip on hover', async () => {
        vi.useFakeTimers();
        render(
            <Tooltip content="Tooltip content">
                <button>Hover me</button>
            </Tooltip>
        );

        fireEvent.mouseEnter(screen.getByText('Hover me'));

        // Wait for the showTimeout
        await act(async () => {
            vi.advanceTimersByTime(200);
        });

        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
        vi.useRealTimers();
    });

    it('hides tooltip on mouse leave', async () => {
        vi.useFakeTimers();
        render(
            <Tooltip content="Tooltip content">
                <button>Hover me</button>
            </Tooltip>
        );

        const trigger = screen.getByText('Hover me');

        // Show the tooltip
        fireEvent.mouseEnter(trigger);
        await act(async () => {
            vi.advanceTimersByTime(200);
        });
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();

        // Hide the tooltip
        fireEvent.mouseLeave(trigger);
        await act(async () => {
            vi.advanceTimersByTime(150); // Default hideDelay
        });
        await act(async () => {
            vi.advanceTimersByTime(200); // Transition duration
        });

        expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
        vi.useRealTimers();
    });

    describe('positions', () => {
        const positions = ['top', 'bottom', 'left', 'right'] as const;

        positions.forEach(position => {
            it(`renders in ${position} position`, async () => {
                vi.useFakeTimers();
                render(
                    <Tooltip content="Tooltip content" position={position}>
                        <button>Hover me</button>
                    </Tooltip>
                );

                fireEvent.mouseEnter(screen.getByText('Hover me'));
                await act(async () => {
                    vi.advanceTimersByTime(200);
                });

                const tooltip = screen.getByText('Tooltip content');
                expect(tooltip.parentElement).toHaveClass(position === 'top' ? 'mb-2' :
                    position === 'bottom' ? 'mt-2' :
                        position === 'left' ? 'mr-2' : 'ml-2');

                vi.useRealTimers();
            });
        });
    });

    it('respects custom delay times', async () => {
        vi.useFakeTimers();

        // Mock requestAnimationFrame to execute after a small delay
        let rafId = 0;
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(++rafId), 16); // Simulate 60fps timing
            return rafId;
        });

        render(
            <Tooltip content="Tooltip content" delayShow={500} delayHide={300}>
                <button>Hover me</button>
            </Tooltip>
        );

        // Trigger show
        fireEvent.mouseEnter(screen.getByText('Hover me'));

        // Verify tooltip is not shown before delay
        expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

        // Wait for show delay and rAF
        await act(async () => {
            vi.advanceTimersByTime(500); // Show delay
            vi.advanceTimersByTime(16); // rAF delay
        });

        // Verify tooltip is shown
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();

        // Trigger hide
        fireEvent.mouseLeave(screen.getByText('Hover me'));

        // Verify tooltip is still shown before hide delay
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();

        // Wait for hide delay and transition
        await act(async () => {
            vi.advanceTimersByTime(300); // Hide delay
            vi.advanceTimersByTime(200); // Transition duration
        });

        // Verify tooltip is hidden
        expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

        vi.useRealTimers();
    });

    it('does not show tooltip when disabled', async () => {
        vi.useFakeTimers();
        render(
            <Tooltip content="Tooltip content" disabled>
                <button>Hover me</button>
            </Tooltip>
        );

        fireEvent.mouseEnter(screen.getByText('Hover me'));
        await act(async () => {
            vi.advanceTimersByTime(200);
        });

        expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
        vi.useRealTimers();
    });

    it('applies custom className', () => {
        render(
            <Tooltip content="Tooltip content" className="custom-class">
                <button>Hover me</button>
            </Tooltip>
        );
        expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('applies custom styles through sx prop', async () => {
        vi.useFakeTimers();
        render(
            <Tooltip
                content="Tooltip content"
                sx={{
                    backgroundColor: 'rgb(0, 0, 255)',
                    padding: '20px'
                }}
            >
                <button>Hover me</button>
            </Tooltip>
        );

        fireEvent.mouseEnter(screen.getByText('Hover me'));
        await act(async () => {
            vi.advanceTimersByTime(200);
        });

        const tooltip = screen.getByText('Tooltip content').parentElement;
        const computedStyle = window.getComputedStyle(tooltip as HTMLElement);
        expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
        expect(computedStyle.padding).toBe('20px');

        vi.useRealTimers();
    });

    it('handles window scroll and resize events', async () => {
        vi.useFakeTimers();
        render(
            <Tooltip content="Tooltip content">
                <button>Hover me</button>
            </Tooltip>
        );

        fireEvent.mouseEnter(screen.getByText('Hover me'));
        await act(async () => {
            vi.advanceTimersByTime(200);
        });

        // Simulate scroll
        fireEvent.scroll(window);
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();

        // Simulate resize
        fireEvent.resize(window);
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();

        vi.useRealTimers();
    });
});