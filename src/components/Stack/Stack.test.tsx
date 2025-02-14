import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Stack} from './Stack';

describe('Stack', () => {
    const TestChild = () => <div data-testid="test-child">Test Child</div>;

    it('renders children correctly', () => {
        render(
            <Stack>
                <TestChild />
                <TestChild />
            </Stack>
        );
        expect(screen.getAllByTestId('test-child')).toHaveLength(2);
    });

    it('applies vertical direction by default', () => {
        render(
            <Stack>
                <TestChild />
            </Stack>
        );
        expect(screen.getByTestId('test-child').parentElement).toHaveClass('flex-col');
    });

    it('applies horizontal direction when specified', () => {
        render(
            <Stack direction="horizontal">
                <TestChild />
            </Stack>
        );
        expect(screen.getByTestId('test-child').parentElement).toHaveClass('flex-row');
    });

    it('applies correct spacing class', () => {
        render(
            <Stack spacing={4}>
                <TestChild />
            </Stack>
        );
        expect(screen.getByTestId('test-child').parentElement).toHaveClass('gap-4');
    });

    it('applies alignment classes correctly', () => {
        render(
            <Stack align="center">
                <TestChild />
            </Stack>
        );
        const stackElement = screen.getByTestId('test-child').parentElement;
        expect(stackElement).toHaveClass('items-center', 'justify-center');
    });

    it('applies justify classes correctly', () => {
        render(
            <Stack justify="between">
                <TestChild />
            </Stack>
        );
        expect(screen.getByTestId('test-child').parentElement).toHaveClass('justify-between');
    });

    it('applies wrap class when wrap is true', () => {
        render(
            <Stack wrap={true}>
                <TestChild />
            </Stack>
        );
        expect(screen.getByTestId('test-child').parentElement).toHaveClass('flex-wrap');
    });

    it('applies responsive classes when responsive is true', () => {
        render(
            <Stack responsive={true}>
                <TestChild />
            </Stack>
        );
        const stackElement = screen.getByTestId('test-child').parentElement;
        expect(stackElement).toHaveClass('flex-col', 'sm:flex-row');
    });

    it('renders with custom component type', () => {
        render(
            <Stack as="section">
                <TestChild />
            </Stack>
        );
        expect(screen.getByTestId('test-child').parentElement?.tagName.toLowerCase()).toBe('section');
    });

    it('applies custom className', () => {
        render(
            <Stack className="custom-class">
                <TestChild />
            </Stack>
        );
        expect(screen.getByTestId('test-child').parentElement).toHaveClass('custom-class');
    });
}); 