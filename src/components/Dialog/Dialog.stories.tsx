import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Dialog, DialogFooter, DialogHeader} from './Dialog';
import {Button} from '../Button/Button';

const meta: Meta<typeof Dialog> = {
    title: 'Feedback/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Basic Dialog
export const Basic: Story = {
    render: function BasicRender() {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <DialogHeader
                        title="Basic Dialog"
                        description="A simple dialog with a title and description."
                    />
                    <div className="py-4">
                        <p className="text-slate-600 dark:text-slate-300">
                            This is a basic dialog example with a header and some content.
                            Click outside or press ESC to close.
                        </p>
                    </div>
                </Dialog>
            </>
        );
    },
};

// Sizes
export const Sizes: Story = {
    render: function SizesRender() {
        const [size, setSize] = React.useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <div className="flex gap-2">
                <Button onClick={() => { setSize('sm'); setIsOpen(true); }}>Small</Button>
                <Button onClick={() => { setSize('md'); setIsOpen(true); }}>Medium</Button>
                <Button onClick={() => { setSize('lg'); setIsOpen(true); }}>Large</Button>
                <Button onClick={() => { setSize('xl'); setIsOpen(true); }}>XLarge</Button>
                <Button onClick={() => { setSize('2xl'); setIsOpen(true); }}>2XLarge</Button>

                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    size={size}
                >
                    <DialogHeader
                        title={`${size.toUpperCase()} Dialog`}
                        description={`This is a ${size} sized dialog.`}
                    />
                    <div className="py-4">
                        <p className="text-slate-600 dark:text-slate-300">
                            The content area adjusts to the dialog size while maintaining
                            proper padding and spacing.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button>Continue</Button>
                    </DialogFooter>
                </Dialog>
            </div>
        );
    },
};

// Variants
export const Variants: Story = {
    render: function VariantsRender() {
        const [variant, setVariant] = React.useState<'default' | 'destructive'>('default');
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <div className="flex gap-2">
                <Button onClick={() => { setVariant('default'); setIsOpen(true); }}>
                    Default
                </Button>
                <Button
                    variant="destructive"
                    onClick={() => { setVariant('destructive'); setIsOpen(true); }}
                >
                    Destructive
                </Button>

                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    variant={variant}
                >
                    <DialogHeader
                        title={variant === 'destructive' ? 'Delete Account' : 'Edit Profile'}
                        description={
                            variant === 'destructive'
                                ? 'Are you sure you want to delete your account? This action cannot be undone.'
                                : 'Make changes to your profile here.'
                        }
                    />
                    <div className="py-4">
                        <p className="text-slate-600 dark:text-slate-300">
                            {variant === 'destructive'
                                ? 'All of your data will be permanently removed.'
                                : 'Your changes will be saved automatically.'
                            }
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant={variant === 'destructive' ? 'destructive' : 'default'}>
                            {variant === 'destructive' ? 'Delete Account' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        );
    },
};

// Backdrop Blur
export const BackdropBlur: Story = {
    render: function BlurRender() {
        const [blur, setBlur] = React.useState<'none' | 'sm' | 'md' | 'lg'>('sm');
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <div className="flex gap-2">
                <Button onClick={() => { setBlur('none'); setIsOpen(true); }}>No Blur</Button>
                <Button onClick={() => { setBlur('sm'); setIsOpen(true); }}>Small Blur</Button>
                <Button onClick={() => { setBlur('md'); setIsOpen(true); }}>Medium Blur</Button>
                <Button onClick={() => { setBlur('lg'); setIsOpen(true); }}>Large Blur</Button>

                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    blur={blur}
                >
                    <DialogHeader
                        title="Backdrop Blur"
                        description={`This dialog has a ${blur} backdrop blur effect.`}
                    />
                    <div className="py-4">
                        <p className="text-slate-600 dark:text-slate-300">
                            The backdrop blur effect adds depth to the dialog while
                            maintaining focus on the content.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsOpen(false)}>Close</Button>
                    </DialogFooter>
                </Dialog>
            </div>
        );
    },
};

// Custom Dialog
export const CustomDialog: Story = {
    render: function CustomRender() {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Custom Dialog</Button>
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    size="lg"
                    sx={{
                        background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                    }}
                >
                    <div className="text-white">
                        <h2 className="text-2xl font-bold">Custom Styled Dialog</h2>
                        <p className="mt-2 text-white/80">
                            This dialog uses custom styling through the sx prop.
                        </p>
                        <div className="mt-8 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                className="border-white/20 text-white hover:bg-white/10"
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-white/20 text-white hover:bg-white/30"
                                onClick={() => setIsOpen(false)}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </>
        );
    },
}; 