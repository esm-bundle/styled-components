import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

function createConfig(format, options = {}) {
  const dir = format === "module" ? "esm" : format;
  const { resolved = false, min = false, browser = false } = options;
  const input = browser || resolved ? "src/browser.js" : "src/index.js";
  const file = [
    dir,
    "/styled-components",
    browser && ".browser",
    resolved && ".resolved",
    min && ".min",
    ".js",
  ]
    .filter(Boolean)
    .join("");

  return {
    input,
    output: {
      file,
      sourcemap: true,
      format,
      paths: {
        react: resolved
          ? `//cdn.jsdelivr.net/npm/@esm-bundle/react@16.13.1/esm/react.production.min.js`
          : "react",
        "react-is": resolved
          ? "//cdn.jsdelivr.net/npm/@esm-bundle/react-is@16.13.1/esm/react-is.production.min.js"
          : "react-is",
        stream: resolved ? "//cdn.jsdelivr.net/npm/stream@0.0.2" : "stream",
      },
      exports: "named",
    },
    plugins: [
      resolve(),
      commonjs(),
      replace({
        "process.env.NODE_ENV": JSON.stringify(
          min ? "production" : "development"
        ),
      }),
      min && terser(),
    ],
    external: ["react-is", "react", "stream"],
  };
}

export default [
  createConfig("module"),
  createConfig("module", { browser: true }),
  createConfig("module", { min: true }),
  createConfig("module", { min: true, browser: true }),
  createConfig("module", { resolved: true }),
  createConfig("system"),
  createConfig("system", { browser: true }),
  createConfig("system", { min: true }),
  createConfig("system", { min: true, browser: true }),
];
