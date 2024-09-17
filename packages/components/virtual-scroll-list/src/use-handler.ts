import { DataRangeOption, UpdataRange, VirtualOptions } from './virtual-scroll-list'

export function initVirtual(param: VirtualOptions, update: UpdataRange) {
  let offsetValue = 0
  const range: DataRangeOption = {
    start: 0,
    end: 0,
    paddingTop: 0,
    paddingBottom: 0
  }

  /** @description 上padding */
  function getPaddingTop() {
    return range.start * param.estimateSize
  }

  /** @description 下padding */
  function getPaddingBottom() {
    return (param.uniqueIds.length - range.end - 1) * param.estimateSize
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
    return Math.floor(offsetValue / param.estimateSize)
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

  updateDataRange(0, param.keeps - 1)

  return {
    handleScroll
  }
}
