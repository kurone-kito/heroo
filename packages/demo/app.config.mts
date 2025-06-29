import { defineConfig } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';

/** The base URL. */
const baseURL = process.env?.['BASE_PATH'];

export default defineConfig({
  server: {
    prerender: { autoSubfolderIndex: false },
    preset: 'githubPages',
    ...(baseURL ? { baseURL } : {}),
  },
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  vite: { plugins: [(tailwindcss as Function)()] },
});
