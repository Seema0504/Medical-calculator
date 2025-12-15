import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: 'src/renderer',
    base: './', // Use relative paths for simplified deployment
    build: {
        outDir: '../../dist', // Build to dist folder in root
        emptyOutDir: true
    },
    resolve: {
        alias: {
            '@renderer': resolve(__dirname, 'src/renderer/src')
        }
    }
})
