import { SFCWithInstall, withInstall } from '@m2-ui/utils'
import Progress from './src/progress.vue'

export const M2Progress: SFCWithInstall<typeof Progress> = withInstall(Progress)
export default M2Progress

export * from './src/progress'

declare module 'vue' {
  export interface GlobalComponents {
    M2Progress: typeof M2Progress
  }
}
