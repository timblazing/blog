/// <reference path="../.astro/types.d.ts" />

interface Window {
  mode: {
    setMode: (mode: 'dark' | 'light') => void
    getMode: () => 'dark' | 'light'
  }

  pagefind: {
    search: (query: string) => Promise<{ results: unknown[] }>
  }
}
