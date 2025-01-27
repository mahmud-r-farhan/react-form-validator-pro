import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js", // ES Module build
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), 
    resolve({
      extensions: [".js", ".jsx"], 
    }),
    commonjs(), 
    babel({
      exclude: "node_modules/**", 
      babelHelpers: "bundled", 
      presets: ["@babel/preset-react"], 
    }),
  ],
};
