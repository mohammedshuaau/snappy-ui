import {act, fireEvent, render} from '@testing-library/react';
import useForm from './useForm';

describe('useForm', () => {
    const mockSubmit = vi.fn();

    beforeEach(() => {
        mockSubmit.mockClear();
    });

    it('initializes form state correctly', () => {
        let formState: any;
        const TestComponent = () => {
            const form = useForm({
                name: { initialValue: '', required: true },
                email: { initialValue: 'test@example.com' },
            });
            formState = form.formState;
            return null;
        };

        render(<TestComponent />);

        expect(formState).toEqual({
            name: { value: '', touched: false },
            email: { value: 'test@example.com', touched: false },
        });
    });

    it('handles field changes', () => {
        let formState: any;
        let handleChange: any;
        const TestComponent = () => {
            const form = useForm({
                name: { initialValue: '' },
                email: { initialValue: '' },
            });
            formState = form.formState;
            handleChange = form.handleChange;
            return null;
        };

        render(<TestComponent />);

        act(() => {
            handleChange('name', 'John');
        });

        expect(formState.name).toEqual({
            value: 'John',
            touched: true,
        });
    });

    it('validates required fields', () => {
        let formState: any;
        let handleSubmit: any;
        const TestComponent = () => {
            const form = useForm({
                name: { initialValue: '', required: true },
                email: { initialValue: '' },
            });
            formState = form.formState;
            handleSubmit = form.handleSubmit;
            return <form onSubmit={handleSubmit(mockSubmit)}><button type="submit">Submit</button></form>;
        };

        const { getByText } = render(<TestComponent />);

        act(() => {
            fireEvent.click(getByText('Submit'));
        });

        expect(formState.name.error).toBe('This field is required');
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('validates using custom rules', () => {
        let formState: any;
        let handleChange: any;
        const TestComponent = () => {
            const form = useForm({
                password: {
                    initialValue: '',
                    rules: [
                        {
                            validate: (value: string) => value.length >= 8,
                            message: 'Password must be at least 8 characters',
                        },
                    ],
                },
            }, { validateOnChange: true });
            formState = form.formState;
            handleChange = form.handleChange;
            return null;
        };

        render(<TestComponent />);

        act(() => {
            handleChange('password', '123');
        });

        expect(formState.password.error).toBe('Password must be at least 8 characters');

        act(() => {
            handleChange('password', '12345678');
        });

        expect(formState.password.error).toBeUndefined();
    });

    it('validates using custom validation function', () => {
        let formState: any;
        let handleChange: any;
        const TestComponent = () => {
            const form = useForm({
                age: {
                    initialValue: '',
                    validate: (value: string) => {
                        const age = parseInt(value);
                        if (isNaN(age)) return 'Must be a number';
                        if (age < 18) return 'Must be at least 18';
                        return undefined;
                    },
                },
            }, { validateOnChange: true });
            formState = form.formState;
            handleChange = form.handleChange;
            return null;
        };

        render(<TestComponent />);

        act(() => {
            handleChange('age', 'abc');
        });
        expect(formState.age.error).toBe('Must be a number');

        act(() => {
            handleChange('age', '15');
        });
        expect(formState.age.error).toBe('Must be at least 18');

        act(() => {
            handleChange('age', '20');
        });
        expect(formState.age.error).toBeUndefined();
    });

    it('validates on blur when enabled', () => {
        let formState: any;
        let handleBlur: any;
        let handleChange: any;
        const TestComponent = () => {
            const form = useForm({
                name: { initialValue: '', required: true },
            }, { validateOnBlur: true });
            formState = form.formState;
            handleBlur = form.handleBlur;
            handleChange = form.handleChange;
            return null;
        };

        render(<TestComponent />);

        act(() => {
            handleChange('name', '');
            handleBlur('name');
        });

        expect(formState.name.error).toBe('This field is required');
    });

    it('submits form with valid data', () => {
        let handleSubmit: any;
        let handleChange: any;
        const TestComponent = () => {
            const form = useForm({
                name: { initialValue: '', required: true },
                email: { initialValue: '' },
            });
            handleSubmit = form.handleSubmit;
            handleChange = form.handleChange;
            return <form onSubmit={handleSubmit(mockSubmit)}><button type="submit">Submit</button></form>;
        };

        const { getByText } = render(<TestComponent />);

        act(() => {
            handleChange('name', 'John');
            handleChange('email', 'john@example.com');
        });

        act(() => {
            fireEvent.click(getByText('Submit'));
        });

        expect(mockSubmit).toHaveBeenCalledWith({
            name: 'John',
            email: 'john@example.com',
        });
    });

    it('resets form state', () => {
        let formState: any;
        let handleChange: any;
        let reset: any;
        const TestComponent = () => {
            const form = useForm({
                name: { initialValue: '' },
                email: { initialValue: '' },
            });
            formState = form.formState;
            handleChange = form.handleChange;
            reset = form.reset;
            return null;
        };

        render(<TestComponent />);

        act(() => {
            handleChange('name', 'John');
            handleChange('email', 'john@example.com');
        });

        expect(formState.name.value).toBe('John');
        expect(formState.email.value).toBe('john@example.com');

        act(() => {
            reset();
        });

        expect(formState).toEqual({
            name: { value: '', touched: false },
            email: { value: '', touched: false },
        });
    });

    it('tracks form validity and dirty state', () => {
        let isValid: boolean = false;
        let isDirty: boolean = false;
        let handleChange: any;
        const TestComponent = () => {
            const form = useForm({
                name: { initialValue: '', required: true },
            }, { validateOnChange: true });
            isValid = form.isValid;
            isDirty = form.isDirty;
            handleChange = form.handleChange;
            return null;
        };

        render(<TestComponent />);

        expect(isValid).toBe(true);
        expect(isDirty).toBe(false);

        act(() => {
            handleChange('name', '');
        });

        expect(isValid).toBe(false);
        expect(isDirty).toBe(true);

        act(() => {
            handleChange('name', 'John');
        });

        expect(isValid).toBe(true);
        expect(isDirty).toBe(true);
    });
}); 