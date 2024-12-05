import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import codeHeadersPlugin from "./src/plugins/codeHeadersPlugin";
import readingTimePlugin from "./src/plugins/readingTimePlugin";
import config from "./src/theme.config";
import type { ThemeConfig } from "./src/types";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  site: (config as ThemeConfig).site,
  integrations: [tailwind(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: (config as ThemeConfig).shikiThemes,
      wrap: true,
      transformers: [codeHeadersPlugin],
    },
    remarkPlugins: [readingTimePlugin],
  },
  vite: {
    resolve: {
      alias: {
        "@/assets": path.resolve(__dirname, "./src/assets"),
        "src/assets": path.resolve(__dirname, "./src/assets"),
        "/src/assets": path.resolve(__dirname, "./src/assets"),
        "src": path.resolve(__dirname, "./src"),
        "/app/src": path.resolve(__dirname, "./src"),
        "@/theme.config": path.resolve(__dirname, "./src/theme.config.ts"),
        "@/util": path.resolve(__dirname, "./src/util"),
        "@/ogImages": path.resolve(__dirname, "./src/ogImages"),
      },
    },
    build: {
      rollupOptions: {
        external: [/^src\/assets\/.*/, /^\/src\/assets\/.*/],
      },
    },
  },
});
