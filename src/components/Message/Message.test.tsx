import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Message} from './Message';

describe('Message', () => {
    it('renders with default props', () => {
        render(<Message>Test message</Message>);
        const message = screen.getByRole('status');
        expect(message).toBeInTheDocument();
        expect(message).toHaveTextContent('Test message');
        expect(message).toHaveClass('bg-gray-100', 'text-gray-800');
    });

    describe('variants', () => {
        const variants = {
            default: ['bg-gray-100', 'text-gray-800'],
            info: ['bg-blue-100', 'text-blue-800'],
            success: ['bg-green-100', 'text-green-800'],
            warning: ['bg-yellow-100', 'text-yellow-800'],
            error: ['bg-red-100', 'text-red-800']
        } as const;

        Object.entries(variants).forEach(([variant, expectedClasses]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(
                    <Message variant={variant as keyof typeof variants}>
                        {variant} message
                    </Message>
                );
                const message = screen.getByRole('status');
                expectedClasses.forEach(className => {
                    expect(message).toHaveClass(className);
                });
            });
        });

        it('renders default icons for variants except default', () => {
            const variantsWithIcons = ['info', 'success', 'warning', 'error'];
            variantsWithIcons.forEach(variant => {
                const { container } = render(
                    <Message variant={variant as keyof typeof variants}>
                        {variant} message
                    </Message>
                );
                expect(container.querySelector('svg')).toBeInTheDocument();
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            sm: ['text-xs', 'py-1', 'px-2'],
            md: ['text-sm', 'py-2', 'px-3'],
            lg: ['text-base', 'py-3', 'px-4']
        } as const;

        Object.entries(sizes).forEach(([size, expectedClasses]) => {
            it(`renders ${size} size correctly`, () => {
                render(
                    <Message size={size as keyof typeof sizes}>
                        {size} message
                    </Message>
                );
                const message = screen.getByRole('status');
                expectedClasses.forEach(className => {
                    expect(message).toHaveClass(className);
                });
            });

            it(`renders ${size} icon size correctly`, () => {
                render(
                    <Message
                        size={size as keyof typeof sizes}
                        variant="info"
                    >
                        {size} message with icon
                    </Message>
                );
                const icon = screen.getByRole('status').querySelector('svg');
                const expectedIconClass = size === 'sm' ? 'w-3 h-3' :
                    size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
                expect(icon?.parentElement).toHaveClass(expectedIconClass);
            });
        });
    });

    it('renders custom icon', () => {
        const customIcon = <span data-testid="custom-icon">🌟</span>;
        render(
            <Message icon={customIcon}>
                Message with custom icon
            </Message>
        );
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(
            <Message className="custom-class">
                Message with custom class
            </Message>
        );
        expect(screen.getByRole('status')).toHaveClass('custom-class');
    });

    it('applies custom styles through sx prop', () => {
        render(
            <Message
                sx={{
                    backgroundColor: 'rgb(0, 0, 255)',
                    padding: '20px'
                }}
            >
                Styled message
            </Message>
        );

        const message = screen.getByRole('status');
        const computedStyle = window.getComputedStyle(message);
        expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
        expect(computedStyle.padding).toBe('20px');
    });

    it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Message ref={ref}>
                Message with ref
            </Message>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('spreads additional props to root element', () => {
        render(
            <Message data-testid="message" aria-label="Important message">
                Message with extra props
            </Message>
        );
        const message = screen.getByTestId('message');
        expect(message).toHaveAttribute('aria-label', 'Important message');
    });
}); 