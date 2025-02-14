import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
            sourcemap: true,
            exports: 'named',
        },
        {
            file: "dist/index.esm.js",
            format: "esm",
            sourcemap: true,
            exports: 'named',
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
        commonjs({
            include: /node_modules/,
        }),
        typescript({
            tsconfig: "./tsconfig.json",
            exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
            declaration: true,
            declarationDir: "dist",
        }),
        postcss({
            config: {
                path: "./postcss.config.js",
            },
            extensions: [".css"],
            minimize: true,
            inject: {
                insertAt: "top"
            },
            modules: false,
        }),
    ],
    external: [
        'react',
        'react-dom',
        'react-toastify',
    ],
}; 