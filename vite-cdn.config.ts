import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import Components from 'unplugin-vue-components/vite';
import { PuikResolver } from '@prestashopcorp/puik';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    vue({
      customElement: true
    }),
    Components({
      resolvers: [PuikResolver()],
      dts: 'src/types/components.d.ts'
    }),
    cssInjectedByJsPlugin()
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'psaccountsVue',
      fileName: () => 'psaccountsVue.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        exports: 'named',
        inlineDynamicImports: true
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: /^~(.*)$/,
        replacement: '$1'
      }
    ]
  },
  // TODO: FIND DEP TO REMOVE TO AVOID ERROR
  define: {
    'process.env': {},
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(pkg.version)
  }
});
