import type {Meta, StoryObj} from '@storybook/react';
import {Video} from './Video';

const meta = {
    title: 'Media/Video',
    component: Video,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'borderless'],
        },
        rounded: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
        },
    },
} satisfies Meta<typeof Video>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample videos
const sampleVideos = {
    mp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
};

export const Default: Story = {
    args: {
        src: sampleVideos.mp4,
        poster: sampleVideos.poster,
        width: 800,
        height: 450,
    },
};

export const WithoutControls: Story = {
    args: {
        src: sampleVideos.mp4,
        poster: sampleVideos.poster,
        controls: false,
        width: 800,
        height: 450,
    },
};

export const Autoplay: Story = {
    args: {
        src: sampleVideos.mp4,
        poster: sampleVideos.poster,
        autoPlay: true,
        muted: true,
        width: 800,
        height: 450,
    },
};

export const Loop: Story = {
    args: {
        src: sampleVideos.mp4,
        poster: sampleVideos.poster,
        loop: true,
        width: 800,
        height: 450,
    },
};

export const CustomPlaybackRate: Story = {
    args: {
        src: sampleVideos.mp4,
        poster: sampleVideos.poster,
        playbackRate: 1.5,
        width: 800,
        height: 450,
    },
};

export const WithoutPiP: Story = {
    args: {
        src: sampleVideos.mp4,
        poster: sampleVideos.poster,
        pip: false,
        width: 800,
        height: 450,
    },
};

export const WithoutFullscreen: Story = {
    args: {
        src: sampleVideos.mp4,
        poster: sampleVideos.poster,
        fullscreen: false,
        width: 800,
        height: 450,
    },
};

export const Borderless: Story = {
    args: {
        src: sampleVideos.mp4,
        poster: sampleVideos.poster,
        variant: 'borderless',
        width: 800,
        height: 450,
    },
};

export const Rounded: Story = {
    args: {
        src: sampleVideos.mp4,
        poster: sampleVideos.poster,
        rounded: 'lg',
        width: 800,
        height: 450,
    },
};

export const CustomStyled: Story = {
    args: {
        src: sampleVideos.mp4,
        poster: sampleVideos.poster,
        width: 800,
        height: 450,
        sx: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out',
            },
        },
    },
}; 