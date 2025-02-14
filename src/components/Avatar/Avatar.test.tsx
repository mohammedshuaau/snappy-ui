import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Avatar} from './Avatar';

describe('Avatar', () => {
    it('renders with default props', () => {
        render(<Avatar data-testid="avatar" />);
        const avatar = screen.getByTestId('avatar');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    describe('sizes', () => {
        const sizes = {
            xs: ['w-6', 'h-6'],
            sm: ['w-8', 'h-8'],
            md: ['w-10', 'h-10'],
            lg: ['w-12', 'h-12'],
            xl: ['w-16', 'h-16']
        } as const;

        Object.entries(sizes).forEach(([size, expectedClasses]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Avatar size={size as keyof typeof sizes} data-testid="avatar" />);
                const avatar = screen.getByTestId('avatar');
                expectedClasses.forEach(className => {
                    expect(avatar).toHaveClass(className);
                });
            });
        });
    });

    describe('variants', () => {
        it('renders circle variant correctly', () => {
            render(<Avatar variant="circle" data-testid="avatar" />);
            expect(screen.getByTestId('avatar')).toHaveClass('rounded-full');
        });

        it('renders square variant correctly', () => {
            render(<Avatar variant="square" data-testid="avatar" />);
            expect(screen.getByTestId('avatar')).toHaveClass('rounded-lg');
        });
    });

    describe('status indicators', () => {
        const statuses = ['online', 'offline', 'busy', 'away'] as const;

        statuses.forEach(status => {
            it(`renders ${status} status correctly`, () => {
                render(<Avatar status={status} data-testid="avatar" />);
                const avatar = screen.getByTestId('avatar');
                expect(avatar).toHaveClass('after:absolute', 'after:rounded-full');
            });
        });
    });

    describe('image handling', () => {
        it('renders image when src is provided', () => {
            const src = 'test-image.jpg';
            const alt = 'Test Avatar';
            render(<Avatar src={src} alt={alt} />);
            const img = screen.getByRole('img');
            expect(img).toHaveAttribute('src', src);
            expect(img).toHaveAttribute('alt', alt);
        });

        it('renders initials when name is provided and no src', () => {
            render(<Avatar name="John Doe" data-testid="avatar" />);
            const avatar = screen.getByTestId('avatar');
            expect(avatar).toHaveTextContent('JD');
        });

        it('renders fallback when provided and no src', () => {
            const fallback = <span data-testid="fallback">Custom Fallback</span>;
            render(<Avatar fallback={fallback} />);
            expect(screen.getByTestId('fallback')).toBeInTheDocument();
        });

        it('renders default fallback icon when no src, name, or fallback provided', () => {
            render(<Avatar data-testid="avatar" />);
            const avatar = screen.getByTestId('avatar');
            expect(avatar.querySelector('svg')).toBeInTheDocument();
        });

        it('handles image load error correctly', () => {
            render(<Avatar src="invalid-image.jpg" name="John Doe" data-testid="avatar" />);
            const img = screen.getByRole('img');
            fireEvent.error(img);
            expect(screen.getByTestId('avatar')).toHaveTextContent('JD');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Avatar className="custom-class" data-testid="avatar" />);
            expect(screen.getByTestId('avatar')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Avatar
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="avatar"
                >
                    Styled avatar
                </Avatar>
            );

            const avatar = screen.getByTestId('avatar');
            const computedStyle = window.getComputedStyle(avatar);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
}); 