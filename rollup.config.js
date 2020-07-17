import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

function createConfig(format, resolved = false) {
  const dir = format === "module" ? "esm" : format;

  return {
    input: `src/index.js`,
    output: {
      file: `${dir}/index${resolved ? ".resolved" : ""}.js`,
      sourcemap: true,
      format,
      paths: {
        react: resolved
          ? `//cdn.jsdelivr.net/npm/@esm-bundle/react@16.13.1/esm/react.production.min.js`
          : "react",
        "react-is": resolved
          ? "//cdn.jsdelivr.net/npm/@esm-bundle/react-is@16.13.1/esm/react-is.production.min.js"
          : "react-is",
      },
      exports: "named",
    },
    plugins: [
      resolve(),
      commonjs(),
      replace({
        values: {
          "process.env.NODE_ENV": JSON.stringify("production"),
        },
      }),
      terser(),
    ],
    external: ["react-is", "react"],
  };
}

export default [
  createConfig("module"),
  createConfig("module", true),
  createConfig("system"),
];
