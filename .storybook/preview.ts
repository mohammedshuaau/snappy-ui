import type { Preview } from "@storybook/react";
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      current: 'light',
      darkClass: 'dark',
      stylePreview: true,
      classTarget: 'html',
    },
    docs: {
      story: {
        inline: true,
      },
    },
    staticDirs: ['../public'],
  },
};

export default preview; 