import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {Dialog, DialogFooter, DialogHeader} from './Dialog';

// Setup portal root for dialog
beforeEach(() => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);
});

afterEach(() => {
    const portalRoot = document.getElementById('portal-root');
    if (portalRoot?.parentElement) {
        portalRoot.parentElement.removeChild(portalRoot);
    }
    document.body.style.overflow = '';
});

describe('Dialog', () => {
    it('renders when open is true', () => {
        render(
            <Dialog open>
                <div>Dialog Content</div>
            </Dialog>
        );
        expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    });

    it('does not render when open is false', () => {
        render(
            <Dialog open={false}>
                <div>Dialog Content</div>
            </Dialog>
        );
        expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
    });

    describe('variants', () => {
        it('renders default variant correctly', () => {
            render(
                <Dialog open variant="default">
                    <div>Dialog Content</div>
                </Dialog>
            );
            const dialog = screen.getByRole('dialog');
            expect(dialog).toHaveClass('bg-white');
        });

        it('renders destructive variant correctly', () => {
            render(
                <Dialog open variant="destructive">
                    <div>Dialog Content</div>
                </Dialog>
            );
            const dialog = screen.getByRole('dialog');
            expect(dialog).toHaveClass('bg-red-50');
        });
    });

    describe('sizes', () => {
        const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
        sizes.forEach((size) => {
            it(`renders ${size} size correctly`, () => {
                render(
                    <Dialog open size={size}>
                        <div>Dialog Content</div>
                    </Dialog>
                );
                const dialog = screen.getByRole('dialog');
                expect(dialog).toHaveClass(`w-full max-w-${size}`);
            });
        });

        it('renders screen-sm size correctly', () => {
            render(
                <Dialog open size="screen-sm">
                    <div>Dialog Content</div>
                </Dialog>
            );
            const dialog = screen.getByRole('dialog');
            expect(dialog).toHaveClass('w-screen h-[calc(100vh-4rem)]');
        });
    });

    describe('backdrop blur', () => {
        const blurs = ['none', 'sm', 'md', 'lg'] as const;
        blurs.forEach((blur) => {
            it(`applies ${blur} blur correctly`, () => {
                render(
                    <Dialog open blur={blur}>
                        <div>Dialog Content</div>
                    </Dialog>
                );
                const backdrop = screen.getByRole('presentation');
                if (blur === 'none') {
                    expect(backdrop).not.toHaveClass('backdrop-blur');
                } else {
                    expect(backdrop).toHaveClass(`backdrop-blur-${blur}`);
                }
            });
        });
    });

    describe('close behavior', () => {
        it('calls onClose when clicking outside if closeOnClickOutside is true', async () => {
            const onClose = vi.fn();
            render(
                <Dialog open onClose={onClose} closeOnClickOutside>
                    <div>Dialog Content</div>
                </Dialog>
            );
            const backdrop = screen.getByRole('presentation');
            await userEvent.click(backdrop);
            expect(onClose).toHaveBeenCalled();
        });

        it('does not call onClose when clicking outside if closeOnClickOutside is false', async () => {
            const onClose = vi.fn();
            render(
                <Dialog open onClose={onClose} closeOnClickOutside={false}>
                    <div>Dialog Content</div>
                </Dialog>
            );
            const backdrop = screen.getByRole('presentation');
            await userEvent.click(backdrop);
            expect(onClose).not.toHaveBeenCalled();
        });

        it('calls onClose when pressing escape if closeOnEscape is true', () => {
            const onClose = vi.fn();
            render(
                <Dialog open onClose={onClose} closeOnEscape>
                    <div>Dialog Content</div>
                </Dialog>
            );
            fireEvent.keyDown(document, { key: 'Escape' });
            expect(onClose).toHaveBeenCalled();
        });

        it('does not call onClose when pressing escape if closeOnEscape is false', () => {
            const onClose = vi.fn();
            render(
                <Dialog open onClose={onClose} closeOnEscape={false}>
                    <div>Dialog Content</div>
                </Dialog>
            );
            fireEvent.keyDown(document, { key: 'Escape' });
            expect(onClose).not.toHaveBeenCalled();
        });

        it('shows close button when showCloseButton is true', () => {
            render(
                <Dialog open showCloseButton onClose={() => { }}>
                    <div>Dialog Content</div>
                </Dialog>
            );
            expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
        });

        it('hides close button when showCloseButton is false', () => {
            render(
                <Dialog open showCloseButton={false}>
                    <div>Dialog Content</div>
                </Dialog>
            );
            expect(screen.queryByRole('button', { name: /close dialog/i })).not.toBeInTheDocument();
        });
    });

    describe('scroll lock', () => {
        it('locks scroll when dialog opens', () => {
            render(
                <Dialog open>
                    <div>Dialog Content</div>
                </Dialog>
            );
            expect(document.body.style.overflow).toBe('hidden');
        });

        it('unlocks scroll when dialog closes', () => {
            const { rerender } = render(
                <Dialog open>
                    <div>Dialog Content</div>
                </Dialog>
            );
            expect(document.body.style.overflow).toBe('hidden');

            rerender(
                <Dialog open={false}>
                    <div>Dialog Content</div>
                </Dialog>
            );
            expect(document.body.style.overflow).toBe('');
        });

        it('unlocks scroll on unmount', () => {
            const { unmount } = render(
                <Dialog open>
                    <div>Dialog Content</div>
                </Dialog>
            );
            expect(document.body.style.overflow).toBe('hidden');
            unmount();
            expect(document.body.style.overflow).toBe('');
        });
    });

    describe('DialogHeader', () => {
        it('renders title and description', () => {
            render(
                <Dialog open>
                    <DialogHeader title="Test Title" description="Test Description" />
                </Dialog>
            );
            expect(screen.getByText('Test Title')).toBeInTheDocument();
            expect(screen.getByText('Test Description')).toBeInTheDocument();
        });

        it('renders children when no title or description provided', () => {
            render(
                <Dialog open>
                    <DialogHeader>
                        <div>Custom Header Content</div>
                    </DialogHeader>
                </Dialog>
            );
            expect(screen.getByText('Custom Header Content')).toBeInTheDocument();
        });
    });

    describe('DialogFooter', () => {
        it('renders with correct layout classes', () => {
            render(
                <Dialog open>
                    <DialogFooter data-testid="dialog-footer">
                        <button>Cancel</button>
                        <button>Submit</button>
                    </DialogFooter>
                </Dialog>
            );
            expect(screen.getByTestId('dialog-footer')).toHaveClass('flex', 'flex-col-reverse', 'sm:flex-row', 'sm:justify-end', 'sm:gap-2');
        });

        it('renders children in correct order', () => {
            render(
                <Dialog open>
                    <DialogFooter>
                        <button>Cancel</button>
                        <button>Submit</button>
                    </DialogFooter>
                </Dialog>
            );
            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveTextContent('Cancel');
            expect(buttons[1]).toHaveTextContent('Submit');
        });
    });

    describe('accessibility', () => {
        it('has correct ARIA attributes', () => {
            render(
                <Dialog open>
                    <div>Dialog Content</div>
                </Dialog>
            );
            const dialog = screen.getByRole('dialog');
            expect(dialog).toHaveAttribute('aria-modal', 'true');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(
                <Dialog open className="custom-class">
                    <div>Dialog Content</div>
                </Dialog>
            );
            expect(screen.getByRole('dialog')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Dialog
                    open
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                >
                    <div>Dialog Content</div>
                </Dialog>
            );
            const dialog = screen.getByRole('dialog');
            const computedStyle = window.getComputedStyle(dialog);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
});