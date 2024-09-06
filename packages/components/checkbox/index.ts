import { SFCWithInstall, withInstall } from '@m2-ui/utils/vue/install'
import Checkbox from './src/checkbox.vue'
import CheckboxGroup from './src/checkbox-group.vue'

export * from './src/checkbox'
export * from './src/checkbox-group'

export const M2Checkbox: SFCWithInstall<typeof Checkbox> = withInstall(Checkbox)
export const M2CheckboxGroup: SFCWithInstall<typeof CheckboxGroup> = withInstall(CheckboxGroup)

export default { M2Checkbox, M2CheckboxGroup }

declare module 'vue' {
  export interface GlobalComponents {
    M2Checkbox: typeof M2Checkbox
    M2CheckboxGroup: typeof M2CheckboxGroup
  }
}
