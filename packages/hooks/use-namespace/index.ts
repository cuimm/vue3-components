export const defaultNamespace = 'm2'
const statePrefirx = 'is-'

/**
 * 拼接BEM规范
 * @param namespace 命名空间
 * @param block 模块
 * @param blockPrefix 代码块
 * @param element 元素
 * @param modifier 装饰
 * @returns bem
 */
function _bem(namespace: string, block: string, blockPrefix: string, element: string, modifier: string) {
  let cls = `${namespace}-${block}`
  if (blockPrefix) {
    cls += `-${blockPrefix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

function createBEM(block: string) {
  const namespace = defaultNamespace

  const b = (blockPrefix = '') => _bem(defaultNamespace, block, blockPrefix, '', '')

  const e = (element = '') => (element ? _bem(defaultNamespace, block, '', element, '') : '')

  const m = (modifier = '') => (modifier ? _bem(defaultNamespace, block, '', '', modifier) : '')

  const be = (blockPrefix = '', element = '') =>
    blockPrefix && element ? _bem(defaultNamespace, block, blockPrefix, element, '') : ''

  const bm = (blockPrefix = '', modifier = '') =>
    blockPrefix && modifier ? _bem(defaultNamespace, block, blockPrefix, '', modifier) : ''

  const em = (element = '', modifier = '') =>
    element && modifier ? _bem(defaultNamespace, block, '', element, modifier) : ''

  const bem = (blockPrefix = '', element = '', modifier = '') =>
    blockPrefix && element && modifier ? _bem(defaultNamespace, block, blockPrefix, element, modifier) : ''

  // TS的函数重载
  const is: {
    (name: string, state: string | boolean): string
    (name: string): string
  } = (name: string, ...args: [string | boolean] | []) => {
    const state = args.length >= 1 ? args[0] : true
    return name && state ? `${statePrefirx}${name}` : ''
  }

  return {
    namespace,
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is
  }
}

export const useNamespace = (block: string) => {
  return createBEM(block)
}

export type UseNamespaceReturnType = ReturnType<typeof useNamespace>

/*
const bem = useNamespace('icon')
console.log(bem.b()) // m2-icon
console.log(bem.b('box')) // m2-icon-box
console.log(bem.e('element')) // m2-icon__element
console.log(bem.m('modifier')) // m2-icon--modifier
console.log(bem.be('box', 'element')) // m2-icon-box__element
console.log(bem.bm('box', 'modifier')) // m2-icon-box--modifier
console.log(bem.em('element', 'modifier')) // m2-icon__element--modifier
console.log(bem.bem('box', 'element', 'modifier')) // m2-icon-box__element--modifier
console.log(bem.is('disabled')) // is-disabled
console.log(bem.is('disabled', false)) // 空
*/
