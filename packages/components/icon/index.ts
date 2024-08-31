import { SFCWithInstall, withInstall } from '@m2-ui/utils/vue/install'
import Icon from './src/icon.vue' // 导入vue文件

export * from './src/icon' // 导出TS文件

export const M2Icon: SFCWithInstall<typeof Icon> = withInstall(Icon)
export default M2Icon

// 这里添加的类型，可以在模版中被解析，更加友好的进行类型推断
declare module 'vue' {
  export interface GlobalComponents {
    M2Icon: typeof M2Icon
  }
}
