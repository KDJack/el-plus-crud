import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { LibraryOptions, defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import AutoImport from 'unplugin-auto-import/vite'

const pathResolve = (dir: string) => {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('./lib/')
}

const viteConfig = defineConfig(() => {
  return {
    plugins: [
      vue(),
      vueSetupExtend(),
      dts({
        entryRoot: './lib',
        outDir: ['./dist'],
        //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
        tsconfigPath: './tsconfig.json'
      }),
      AutoImport({
        // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
        dts: 'types/auto-imports.d.ts',
        imports: ['vue']
      })
    ],
    root: process.cwd(),
    resolve: { alias },
    base: './',
    server: {
      host: '0.0.0.0',
      port: 9991,
      open: true,
      hmr: true
    },
    build: {
      target: 'modules',
      outDir: 'dist',
      chunkSizeWarningLimit: 500,
      lib: {
        entry: 'lib/index.ts',
        name: 'el-plus-crud',
        formats: ['umd', 'es']
      } as LibraryOptions,
      rollupOptions: {
        external: ['vue', 'element-plus', '@vueuse/core'],
        output: {
          // entryFileNames: `static/js/[hash].js`,
          // chunkFileNames: `static/js/[hash].js`,
          // assetFileNames: (asser) => {
          //   const suff = asser.name?.substring(asser.name?.lastIndexOf('.') + 1) || ''
          //   switch (suff.toLowerCase()) {
          //     case 'js':
          //       return 'static/js/[hash].js'
          //     case 'css':
          //       return `static/css/[hash].css`
          //     case 'png':
          //     case 'jpg':
          //     case 'gif':
          //     case 'svg':
          //       return 'static/images/[hash].[ext]'
          //   }
          //   return `static/assets/[hash].[ext]`
          // },
          compact: true
        },
        minify: 'esbuild'
      }
    },
    css: { preprocessorOptions: { css: { charset: false } } },
    define: {
      __NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
      __NEXT_NAME__: JSON.stringify(process.env.npm_package_name)
    }
  }
})

export default viteConfig
