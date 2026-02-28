import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        // default development port for frontend
        port: 8081,
        proxy: {
            '/api': {
                // forward API calls to local backend port
                target: 'http://127.0.0.1:8086',
                changeOrigin: true,
            },
        },
    },
})
