import { isArray } from './basic'

/** @description 将目标数据转换成数组 */
export const castArray = (arr: any) => {
  if (!arr) return []
  return isArray(arr) ? arr : [arr]
}
