import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

import config from './tsconfig.build.json';

export default defineConfig({
  source: {
    entry: {
      index: [...config.include, ...config.exclude.map((p) => `!${p}`)],
    },
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
});
