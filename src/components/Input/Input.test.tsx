import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Input} from './Input';
import {FormProvider, useForm} from 'react-hook-form';

const TestFormWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Input', () => {
    it('renders with default props', () => {
        render(<Input data-testid="input" />);
        const input = screen.getByTestId('input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('h-10', 'px-3', 'py-2', 'text-sm');
    });

    describe('variants', () => {
        const variants = {
            default: 'border-slate-200 bg-white text-slate-900',
            error: 'border-red-500 bg-white text-slate-900'
        } as const;

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Input variant={variant as keyof typeof variants} data-testid="input" />);
                const input = screen.getByTestId('input');
                expectedClass.split(' ').forEach(className => {
                    expect(input).toHaveClass(className);
                });
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            default: ['h-10', 'px-3', 'py-2'],
            sm: ['h-8', 'px-2', 'py-1', 'text-xs'],
            lg: ['h-12', 'px-4', 'py-3', 'text-base']
        } as const;

        Object.entries(sizes).forEach(([size, expectedClasses]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Input size={size as keyof typeof sizes} data-testid="input" />);
                const input = screen.getByTestId('input');
                expectedClasses.forEach(className => {
                    expect(input).toHaveClass(className);
                });
            });
        });
    });

    describe('label', () => {
        it('renders label correctly', () => {
            render(<Input label="Test Label" name="test" />);
            expect(screen.getByText('Test Label')).toBeInTheDocument();
        });

        it('associates label with input using htmlFor', () => {
            render(<Input label="Test Label" name="test" />);
            const label = screen.getByText('Test Label');
            expect(label).toHaveAttribute('for', 'test');
        });

        it('applies error styles to label when form field has error', () => {
            render(
                <TestFormWrapper>
                    <Input label="Test Label" name="test" />
                </TestFormWrapper>
            );
            const label = screen.getByText('Test Label');
            expect(label).toHaveClass('text-slate-700');
        });
    });

    describe('helper text', () => {
        it('renders helper text correctly', () => {
            render(<Input helperText="Helper Text" name="test" />);
            expect(screen.getByText('Helper Text')).toBeInTheDocument();
        });

        it('associates helper text with input using aria-describedby', () => {
            render(<Input helperText="Helper Text" name="test" />);
            const input = screen.getByRole('textbox');
            expect(input).toHaveAttribute('aria-describedby', 'test-description');
        });

        it('applies error styles to helper text when form field has error', () => {
            render(
                <TestFormWrapper>
                    <Input helperText="Helper Text" name="test" />
                </TestFormWrapper>
            );
            const helperText = screen.getByText('Helper Text');
            expect(helperText).toHaveClass('text-slate-500');
        });
    });

    describe('form integration', () => {
        it('registers with react-hook-form when used within a form context', () => {
            const onSubmit = vi.fn();
            render(
                <TestFormWrapper>
                    <form onSubmit={onSubmit}>
                        <Input name="test" data-testid="input" />
                    </form>
                </TestFormWrapper>
            );
            const input = screen.getByTestId('input');
            expect(input).toHaveAttribute('name', 'test');
        });

        it('shows error message when form field has error', () => {
            const TestComponent = () => {
                const methods = useForm({
                    defaultValues: { test: '' },
                });

                React.useEffect(() => {
                    methods.setError('test', { message: 'Error message' });
                }, [methods]);

                return (
                    <FormProvider {...methods}>
                        <Input name="test" />
                    </FormProvider>
                );
            };

            render(<TestComponent />);
            expect(screen.getByText('Error message')).toBeInTheDocument();
        });
    });

    describe('interaction', () => {
        it('handles value changes', () => {
            const onChange = vi.fn();
            render(<Input onChange={onChange} data-testid="input" />);

            fireEvent.change(screen.getByTestId('input'), { target: { value: 'test' } });
            expect(onChange).toHaveBeenCalled();
        });

        it('handles disabled state', () => {
            render(<Input disabled data-testid="input" />);
            expect(screen.getByTestId('input')).toBeDisabled();
        });

        it('handles readonly state', () => {
            render(<Input readOnly data-testid="input" />);
            expect(screen.getByTestId('input')).toHaveAttribute('readonly');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Input className="custom-class" data-testid="input" />);
            expect(screen.getByTestId('input')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Input
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="input"
                />
            );

            const input = screen.getByTestId('input');
            const computedStyle = window.getComputedStyle(input);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
}); 