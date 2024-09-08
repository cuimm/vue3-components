import { type SFCWithInstall, withInstall } from '@m2-ui/utils/vue/install'
import Button from './src/button.vue'

export * from './src/button'

export const M2Button: SFCWithInstall<typeof Button> = withInstall(Button)
export default M2Button

declare module 'vue' {
  export interface GlobalComponents {
    M2Button: typeof M2Button
  }
}
