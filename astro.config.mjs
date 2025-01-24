import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import expressiveCode from "astro-expressive-code";

export default defineConfig({
  site: "https://timblazing.site",
  base: "/",
  integrations: [
    tailwind(), 
    sitemap(), 
    mdx(), 
    pagefind(),
    expressiveCode({
      themes: ['aurora-x'],
      styleOverrides: {
        borderRadius: '0.5rem',
        frames: {
          shadowColor: '#124',
        },
      },
    })
  ],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
