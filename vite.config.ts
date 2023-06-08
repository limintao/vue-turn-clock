import {defineConfig} from 'vite';
import {resolve} from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx(), dts({insertTypesEntry: true, copyDtsFiles: false})],
  resolve: {dedupe: ['vue']},
  build: {
    lib: {
      name: 'vue-turn-clock',
      entry: resolve(__dirname, 'packages/index.ts')
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {vue: 'Vue'}
      }
    }
  }
})
