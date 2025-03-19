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
            tsconfig: './tsconfig.json', // 当设置为false时，忽略配置文件中指定的任何选项。如果设置为与文件路径对应的字符串，则指定的文件将被用作配置文件。
        }),
        
    ],
  }
];
