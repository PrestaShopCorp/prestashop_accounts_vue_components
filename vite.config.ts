import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import Components from "unplugin-vue-components/vite"
import {PuikResolver} from "@prestashopcorp/puik"

export default defineConfig({
    plugins: [vue(), Components({
        resolvers: [PuikResolver()]
    }), cssInjectedByJsPlugin()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'psaccountsVue',
            fileName: (format) => `psaccountsVue.${format}.min.js`,
            formats: ["cjs", 'es', 'umd']
        }
    },
    resolve: {
        alias: {
                "@": resolve(__dirname, 'src')
            }
    },
    // TODO: FIND DEP TO REMOVE TO AVOID ERROR
    define: {
        'process.env': {}
    }
})