import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [

    {
        input: 'src/backend/main.ts',
        output: {
            file: 'dist/main.js',
            format: 'cjs',
            sourcemap: true,
        },
        external: ['electron', 'fs', 'path', 'url'],
        plugins: [typescript()]
    },

    {
        input: 'src/preload/preload.ts',
        output: {
            file: 'dist/preload.js',
            format: 'cjs',
            sourcemap: true,
        },
        external: ['electron'],
        plugins: [typescript()]
    },

    {
        input: {
            home: 'src/frontend/ts/pages/home/index.ts',
        },
        output: {
            dir: 'dist/frontend',
            format: 'es',
            sourcemap: true,
        },
        plugins: [
            resolve({
                browser: true,
                preferBuiltins: false
            }),
            commonjs(),
            typescript(),
        ]
    }
];
