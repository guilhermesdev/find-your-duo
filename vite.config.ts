import * as path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePluginFonts } from 'vite-plugin-fonts';

export default defineConfig({
	plugins: [
		vue(),
		VitePluginFonts({
			google: {
				families: [{ name: 'Inter', styles: 'wght@400;500;600;700;900' }]
			}
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	server: {
		port: 3000
	}
});
