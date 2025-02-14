import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {List} from './List';

describe('List', () => {
    it('renders with default props', () => {
        render(
            <List>
                <li>Item 1</li>
                <li>Item 2</li>
            </List>
        );
        const list = screen.getByRole('list');
        expect(list).toBeInTheDocument();
        expect(list).toHaveClass('list-disc', 'list-outside', 'space-y-2');
    });

    describe('variants', () => {
        const variants = {
            default: '',
            ordered: 'list-decimal',
            unordered: 'list-disc',
            none: 'list-none'
        } as const;

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(
                    <List variant={variant as keyof typeof variants}>
                        <li>Item 1</li>
                    </List>
                );
                const list = screen.getByRole('list');
                if (expectedClass) {
                    expect(list).toHaveClass(expectedClass);
                }
            });
        });
    });

    describe('spacing', () => {
        const spacings = {
            compact: 'space-y-1',
            default: 'space-y-2',
            relaxed: 'space-y-4'
        } as const;

        Object.entries(spacings).forEach(([spacing, expectedClass]) => {
            it(`renders ${spacing} spacing correctly`, () => {
                render(
                    <List spacing={spacing as keyof typeof spacings}>
                        <li>Item 1</li>
                        <li>Item 2</li>
                    </List>
                );
                expect(screen.getByRole('list')).toHaveClass(expectedClass);
            });
        });
    });

    describe('marker position', () => {
        const markers = {
            inside: 'list-inside',
            outside: 'list-outside'
        } as const;

        Object.entries(markers).forEach(([marker, expectedClass]) => {
            it(`renders ${marker} marker position correctly`, () => {
                render(
                    <List marker={marker as keyof typeof markers}>
                        <li>Item 1</li>
                    </List>
                );
                expect(screen.getByRole('list')).toHaveClass(expectedClass);
            });
        });
    });

    describe('ordered and unordered lists', () => {
        it('renders as ordered list when ordered prop is true', () => {
            render(
                <List ordered>
                    <li>Item 1</li>
                </List>
            );
            const list = screen.getByRole('list');
            expect(list.tagName.toLowerCase()).toBe('ol');
            expect(list).toHaveClass('list-decimal');
        });

        it('renders as unordered list by default', () => {
            render(
                <List>
                    <li>Item 1</li>
                </List>
            );
            const list = screen.getByRole('list');
            expect(list.tagName.toLowerCase()).toBe('ul');
            expect(list).toHaveClass('list-disc');
        });
    });

    describe('nested lists', () => {
        it('applies nested styles correctly', () => {
            render(
                <List>
                    <li>
                        Parent item
                        <List nested>
                            <li>Nested item</li>
                        </List>
                    </li>
                </List>
            );
            const lists = screen.getAllByRole('list');
            expect(lists[1]).toHaveClass('mt-2');
        });

        it('supports mixed ordered and unordered nested lists', () => {
            render(
                <List>
                    <li>
                        Parent item
                        <List nested ordered>
                            <li>Nested ordered item</li>
                        </List>
                    </li>
                </List>
            );
            const lists = screen.getAllByRole('list');
            expect(lists[0].tagName.toLowerCase()).toBe('ul');
            expect(lists[1].tagName.toLowerCase()).toBe('ol');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(
                <List className="custom-class">
                    <li>Item 1</li>
                </List>
            );
            expect(screen.getByRole('list')).toHaveClass('custom-class');
        });

        it('combines variant classes with custom className', () => {
            render(
                <List variant="ordered" className="custom-class">
                    <li>Item 1</li>
                </List>
            );
            const list = screen.getByRole('list');
            expect(list).toHaveClass('custom-class', 'list-decimal');
        });
    });
}); 