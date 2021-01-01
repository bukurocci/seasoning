import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const config = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: pkg.name
    },
    external: [...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      eslint({
        fix: true
      }),
      nodeResolve(),
      commonjs({
        include: 'node_modules/**'
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      }),
      terser()
    ]
  }
];

export default config;
