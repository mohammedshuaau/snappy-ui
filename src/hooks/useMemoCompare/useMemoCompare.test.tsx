import {render} from '@testing-library/react';
import useMemoCompare from './useMemoCompare';

describe('useMemoCompare', () => {
    it('returns same value when compare function returns true', () => {
        let result: { id: number; data: string } | undefined;
        const TestComponent = ({ value }: { value: { id: number; data: string } }) => {
            result = useMemoCompare(value, (prev, next) => prev?.id === next.id);
            return null;
        };

        const { rerender } = render(
            <TestComponent value={{ id: 1, data: 'initial' }} />
        );

        const firstResult = result;
        
        // Update with same ID but different data
        rerender(<TestComponent value={{ id: 1, data: 'updated' }} />);

        expect(result).toBe(firstResult);
    });

    it('returns new value when compare function returns false', () => {
        let result: { id: number; data: string } | undefined;
        const TestComponent = ({ value }: { value: { id: number; data: string } }) => {
            result = useMemoCompare(value, (prev, next) => prev?.id === next.id);
            return null;
        };

        const { rerender } = render(
            <TestComponent value={{ id: 1, data: 'initial' }} />
        );

        const firstResult = result;

        // Update with different ID
        rerender(<TestComponent value={{ id: 2, data: 'initial' }} />);

        expect(result).not.toBe(firstResult);
        expect(result).toEqual({ id: 2, data: 'initial' });
    });

    it('returns first value on initial render', () => {
        let result: { id: number; data: string } | undefined;
        const TestComponent = ({ value }: { value: { id: number; data: string } }) => {
            result = useMemoCompare(value, (prev, next) => prev?.id === next.id);
            return null;
        };

        render(<TestComponent value={{ id: 1, data: 'initial' }} />);

        expect(result).toEqual({ id: 1, data: 'initial' });
    });

    it('handles undefined previous value', () => {
        let result: { id: number; data: string } | undefined;
        const TestComponent = ({ value }: { value: { id: number; data: string } }) => {
            result = useMemoCompare(value, (prev, next) => {
                if (!prev) return false;
                return prev.id === next.id;
            });
            return null;
        };

        const { rerender } = render(
            <TestComponent value={{ id: 1, data: 'initial' }} />
        );

        const firstResult = result;

        // Update with same ID
        rerender(<TestComponent value={{ id: 1, data: 'updated' }} />);

        expect(result).toBe(firstResult);
    });

    it('handles complex comparison logic', () => {
        let result: { users: { id: number; name: string }[] } | undefined;
        const TestComponent = ({ value }: { value: { users: { id: number; name: string }[] } }) => {
            result = useMemoCompare(value, (prev, next) => {
                if (!prev) return false;
                return prev.users.length === next.users.length &&
                    prev.users.every((user, index) => user.id === next.users[index].id);
            });
            return null;
        };

        const { rerender } = render(
            <TestComponent value={{
                users: [
                    { id: 1, name: 'John' },
                    { id: 2, name: 'Jane' },
                ],
            }} />
        );

        const firstResult = result;

        // Update with same IDs but different names
        rerender(
            <TestComponent value={{
                users: [
                    { id: 1, name: 'Johnny' },
                    { id: 2, name: 'Janet' },
                ],
            }} />
        );

        expect(result).toBe(firstResult);

        // Update with different IDs
        rerender(
            <TestComponent value={{
                users: [
                    { id: 3, name: 'John' },
                    { id: 4, name: 'Jane' },
                ],
            }} />
        );

        expect(result).not.toBe(firstResult);
    });
}); 