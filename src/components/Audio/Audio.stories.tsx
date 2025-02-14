import type {Meta, StoryObj} from '@storybook/react';
import Audio from './Audio';

const meta = {
    title: 'Media/Audio',
    component: Audio,
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
} satisfies Meta<typeof Audio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample audio files
const sampleAudio = {
    mp3: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav',
    ogg: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav',
};

export const Default: Story = {
    args: {
        src: sampleAudio.mp3,
    },
};

export const Autoplay: Story = {
    args: {
        src: sampleAudio.mp3,
        autoPlay: true,
        muted: true,
    },
};

export const Loop: Story = {
    args: {
        src: sampleAudio.mp3,
        loop: true,
    },
};

export const CustomPlaybackRate: Story = {
    args: {
        src: sampleAudio.mp3,
        playbackRate: 1.5,
    },
};

export const Borderless: Story = {
    args: {
        src: sampleAudio.mp3,
        variant: 'borderless',
    },
};

export const Rounded: Story = {
    args: {
        src: sampleAudio.mp3,
        rounded: 'lg',
    },
};

export const WithMultipleSources: Story = {
    args: {
        src: sampleAudio.mp3,
        sources: [
            { src: sampleAudio.mp3, type: 'audio/mpeg' },
            { src: sampleAudio.ogg, type: 'audio/ogg' },
        ],
    },
};

export const CustomStyled: Story = {
    args: {
        src: sampleAudio.mp3,
        sx: {
            backgroundColor: '#f8fafc',
            padding: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            '&:hover': {
                backgroundColor: '#f1f5f9',
                transform: 'translateY(-1px)',
                transition: 'all 0.2s ease-in-out',
            },
        },
    },
}; 