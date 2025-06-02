import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // background script entry
        background: path.resolve(__dirname, 'src/background/index.ts'),

        // popup.html as UI entry
        popup: path.resolve(__dirname, 'src/popup/popup.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});