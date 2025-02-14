import {render} from '@testing-library/react';
import useId from './useId';

describe('useId', () => {
    it('generates unique IDs', () => {
        const ids = new Set<string>();
        const TestComponent = () => {
            const generateId = useId();
            const id = generateId();
            ids.add(id);
            return null;
        };

        // Render multiple components to test uniqueness
        render(
            <>
                <TestComponent />
                <TestComponent />
                <TestComponent />
            </>
        );

        expect(ids.size).toBe(3); // All IDs should be unique
    });

    it('generates sequential IDs by default', () => {
        let id1: string | undefined;
        let id2: string | undefined;
        const TestComponent = () => {
            const generateId = useId();
            id1 = generateId();
            id2 = generateId();
            return null;
        };

        render(<TestComponent />);

        const num1 = parseInt(id1 as string);
        const num2 = parseInt(id2 as string);
        expect(num2).toBe(num1 + 1);
    });

    it('uses prefix when provided', () => {
        let generatedId: string | undefined;
        const TestComponent = () => {
            const generateId = useId({ prefix: 'test' });
            const id = generateId();
            generatedId = id;
            return null;
        };

        render(<TestComponent />);
        expect(generatedId).toMatch(/^test-/);
    });

    it('generates random IDs when enabled', () => {
        let generatedId1: string | undefined;
        let generatedId2: string | undefined;
        const TestComponent = () => {
            const generateId = useId({ random: true });
            generatedId1 = generateId();
            generatedId2 = generateId();
            return null;
        };

        render(<TestComponent />);
        expect(generatedId1).not.toBe(generatedId2);
        expect(generatedId1).toMatch(/^[a-z0-9]{9}$/);
        expect(generatedId2).toMatch(/^[a-z0-9]{9}$/);
    });

    it('combines prefix with random IDs', () => {
        let generatedId: string | undefined;
        const TestComponent = () => {
            const generateId = useId({ prefix: 'test', random: true });
            const id = generateId();
            generatedId = id;
            return null;
        };

        render(<TestComponent />);
        expect(generatedId).toMatch(/^test-[a-z0-9]{9}$/);
    });
}); 