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
    expressiveCode({
      themes: ['aurora-x'],
      styleOverrides: {
        borderRadius: '0.5rem',
        frames: {
          shadowColor: '#124',
        },
        codeBlock: {
          width: '100%',
          maxWidth: 'calc(100vw - 2rem)',
          overflowX: 'auto',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap'
        }
      },
    }),
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
