import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { glob } from 'glob';
import atImport from 'postcss-import';
import { nodeExternals } from 'rollup-plugin-node-externals';
import postcss from 'rollup-plugin-postcss';

// Clean the generated dist folder.
await fs.rmdir('./dist', { recursive: true }).catch(() => {});

const entryPoints = await glob('./src/**/*.{ts,tsx}', {
  ignore: [
    './**/*.d.ts',
    './**/*.stories.{ts,tsx}',
    './**/*.story.{ts,tsx}'
  ],
});

const input = Object.fromEntries(
  entryPoints.map((entry) => [
    path.relative(
      'src',
      entry.slice(0, entry.length - path.extname(entry).length)
    ),
    fileURLToPath(new URL(entry, import.meta.url)),
  ])
);

/** @type {import('rollup').RollupOptions} */
const rollup = {
  input,
  output: {
    format: 'esm',
    dir: './dist',
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json',
    }),
    nodeExternals({
      builtins: true,
      deps: false,
      exclude: [],
    }),
    nodeResolve({}),
    postcss({
      plugins: [atImport()],
      extract: 'Style.css',
      sourceMap: true,
      autoModules: true,
    }),
  ],
};

export default rollup;
