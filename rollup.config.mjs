import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import scss from 'rollup-plugin-scss'
import sassEmbedded from 'sass-embedded'

export default [
  {
    plugins: [
      alias({
        entries: [
          { find: 'react', replacement: 'preact/compat' },
          { find: 'react-dom', replacement: 'preact/compat' },
        ],
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      scss({
        fileName: 'pastel-form.min.css',
        sass: sassEmbedded,
        outputStyle: 'compressed',
        silenceDeprecations: ['legacy-js-api'],
      }),
      resolve(),
      commonjs(),
      typescript(),
      terser(),
    ],
    input: 'src/main.ts',
    output: {
      name: 'PastelForm',
      file: 'dist/pastel-form.min.js',
      format: 'iife',
      freeze: false,
      sourcemap: false,
    }
  },
]

