import { type SFCWithInstall, withInstall } from '@m2-ui/utils/vue/install'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export * from './src/form'
export * from './src/form-item'
export * from './src/constants'
export * from './src/types'
export * from './src/hooks'

export const M2Form: SFCWithInstall<typeof Form> = withInstall(Form)
export const M2FormItem: SFCWithInstall<typeof FormItem> = withInstall(FormItem)
export default { M2Form, M2FormItem }

export type FormInstance = InstanceType<typeof Form>
export type ForItemInstance = InstanceType<typeof FormItem>

declare module 'vue' {
  export interface GlobalComponents {
    M2Form: typeof M2Form
    M2FormItem: typeof M2FormItem
  }
}
