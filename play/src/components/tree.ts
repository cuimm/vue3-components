import { TreeOption } from '@m2-ui/components'

const keyField = 'key2'
const labelField = 'label2'
const childrenField = 'children2'

/**
 * 模拟 m2-tree data
 * @param level 层级数
 * @param parentNode 父级节点
 * @param deepth 深度
 */
export function createTreeData(level: number, parentNode = null as TreeOption | null, deepth = 0): TreeOption[] {
  if (level === 0) return []
  const data = new Array(6 - level).fill(0)
  return data.map((_, index) => {
    const key = parentNode?.key ? `${parentNode?.key}_${level}${index}` : `${level}${index}`
    const node: TreeOption = {
      [keyField]: key,
      [labelField]: `${deepth + 1}层级`,
      [childrenField]: [],
      deepth: deepth
    }
    node[childrenField] = createTreeData(level - 1, node, deepth + 1)
    return node
  })
}
