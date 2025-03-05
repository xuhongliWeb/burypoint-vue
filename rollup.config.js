import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
export default [
  {
    input: './packages/index.ts',
    output: {
      dir: './lib',
      format: 'cjs',
      entryFileNames: '[name].cjs.js',
    },
    plugins: [
        resolve(), 
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
        }),
    ],
  }
];
