import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		vue()
	],
	publicDir: 'test-files',
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			},
		},
	},
})
