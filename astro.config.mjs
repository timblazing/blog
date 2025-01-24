import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

export default defineConfig({
  site: "https://timblazing.site",
  base: "/",
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    pagefind()
  ],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
