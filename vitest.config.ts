import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { PuikResolver } from '@prestashopcorp/puik';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [PuikResolver()],
      dts: 'src/types/components.d.ts'
    })
  ],
  test: {
    include: ['**/*.spec.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@prestashopcorp/puik']
    },
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      include: [
        'src/**/*.{vue,ts}'
      ],
      exclude: [
        'src/types/**',
        'src/locales/**',
        'src/main.ts',
        'src/**/*.spec.ts'
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
