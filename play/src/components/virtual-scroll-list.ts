import { ref } from 'vue'
import { Random } from 'mockjs'

export interface VirtualScrollDataItem {
  id: number
  title: string
  desc: string
  index: number
}

const data: VirtualScrollDataItem[] = []

const totalCount = 1000
let index = 0
while (index !== totalCount) {
  data.push({
    id: index,
    title: Random.title(),
    desc: Random.csentence(20, 120),
    index: index
  })
  index++
}

const dataSources = ref<VirtualScrollDataItem[]>(data)

export { dataSources }
