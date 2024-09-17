import { SFCWithInstall, withInstall } from '@m2-ui/utils'
import VirtualScrollList from './src/virtual-scroll-list.tsx'

export * from './src/virtual-scroll-list.ts'

export const M2VirtualScrollList: SFCWithInstall<typeof VirtualScrollList> = withInstall(VirtualScrollList)
export default M2VirtualScrollList

declare module 'vue' {
  export interface GlobalComponents {
    M2VirtualScrollList: typeof M2VirtualScrollList
  }
}
