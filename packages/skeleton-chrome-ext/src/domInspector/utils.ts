export function mixin(
  target: Record<string, any>,
  source: Record<string, any>
): Record<string, any> {
  const targetCopy = target
  Object.keys(source).forEach(item => {
    if ({}.hasOwnProperty.call(source, item)) {
      targetCopy[item] = source[item]
    }
  })
  return targetCopy
}

export function throttle(func: (...args: any[]) => any, wait = 100): (...args: any[]) => any {
  let timeout: ReturnType<typeof setTimeout>
  let elapsed
  let lastRunTime = Date.now() // 上次运行时间
  return function(...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this

    clearTimeout(timeout)

    elapsed = Date.now() - lastRunTime

    function later() {
      lastRunTime = Date.now()
      timeout = null
      func.apply(_this, args)
    }

    if (elapsed > wait) {
      later()
    } else {
      timeout = setTimeout(later, wait - elapsed)
    }
  }
}

export function isNull(obj: Record<string, any>): boolean {
  return (
    Object.prototype.toString
      .call(obj)
      .replace(/\[object[\s]/, '')
      .replace(']', '')
      .toLowerCase() === 'null'
  )
}

export default null
