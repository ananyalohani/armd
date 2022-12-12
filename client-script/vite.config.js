import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2021",
    lib: {
      name: "ARMD",
      entry: resolve(__dirname, "src/armd.ts"),
      formats: ["umd"],
      fileName: () => "armd.js",
    },
  },
});
