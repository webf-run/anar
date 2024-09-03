import { type RuleSetRule } from 'webpack';
import { type StorybookConfig } from '@storybook/react-webpack5';

const excludedProps = new Set([
  'id',
  'slot',
  'onCopy',
  'onCut',
  'onPaste',
  'onCompositionStart',
  'onCompositionEnd',
  'onCompositionUpdate',
  'onSelect',
  'onBeforeInput',
  'onInput',
]);

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config: StorybookConfig = {
  // stories: ['../stories/*.stories.@(js|jsx|mjs|ts|tsx)'],
  stories: [
    '../stories/**/*.mdx',
    // '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.story.tsx',
  ],
  addons: [
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      propFilter: (prop) =>
        !prop.name.startsWith('aria-') && !excludedProps.has(prop.name),
    },
  },
  async webpackFinal(config) {
    let rule = config?.module?.rules?.find((rule) =>
      String((rule as RuleSetRule).test).includes('.css')
    );

    (rule as any).use?.push('lightningcss-loader');

    config.resolve = {
      ...config.resolve,
      extensionAlias: {
        ...config.resolve?.extensionAlias,
        '.js': ['.js', '.ts', '.tsx'],
      },
    };

    return config;
  },
};
export default config;
