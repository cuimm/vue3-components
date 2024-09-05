import { SFCWithInstall, withInstall } from '@m2-ui/utils/vue/install'
import VirtualLIst from './src/virtual-list.tsx'

export * from './src/virtual-list'

export const M2VirtualList: SFCWithInstall<typeof VirtualLIst> = withInstall(VirtualLIst)
export default M2VirtualList

declare module 'vue' {
  export interface GlobalComponents {
    M2VirtualList: typeof M2VirtualList
  }
}
