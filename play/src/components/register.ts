import type { App } from 'vue'
import {
  M2Icon,
  M2Tree,
  M2Checkbox,
  M2CheckboxGroup,
  M2Button,
  M2Input,
  M2Form,
  M2FormItem,
  M2Upload,
  M2Progress,
  M2VirtualScrollList
} from '@m2-ui/components'

export default {
  install(app: App<Element>) {
    const plugins = [
      M2Icon,
      M2Tree,
      M2Checkbox,
      M2CheckboxGroup,
      M2Button,
      M2Input,
      M2Form,
      M2FormItem,
      M2Upload,
      M2Progress,
      M2VirtualScrollList
    ]
    plugins.forEach(plugin => {
      app.use(plugin)
    })
  }
}
