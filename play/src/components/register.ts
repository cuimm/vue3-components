import type { App } from 'vue'
import { M2Icon, M2Tree, M2Checkbox, M2CheckboxGroup, M2Button, M2Input } from '@m2-ui/components'

export default {
  install(app: App<Element>) {
    const plugins = [M2Icon, M2Tree, M2Checkbox, M2CheckboxGroup, M2Button, M2Input]
    plugins.forEach(plugin => {
      app.use(plugin)
    })
  }
}
