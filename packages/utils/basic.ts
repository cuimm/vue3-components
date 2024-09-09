export const NOOP = () => {}

export const objectToString = Object.prototype.toString

export const toTypeString = (val: unknown) => objectToString.call(val)

export const hasOwn = (val: object, key: string): key is keyof typeof val =>
  Object.prototype.hasOwnProperty.call(val, key)

export const isUndefined = (val: unknown): val is undefined => val === undefined

export const isNull = (val: unknown): val is null => val === null

export const IsNil = (val: unknown): val is null | undefined => isUndefined(val) || isNull(val)

export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isNumber = (val: unknown): val is number => typeof val === 'number'

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'

export const isArray = Array.isArray

export const isObject = (val: unknown): val is Record<string, unknown> => val !== null && typeof val === 'object'

export const isFunction = (val: unknown) => typeof val === 'function'

export const isPlainObject = (val: unknown) => toTypeString(val) === '[object Object]'

export const isDate = (val: unknown) => toTypeString(val) === '[object Date]'

export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'

export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'

export const isPromise = (val: unknown) => {
  return (isObject(val) || isFunction(val)) && isFunction((val as any).then) && isFunction((val as any).catch)
}
