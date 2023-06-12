import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({ insertTypesEntry: true, copyDtsFiles: false }),
    libCss()
  ],
  resolve: { dedupe: ['vue'] },
  build: {
    outDir: 'lib',
    lib: {
      name: 'index',
      entry: resolve(__dirname, 'packages/index.ts'),
      formats: ['es', 'umd', 'cjs'],
      fileName: format => `index.${format}.js`,
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
});
