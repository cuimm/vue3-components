declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

namespace JSX {
  interface IntrinsicElements {
    [key: string]: any
  }
}
