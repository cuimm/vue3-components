import { ref, toRaw, type Ref } from 'vue'
import { type TreeOption, type KeyType } from '@m2-ui/components'

const keyField = 'key2'
const labelField = 'label2'
const childrenField = 'children2'

export const selectedKeysRef = ref<KeyType[]>(['40'])
export const checkedKeysRef = ref<KeyType[]>(['41'])

// 1）同步加载
export const treeData = ref(createTreeData(4)) as unknown as Ref<TreeOption[]>
console.log('treeData: ', toRaw(treeData.value))

// 2）异步加载tree
export const treeAsyncData = ref(createAsyncData())

// 3）虚拟滚动
export const treeVirtualData = ref(createTreeData(4, 20)) as unknown as Ref<TreeOption[]>
// console.log('treeVirtualData: ', toRaw(treeVirtualData.value))

/** @description 模拟异步加载 */
function createAsyncData() {
  return [
    {
      [labelField]: nextLabel(),
      [keyField]: 1,
      isLeaf: false
    },
    {
      [labelField]: nextLabel(),
      [keyField]: 2,
      isLeaf: false
    }
  ]
}

function nextLabel(currentLabel?: string | number | unknown): string {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}

/** @description 异步加载load */
export function handleLoad(node: TreeOption): Promise<TreeOption[]> {
  console.log('handleLoad: ', node)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          [labelField]: nextLabel(node[labelField]),
          [keyField]: node[keyField] + nextLabel(node[labelField]),
          isLeaf: false
        }
      ])
    }, 0)
  })
}

/**
 * 模拟 m2-tree data
 * @param level 嵌套层级数
 * @param length 每一层数组长度
 * @param parentNode 父级节点
 * @param deepth 深度
 */
export function createTreeData(
  level: number,
  length = 2,
  parentNode = null as TreeOption | null,
  deepth = 0
): TreeOption[] {
  if (level === 0) return []
  const data = new Array(length).fill(0)
  return data.map((_, index) => {
    const key = parentNode?.[keyField] ? `${parentNode?.[keyField]}_${level}${index}` : `${level}${index}`
    const node: TreeOption = {
      [keyField]: key,
      [labelField]: `${deepth + 1}-${index}`,
      [childrenField]: [],
      deepth: deepth,
      disabled: deepth === 3 ? true : false
    }
    node[childrenField] = createTreeData(level - 1, length, node, deepth + 1)
    return node
  })
}
