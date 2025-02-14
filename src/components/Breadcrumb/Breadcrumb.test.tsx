import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Breadcrumb} from './Breadcrumb';

describe('Breadcrumb', () => {
    const defaultItems = [
        { label: 'Home', href: '/' },
        { label: 'Category', href: '/category' },
        { label: 'Product' }
    ];

    it('renders with default props', () => {
        render(<Breadcrumb items={defaultItems} />);
        expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
        defaultItems.forEach(item => {
            expect(screen.getByText(item.label)).toBeInTheDocument();
        });
    });

    describe('variants', () => {
        it('renders default variant correctly', () => {
            render(<Breadcrumb items={defaultItems} variant="default" />);
            expect(screen.getByLabelText('Breadcrumb')).toHaveClass('text-slate-600');
        });

        it('renders primary variant correctly', () => {
            render(<Breadcrumb items={defaultItems} variant="primary" />);
            expect(screen.getByLabelText('Breadcrumb')).toHaveClass('text-primary-600');
        });
    });

    describe('sizes', () => {
        const sizes = {
            sm: 'text-xs',
            default: 'text-sm',
            lg: 'text-base'
        } as const;

        Object.entries(sizes).forEach(([size, expectedClass]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Breadcrumb items={defaultItems} size={size as keyof typeof sizes} />);
                expect(screen.getByLabelText('Breadcrumb')).toHaveClass(expectedClass);
            });
        });
    });

    describe('custom separator', () => {
        it('renders custom separator', () => {
            const separator = '>';
            render(<Breadcrumb items={defaultItems} separator={separator} />);
            const separators = screen.getAllByText(separator);
            expect(separators).toHaveLength(defaultItems.length - 1);
        });

        it('renders custom separator component', () => {
            const separator = <span data-testid="custom-separator">→</span>;
            render(<Breadcrumb items={defaultItems} separator={separator} />);
            const separators = screen.getAllByTestId('custom-separator');
            expect(separators).toHaveLength(defaultItems.length - 1);
        });
    });

    describe('item rendering', () => {
        it('renders items with href as links', () => {
            render(<Breadcrumb items={defaultItems} />);
            const links = screen.getAllByRole('link');
            expect(links).toHaveLength(2); // First two items have hrefs
        });

        it('renders last item as text', () => {
            render(<Breadcrumb items={defaultItems} />);
            const lastItem = screen.getByText('Product');
            expect(lastItem.tagName.toLowerCase()).toBe('span');
            expect(lastItem).toHaveClass('font-medium');
        });

        it('renders items with icons', () => {
            const itemsWithIcons = [
                { label: 'Home', href: '/', icon: <span data-testid="home-icon">🏠</span> },
                { label: 'Product' }
            ];
            render(<Breadcrumb items={itemsWithIcons} />);
            expect(screen.getByTestId('home-icon')).toBeInTheDocument();
        });
    });

    describe('maxItems behavior', () => {
        const manyItems = [
            { label: 'Home', href: '/' },
            { label: 'Category', href: '/category' },
            { label: 'Subcategory', href: '/category/sub' },
            { label: 'Section', href: '/category/sub/section' },
            { label: 'Product' }
        ];

        it('collapses items when maxItems is set', () => {
            render(<Breadcrumb items={manyItems} maxItems={3} />);
            expect(screen.getByText('...')).toBeInTheDocument();
            expect(screen.getAllByRole('listitem')).toHaveLength(3);
        });

        it('shows all items when maxItems is greater than items length', () => {
            render(<Breadcrumb items={manyItems} maxItems={10} />);
            expect(screen.queryByText('...')).not.toBeInTheDocument();
            expect(screen.getAllByRole('listitem')).toHaveLength(manyItems.length);
        });
    });

    describe('interaction', () => {
        it('handles onClick events', () => {
            const onClick = vi.fn();
            const items = [
                { label: 'Home', href: '/', onClick },
                { label: 'Product' }
            ];
            render(<Breadcrumb items={items} />);

            fireEvent.click(screen.getByText('Home'));
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('uses custom link component when provided', () => {
            const CustomLink = ({ href, children, ...props }: any) => (
                <a href={href} data-testid="custom-link" {...props}>{children}</a>
            );
            render(<Breadcrumb items={defaultItems} linkComponent={CustomLink} />);
            expect(screen.getAllByTestId('custom-link')).toHaveLength(2);
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Breadcrumb items={defaultItems} className="custom-class" />);
            expect(screen.getByLabelText('Breadcrumb')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Breadcrumb
                    items={defaultItems}
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                />
            );

            const breadcrumb = screen.getByLabelText('Breadcrumb');
            const computedStyle = window.getComputedStyle(breadcrumb);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Breadcrumb
                    items={defaultItems}
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                />
            );

            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
}); 