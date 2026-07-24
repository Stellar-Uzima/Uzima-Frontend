const React = require('react')

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function useVirtualizer(options) {
  const {
    count,
    getScrollElement,
    estimateSize,
    overscan = 1,
    getItemKey = (index) => index,
    measureElement,
  } = options

  const sizeMapRef = React.useRef(new Map())
  const [viewportHeight, setViewportHeight] = React.useState(0)
  const [scrollOffset, setScrollOffset] = React.useState(0)
  const [version, setVersion] = React.useState(0)

  React.useEffect(() => {
    const scrollElement = getScrollElement()
    if (!scrollElement) return

    const updateMetrics = () => {
      setViewportHeight(scrollElement.clientHeight)
      setScrollOffset(scrollElement.scrollTop)
    }

    updateMetrics()
    scrollElement.addEventListener('scroll', updateMetrics, { passive: true })

    let resizeObserver
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateMetrics)
      resizeObserver.observe(scrollElement)
    }

    return () => {
      scrollElement.removeEventListener('scroll', updateMetrics)
      resizeObserver?.disconnect()
    }
  }, [getScrollElement])

  const getSize = React.useCallback(
    (index) => sizeMapRef.current.get(index) ?? estimateSize(index),
    [estimateSize],
  )

  const offsets = React.useMemo(() => {
    const starts = new Array(count)
    let current = 0

    for (let i = 0; i < count; i += 1) {
      starts[i] = current
      current += getSize(i)
    }

    return { starts, total: current }
  }, [count, getSize, version])

  const range = React.useMemo(() => {
    if (count === 0) {
      return { start: 0, end: -1 }
    }

    const maxOffset = scrollOffset + viewportHeight
    let start = 0

    while (start < count - 1 && offsets.starts[start] + getSize(start) < scrollOffset) {
      start += 1
    }

    let end = start
    while (end < count - 1 && offsets.starts[end] < maxOffset) {
      end += 1
    }

    return {
      start: clamp(start - overscan, 0, count - 1),
      end: clamp(end + overscan, 0, count - 1),
    }
  }, [count, getSize, offsets.starts, overscan, scrollOffset, viewportHeight])

  const virtualItems = React.useMemo(() => {
    if (range.end < range.start) return []

    const items = []
    for (let index = range.start; index <= range.end; index += 1) {
      const size = getSize(index)
      items.push({
        index,
        key: getItemKey(index),
        start: offsets.starts[index],
        size,
        end: offsets.starts[index] + size,
      })
    }

    return items
  }, [getItemKey, getSize, offsets.starts, range.end, range.start])

  const wrappedMeasureElement = React.useCallback(
    (element) => {
      if (!element) return

      const rawIndex = element.dataset.index
      const index = Number(rawIndex)
      if (!Number.isInteger(index) || index < 0) return

      const measured = measureElement ? measureElement(element) : element.getBoundingClientRect().height
      const previous = sizeMapRef.current.get(index)

      if (previous !== measured) {
        sizeMapRef.current.set(index, measured)
        setVersion((current) => current + 1)
      }
    },
    [measureElement],
  )

  const measure = React.useCallback(() => {
    setVersion((current) => current + 1)
  }, [])

  const getTotalSize = React.useCallback(() => offsets.total, [offsets.total])

  return {
    getTotalSize,
    getVirtualItems: () => virtualItems,
    measure,
    measureElement: wrappedMeasureElement,
  }
}

module.exports = {
  useVirtualizer,
}
