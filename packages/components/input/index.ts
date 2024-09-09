import { withInstall } from '@m2-ui/utils/vue/install'
import { type SFCWithInstall } from '@m2-ui/utils/vue/install'
import Input from './src/input.vue'

export const M2Input: SFCWithInstall<typeof Input> = withInstall(Input)
export default M2Input

export * from './src/input'
export type { InputInstance } from './src/instance'

declare module 'vue' {
  export interface GlobalComponents {
    M2Input: typeof M2Input
  }
}
