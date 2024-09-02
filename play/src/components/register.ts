import type { App } from 'vue'
import { M2Icon, M2Tree } from '@m2-ui/components'

export default {
  install(app: App<Element>) {
    const plugins = [M2Icon, M2Tree]
    plugins.forEach(plugin => {
      app.use(plugin)
    })
  }
}
