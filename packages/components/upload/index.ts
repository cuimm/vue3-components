import { type SFCWithInstall } from '@m2-ui/utils'
import { withInstall } from '@m2-ui/utils'

import Upload from './src/upload.vue'

export * from './src/types'
export * from './src/upload'

export const M2Upload: SFCWithInstall<typeof Upload> = withInstall(Upload)
export default M2Upload

declare module 'vue' {
  export interface GlobalComponents {
    M2Upload: typeof M2Upload
  }
}
