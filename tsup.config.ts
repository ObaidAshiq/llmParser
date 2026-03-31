import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react-markdown",
    "react-syntax-highlighter",
    "remark-gfm",
    "rehype-sanitize",
    "clsx",
  ],
  treeshake: true,
  splitting: false,
  minify: false,
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
