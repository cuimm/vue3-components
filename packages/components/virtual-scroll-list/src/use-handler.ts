import { isNumber } from '@m2-ui/utils'
import { DataRangeOption, UpdataRange, VirtualOptions } from './virtual-scroll-list'

enum SIZE_TYPE {
  INIT,
  FIXED, // 固定高度
  DYNAMIC // 动态高度
}

export function initVirtual(param: VirtualOptions, update: UpdataRange) {
  let offsetValue = 0
  /** @description 高度类型（固定高度/动态高度） */
  let sizeType = SIZE_TYPE.INIT
  let fixedSizeVal = 0
  let firstRangeAvg = 0
  /** @description 每一项的高度集合 */
  const sizeMapping = new Map<string | number, number>()

  const range: DataRangeOption = {
    start: 0,
    end: 0,
    paddingTop: 0,
    paddingBottom: 0
  }

  /** @description 是否为固定高度 */
  function isFixedSize() {
    return sizeType === SIZE_TYPE.FIXED
  }

  /** @description 获取每一项的大概高度 */
  function getEstimateSize() {
    return isFixedSize() ? fixedSizeVal : firstRangeAvg || param.estimateSize
  }

  /** @description 计算第i个元素的offset */
  function getIndexOffset(index: number) {
    if (!index) return 0
    let offset = 0
    for (let i = 0; i < index; i++) {
      const indexSize = sizeMapping.get(param.uniqueIds[i])
      offset += isNumber(indexSize) ? indexSize : getEstimateSize()
    }
    return offset
  }

  /** @description 上padding */
  function getPaddingTop() {
    if (isFixedSize()) {
      return range.start * fixedSizeVal
    }
    return getIndexOffset(range.start) // 将滚动后的元素高度累加
  }

  /** @description 下padding */
  function getPaddingBottom() {
    const lastIndex = param.uniqueIds.length - 1
    return (lastIndex - range.end) * getEstimateSize()
  }

  /** @description 更新数据展示范围 */
  function doUpdateDataRange(start: number, end: number) {
    range.start = start
    range.end = end
    range.paddingTop = getPaddingTop()
    range.paddingBottom = getPaddingBottom()
    update({ ...range })
  }

  /** @description 更新dataRange */
  function updateDataRange(start: number, end: number) {
    const total = param.uniqueIds.length
    const keeps = param.keeps

    if (total < keeps) {
      start = 0
      end = total - 1
    } else if (end - start + 1 < keeps) {
      start = end - keeps + 1
    }

    doUpdateDataRange(start, end)
  }

  /** @description 划过去了多少个 */
  function getScrollOvers() {
    console.log('getScrollOvers')

    if (isFixedSize()) {
      return Math.floor(offsetValue / getEstimateSize())
    } else {
      let low = 0
      let high = param.uniqueIds.length
      let middle = 0
      let middleOffset = 0
      while (low <= high) {
        middle = low + Math.floor((high - low) / 2)
        middleOffset = getIndexOffset(middle)
        if (middleOffset === offsetValue) {
          return middle
        } else if (middleOffset > offsetValue) {
          high = middle - 1
        } else if (middleOffset < offsetValue) {
          low = middle + 1
        }
      }
      return low > 0 ? --low : 0
    }
  }

  /** @description 计算结束位置 */
  function getEndByStart(start: number) {
    const computedEnd = start + param.keeps - 1
    return Math.min(computedEnd, param.uniqueIds.length - 1)
  }

  /** @description 向上滚动 */
  function upScroll() {
    const overs = getScrollOvers()

    if (overs > range.start) {
      return
    }

    // 向上划过缓冲区个数限制时更新dataRange
    const start = Math.max(overs - param.buffer, 0)
    updateDataRange(start, getEndByStart(start))
  }

  /** @description 向下滚动 */
  function downScroll() {
    const overs = getScrollOvers()

    if (overs < range.start + param.buffer) {
      return
    }

    // 向下划过缓冲区个数限制时更新dataRange
    updateDataRange(overs, getEndByStart(overs))
  }

  /** @description 滚动 */
  function handleScroll(offset: number) {
    const direction = offset < offsetValue ? 'UP' : 'DOWN'
    offsetValue = offset
    if (direction === 'DOWN') {
      downScroll()
    } else {
      upScroll()
    }
  }

  /** @description 记录每一项的高度 */
  function saveSize(uniqueKey: string | number, size: number) {
    sizeMapping.set(uniqueKey, size)

    if (sizeType === SIZE_TYPE.INIT) {
      // 第一个元素加载完毕后默认为固定高度
      fixedSizeVal = size
      sizeType = SIZE_TYPE.FIXED
    } else if (sizeType === SIZE_TYPE.FIXED && fixedSizeVal !== size) {
      // 当上次计算的定高值与当前项高度不一致时，则为动态高度
      fixedSizeVal = 0
      sizeType = SIZE_TYPE.DYNAMIC
    }

    // 动态高度时，根据已经加载的数据计算出平均值，来撑开滚动条
    if (sizeType === SIZE_TYPE.DYNAMIC) {
      if (sizeMapping.size < Math.min(param.keeps, param.uniqueIds.length)) {
        firstRangeAvg = Math.round([...sizeMapping.values()].reduce((prev, next) => prev + next, 0) / sizeMapping.size)
      }
    }
  }

  // 初始化dataRange
  updateDataRange(0, param.keeps - 1)

  return {
    handleScroll,
    saveSize
  }
}
