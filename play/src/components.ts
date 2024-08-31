import type { App } from 'vue'
import M2Icon from '@m2-ui/components/icon'

export default {
  install(app: App<Element>) {
    const plugins = [M2Icon]
    
    plugins.forEach((plugin) => {
      app.use(plugin)
    })
  },
}
