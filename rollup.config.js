import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { glob } from 'glob'
import { nodeExternals } from 'rollup-plugin-node-externals';
import postcss from 'rollup-plugin-postcss';
import atImport from 'postcss-import';

// Clean the generated dist folder.
await fs.rmdir('./dist', { recursive: true }).catch(() => {});

const entryPoints = await glob('./src/**/*.{ts,tsx}', {
  ignore: [
    './**/*.d.ts',
    './**/*.stories.{ts,tsx}',
  ],
});

const input = Object.fromEntries(
  entryPoints.map((entry) => [
    path.relative(
      'src',
      entry.slice(0, entry.length - path.extname(entry).length),
    ),
    fileURLToPath(new URL(entry, import.meta.url)),
  ]),
);

/** @type {import('rollup').RollupOptions} */
const rollup = {
  input,
  output: {
    format: 'esm',
    dir: './dist',
    sourcemap: true,
    chunkFileNames: 'assets/[name].js',
  },
  output: {
    format: 'esm',
    dir: './dist',
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.lib.json',

      exclude: [
        '**/*.stories.ts',
        '**/*.stories.tsx',
        '**/*.test.ts',
        '**/*.test.tsx',
      ],

      // When compiling libraries, it is essential that composite is disabled.
      // If composite is not disabled, then it means library depends on other
      // TS project and may not bundle as a standalone package from consumer side.
      compilerOptions: {
        composite: false,
        incremental: false,
      },
    }),
    nodeExternals({
      builtins: true,
      deps: false,
      exclude: [],
    }),
    nodeResolve({}),
    postcss({
      plugins: [
        atImport()
      ],
      extract: 'Style.css',
      sourceMap: true,
      autoModules: true,
    }),
  ],
};

export default rollup;
