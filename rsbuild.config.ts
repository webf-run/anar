import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  root: './site',
  source: {
    entry: {
      index: './index.tsx'
    },
  },
  tools: {
    rspack: {
      resolve: {
        extensionAlias: {
          '.js': ['.js', '.ts', '.tsx'],
        },
      },
    },
  },
  html: {
    template: './index.html',
  },
  plugins: [pluginReact()],
});
