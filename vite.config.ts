import { defineConfig } from 'vite'
import { resolve } from 'path'
import { copyFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        module: resolve(__dirname, 'src/scripts/module.ts'),
        styles: resolve(__dirname, 'src/styles/module.scss')
      },
      output: {
        dir: 'dist',
        format: 'es',
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'module' ? 'scripts/module.js' : '[name].js'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles/[name][extname]'
          }
          return '[name][extname]'
        }
      }
    },
    target: 'es2022',
    minify: false,
    sourcemap: true
  },
  plugins: [
    {
      name: 'copy-module-json',
      writeBundle() {
        copyFileSync(
          'src/module.json',
          'dist/module.json'
        )
      }
    }
  ]
})