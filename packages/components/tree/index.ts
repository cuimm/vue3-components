import { type SFCWithInstall, withInstall } from '@m2-ui/utils/vue/install'
import Tree from './src/tree.vue'

export * from './src/tree'

export const M2Tree: SFCWithInstall<typeof Tree> = withInstall(Tree)
export default M2Tree

declare module 'vue' {
  export interface GlobalComponents {
    M2Tree: typeof M2Tree
  }
}
