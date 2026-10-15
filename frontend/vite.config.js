import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), // plugin oficial do Tailwind v4
  ],
  server: {
    port: 5173,
  },
});
