import { isString } from './basic'

/** @description 自定义错误输出 */
class M2Error extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'M2Error'
  }
}

export function debugWarn(scope: string | Error, message?: string) {
  const error = isString(scope) ? new M2Error(`[${scope}] ${message}`) : scope
  console.warn(error)
}
