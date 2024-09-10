import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: 'site',
  builderConfig: {
    tools: {
      rspack: {
        resolve: {
          extensionAlias: {
            '.js': ['.js', '.ts', '.tsx'],
          },
        },
      },
    },
  },
});
