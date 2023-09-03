// @ts-check
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@reykjavik/hanna-utils': resolve(__dirname + '/../hanna-utils/src'),
      '@reykjavik/hanna-react': resolve(__dirname + '/../hanna-react/src'),
      '@reykjavik/hanna-css': resolve(__dirname + '/../hanna-css/src/lib'),
    },
  },
});
