import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "./**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: 'Documentation',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    // Get the base URL from environment variable or use default for local development
    const baseUrl = process.env.STORYBOOK_BASE_URL || '/';
    
    return {
      ...config,
      base: baseUrl,
      plugins: [...(config.plugins || [])],
      css: {
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    };
  },
};

export default config; 