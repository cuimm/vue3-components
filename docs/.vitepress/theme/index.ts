import DefaultTheme from 'vitepress/theme'
import { M2Icon } from '@m2-ui/components'
import '@m2-ui/theme-chalk/index.scss'

export default {
  ...DefaultTheme, // 使用默认主题
  enhanceApp({ app }) {
    app.use(M2Icon) // 在vitepress中注册全局组件
  }
}
