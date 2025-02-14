import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from './Accordion';

describe('Accordion', () => {
    const renderAccordion = (props = {}) => {
        return render(
            <Accordion {...props}>
                <AccordionItem value="item-1">
                    <AccordionTrigger>First Item</AccordionTrigger>
                    <AccordionContent>First Content</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Second Item</AccordionTrigger>
                    <AccordionContent>Second Content</AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    };

    it('renders with default props', () => {
        renderAccordion();
        expect(screen.getByText('First Item')).toBeInTheDocument();
        expect(screen.getByText('Second Item')).toBeInTheDocument();
        expect(screen.getByText('First Content')).toBeInTheDocument();
        expect(screen.getByText('Second Content')).toBeInTheDocument();
    });

    describe('variants', () => {
        it('renders default variant correctly', () => {
            renderAccordion({ variant: 'default' });
            const accordion = screen.getByTestId('accordion-root');
            expect(accordion).toHaveClass('border', 'border-gray-200');
        });

        it('renders ghost variant correctly', () => {
            renderAccordion({ variant: 'ghost' });
            const accordion = screen.getByTestId('accordion-root');
            expect(accordion).not.toHaveClass('border', 'border-gray-200');
        });
    });

    describe('single selection mode', () => {
        it('expands only one item at a time', async () => {
            const user = userEvent.setup();
            renderAccordion();

            const firstTrigger = screen.getByRole('button', { name: /first item/i });
            const secondTrigger = screen.getByRole('button', { name: /second item/i });

            await user.click(firstTrigger);
            expect(firstTrigger.getAttribute('aria-expanded')).toBe('true');
            expect(secondTrigger.getAttribute('aria-expanded')).toBe('false');

            await user.click(secondTrigger);
            expect(firstTrigger.getAttribute('aria-expanded')).toBe('false');
            expect(secondTrigger.getAttribute('aria-expanded')).toBe('true');
        });

        it('collapses expanded item when clicked again', async () => {
            const user = userEvent.setup();
            renderAccordion();

            const trigger = screen.getByRole('button', { name: /first item/i });
            await user.click(trigger);
            expect(trigger.getAttribute('aria-expanded')).toBe('true');

            await user.click(trigger);
            expect(trigger.getAttribute('aria-expanded')).toBe('false');
        });
    });

    describe('multiple selection mode', () => {
        it('allows multiple items to be expanded', async () => {
            const user = userEvent.setup();
            renderAccordion({ multiple: true });

            const firstTrigger = screen.getByRole('button', { name: /first item/i });
            const secondTrigger = screen.getByRole('button', { name: /second item/i });

            await user.click(firstTrigger);
            await user.click(secondTrigger);

            expect(firstTrigger.getAttribute('aria-expanded')).toBe('true');
            expect(secondTrigger.getAttribute('aria-expanded')).toBe('true');
        });
    });

    describe('controlled mode', () => {
        it('handles value changes correctly', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();

            renderAccordion({
                value: 'item-1',
                onValueChange,
            });

            const trigger = screen.getByRole('button', { name: /first item/i });
            await user.click(trigger);

            expect(onValueChange).toHaveBeenCalledWith('');
        });

        it('handles multiple value changes correctly', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();

            renderAccordion({
                multiple: true,
                value: ['item-1'],
                onValueChange,
            });

            const secondTrigger = screen.getByRole('button', { name: /second item/i });
            await user.click(secondTrigger);

            expect(onValueChange).toHaveBeenCalledWith(['item-1', 'item-2']);
        });
    });

    describe('disabled state', () => {
        it('prevents interaction with disabled items', async () => {
            const user = userEvent.setup();
            render(
                <Accordion>
                    <AccordionItem value="item-1" disabled>
                        <AccordionTrigger>Disabled Item</AccordionTrigger>
                        <AccordionContent>Disabled Content</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const trigger = screen.getByRole('button', { name: /disabled item/i });
            expect(trigger).toBeDisabled();

            await user.click(trigger);
            expect(trigger.getAttribute('aria-expanded')).toBe('false');
        });
    });

    describe('custom icons', () => {
        it('renders custom expand/collapse icons', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <AccordionTrigger
                            expandIcon={<span data-testid="expand-icon">+</span>}
                            collapseIcon={<span data-testid="collapse-icon">-</span>}
                        >
                            Custom Icons
                        </AccordionTrigger>
                        <AccordionContent>Content</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const trigger = screen.getByRole('button');
            expect(screen.getByTestId('collapse-icon')).toBeInTheDocument();

            // Click to expand
            fireEvent.click(trigger);
            expect(screen.getByTestId('expand-icon')).toBeInTheDocument();
        });
    });

    describe('styling', () => {
        it('applies custom styles through sx prop', () => {
            render(
                <Accordion
                    sx={{
                        backgroundColor: 'red',
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                    data-testid="styled-accordion"
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item</AccordionTrigger>
                        <AccordionContent>Content</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const accordion = screen.getByTestId('styled-accordion');
            const computedStyle = window.getComputedStyle(accordion);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');

            // Check if hover styles are added
            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });

        it('applies custom className', () => {
            render(
                <Accordion className="custom-class">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item</AccordionTrigger>
                        <AccordionContent>Content</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const accordion = screen.getByTestId('accordion-root');
            expect(accordion).toHaveClass('custom-class');
        });
    });
}); 