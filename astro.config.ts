import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import codeHeadersPlugin from "./src/plugins/codeHeadersPlugin";
import readingTimePlugin from "./src/plugins/readingTimePlugin";
import config from "./src/theme.config";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  site: config.site,
  integrations: [tailwind(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: config.shikiThemes,
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
      },
    },
    build: {
      rollupOptions: {
        external: [/^src\/assets\/.*/, /^\/src\/assets\/.*/],
      },
    },
  },
});
