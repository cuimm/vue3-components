import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import defineOptions from 'unplugin-vue-define-options/vite' // defineOptions的插件，可用来定义组件名称等...

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), defineOptions()],
})
