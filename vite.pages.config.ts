import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// SPA build for GitHub Pages.
// Entry is app.html (the React shell). The repo-root index.html is a separate,
// fully standalone OO single-file site and is NOT built by Vite.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist-app",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "app.html"),
    },
  },
});
