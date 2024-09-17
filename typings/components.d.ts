declare module 'vue' {
  export interface GlobalComponents {
    M2Button: typeof import('@m2-ui/components')['M2Button']
    M2Checkbox: typeof import('@m2-ui/components')['M2Checkbox']
    M2CheckboxGroup: typeof import('@m2-ui/components')['M2CheckboxGroup']
    M2Form: typeof import('@m2-ui/components')['M2Form']
    M2FormItem: typeof import('@m2-ui/components')['M2FormItem']
    M2Icon: typeof import('@m2-ui/components')['M2Icon']
    M2Input: typeof import('@m2-ui/components')['M2Input']
    M2Tree: typeof import('@m2-ui/components')['M2Tree']
    M2VirtualList: typeof import('@m2-ui/components')['M2VirtualList']
    M2Upload: typeof import('@m2-ui/components')['M2Upload']
    M2Progress: typeof import('@m2-ui/components')['M2Progress']
    M2VirtualScrollList: typeof import('@m2-ui/components')['M2VirtualScrollList']
  }
}

// .d.ts中有import/export时，说明是对已有模块(vue)进行类型合并。否则就是对类型进行全局覆盖。
export {}
