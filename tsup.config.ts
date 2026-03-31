import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  splitting: false,
  minify: false,
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
