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
    return isFixedSize() ? fixedSizeVal : param.estimateSize
  }

  /** @description 上padding */
  function getPaddingTop() {
    return range.start * getEstimateSize()
  }

  /** @description 下padding */
  function getPaddingBottom() {
    return (param.uniqueIds.length - range.end - 1) * getEstimateSize()
  }

  function doUpdateDataRange(start: number, end: number) {
    range.start = start
    range.end = end
    range.paddingTop = getPaddingTop()
    range.paddingBottom = getPaddingBottom()
    update({ ...range })
  }

  function updateDataRange(start: number, end: number) {
    const total = param.uniqueIds.length - 1
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
    return Math.floor(offsetValue / getEstimateSize())
  }

  /** @description 计算结束位置 */
  function getEndByStart(start: number) {
    return Math.min(start + param.keeps - 1, param.uniqueIds.length - 1)
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
    if (offset >= offsetValue) {
      downScroll()
    } else {
      upScroll()
    }
    offsetValue = offset
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
  }

  // 初始化dataRange
  updateDataRange(0, param.keeps - 1)

  return {
    handleScroll,
    saveSize
  }
}
