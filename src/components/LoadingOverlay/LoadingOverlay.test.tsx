import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {LoadingOverlay} from './LoadingOverlay';

describe('LoadingOverlay', () => {
    const getOverlay = () => screen.queryByTestId('loading-overlay');

    it('renders nothing when not visible', () => {
        render(<LoadingOverlay visible={false} />);
        expect(getOverlay()).not.toBeInTheDocument();
    });

    it('renders when visible', () => {
        render(<LoadingOverlay visible={true} data-testid="loading-overlay" />);
        expect(getOverlay()).toBeInTheDocument();
    });

    it('renders with custom text', () => {
        const text = 'Loading content...';
        render(<LoadingOverlay visible={true} text={text} data-testid="loading-overlay" />);
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('renders with custom spinner', () => {
        const customSpinner = <div data-testid="custom-spinner">Custom Spinner</div>;
        render(<LoadingOverlay visible={true} spinner={customSpinner} data-testid="loading-overlay" />);
        expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
    });

    it('applies blur effect when blur prop is true', () => {
        render(<LoadingOverlay visible={true} blur={true} data-testid="loading-overlay" />);
        expect(getOverlay()).toHaveClass('backdrop-blur-sm');
    });

    it('does not apply blur effect when blur prop is false', () => {
        render(<LoadingOverlay visible={true} blur={false} data-testid="loading-overlay" />);
        expect(getOverlay()).toHaveClass('backdrop-blur-none');
    });

    it('applies fullscreen styles when fullscreen prop is true', () => {
        render(<LoadingOverlay visible={true} fullscreen={true} data-testid="loading-overlay" />);
        expect(getOverlay()).toHaveClass('fixed', 'inset-0');
    });

    it('applies relative positioning when fullscreen prop is false', () => {
        render(<LoadingOverlay visible={true} fullscreen={false} data-testid="loading-overlay" />);
        expect(getOverlay()).toHaveClass('absolute', 'inset-0');
    });
}); 