export function getProp(obj: Record<string, any>, path: string, defaultVal?: any) {
  return {
    get value() {
      return obj[path] ?? defaultVal
    },
    set value(val: any) {
      obj[path] = val
    }
  }
}
