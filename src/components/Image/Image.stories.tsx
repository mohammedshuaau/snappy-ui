import type {Meta, StoryObj} from '@storybook/react';
import {Image} from './Image';

const meta = {
    title: 'Media/Image',
    component: Image,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        fit: {
            control: 'select',
            options: ['fill', 'contain', 'cover', 'none', 'scaleDown'],
        },
        loading: {
            control: 'select',
            options: ['eager', 'lazy'],
        },
        rounded: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
        },
    },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images from Picsum (more reliable than Unsplash random)
const sampleImages = {
    landscape: 'https://picsum.photos/800/400',
    portrait: 'https://picsum.photos/400/600',
    small: 'https://picsum.photos/200/200',
};

export const Default: Story = {
    args: {
        src: sampleImages.landscape,
        alt: 'Sample landscape image',
        width: 800,
        height: 400,
    },
};

export const WithBlurHash: Story = {
    args: {
        src: sampleImages.landscape,
        alt: 'Image with blur hash placeholder',
        width: 800,
        height: 400,
        blurHash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
    },
};

export const WithZoom: Story = {
    args: {
        src: sampleImages.portrait,
        alt: 'Image with zoom effect',
    },
    render: () => (
        <div className="w-[400px] h-[400px]">
            <Image
                src={sampleImages.portrait}
                alt="Image with zoom effect"
                width={400}
                height={400}
                zoomOnHover
                fit="cover"
                className="w-full h-full"
            />
        </div>
    ),
};

export const WithError: Story = {
    args: {
        src: 'invalid-image-url.jpg',
        alt: 'Image with error',
    },
    render: () => (
        <div className="w-[400px] h-[400px]">
            <Image
                src="invalid-image-url.jpg"
                alt="Image with error"
                width={400}
                height={400}
                fallbackSrc={sampleImages.small}
                showError
                fit="cover"
                className="w-full h-full"
            />
        </div>
    ),
};

export const ObjectFit: Story = {
    args: {
        src: sampleImages.portrait,
        alt: 'Object fit example',
    },
    render: () => (
        <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
                <h3 className="text-sm font-medium">Cover</h3>
                <div className="w-[200px] h-[200px] bg-slate-100 dark:bg-slate-800">
                    <Image
                        src={sampleImages.portrait}
                        alt="Cover fit"
                        width={200}
                        height={200}
                        fit="cover"
                        className="w-full h-full"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-sm font-medium">Contain</h3>
                <div className="w-[200px] h-[200px] bg-slate-100 dark:bg-slate-800">
                    <Image
                        src={sampleImages.portrait}
                        alt="Contain fit"
                        width={200}
                        height={200}
                        fit="contain"
                        className="w-full h-full"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-sm font-medium">Fill</h3>
                <div className="w-[200px] h-[200px] bg-slate-100 dark:bg-slate-800">
                    <Image
                        src={sampleImages.portrait}
                        alt="Fill fit"
                        width={200}
                        height={200}
                        fit="fill"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    ),
};

export const Rounded: Story = {
    args: {
        src: sampleImages.small,
        alt: 'Rounded example',
    },
    render: () => (
        <div className="grid grid-cols-4 gap-4">
            {(['none', 'sm', 'lg', 'full'] as const).map((r) => (
                <div key={r} className="space-y-2">
                    <h3 className="text-sm font-medium">{r}</h3>
                    <div className="w-[150px] h-[150px]">
                        <Image
                            src={sampleImages.small}
                            alt={`${r} rounded`}
                            width={150}
                            height={150}
                            rounded={r}
                            fit="cover"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            ))}
        </div>
    ),
};

export const LazyLoading: Story = {
    args: {
        src: sampleImages.landscape,
        alt: 'Lazy loading example',
    },
    render: () => (
        <div className="space-y-96">
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Scroll down to see lazy loaded images
            </p>
            {Array.from({ length: 3 }).map((_, i) => (
                <Image
                    key={i}
                    src={sampleImages.landscape}
                    alt={`Lazy loaded image ${i + 1}`}
                    width={800}
                    height={400}
                    loading="lazy"
                    className="w-full"
                    onInView={() => console.log(`Image ${i + 1} in view`)}
                />
            ))}
        </div>
    ),
};

export const WithSkeleton: Story = {
    args: {
        src: sampleImages.landscape,
        alt: 'Image with skeleton loader',
        width: 800,
        height: 400,
        showSkeleton: true,
    },
};

export const CustomStyled: Story = {
    args: {
        src: sampleImages.landscape,
        alt: 'Custom styled image',
    },
    render: () => (
        <div className="space-y-4">
            <div className="w-[400px] h-[300px]">
                <Image
                    src={sampleImages.landscape}
                    alt="Grayscale effect"
                    width={400}
                    height={300}
                    fit="cover"
                    className="w-full h-full"
                    sx={{
                        filter: 'grayscale(100%)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            filter: 'grayscale(0%)',
                        },
                    }}
                />
            </div>
            <div className="w-[400px] h-[300px]">
                <Image
                    src={sampleImages.landscape}
                    alt="Sepia effect"
                    width={400}
                    height={300}
                    fit="cover"
                    className="w-full h-full"
                    sx={{
                        filter: 'sepia(100%)',
                        transform: 'scale(0.95)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            filter: 'sepia(0%)',
                            transform: 'scale(1)',
                        },
                    }}
                />
            </div>
            <div className="w-[400px] h-[300px]">
                <Image
                    src={sampleImages.landscape}
                    alt="Custom border effect"
                    width={400}
                    height={300}
                    fit="cover"
                    className="w-full h-full"
                    sx={{
                        border: '4px solid transparent',
                        borderRadius: '1rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            borderColor: '#3b82f6',
                            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
                        },
                    }}
                />
            </div>
        </div>
    ),
}; 