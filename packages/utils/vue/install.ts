import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(comp: T) {
  ;(comp as SFCWithInstall<T>).install = function (app: App<Element>) {
    const { name } = comp as unknown as { name: string }
    app.component(name, comp as Element) // 将组件注册为全局组件
  }
  return comp as SFCWithInstall<T>
}
