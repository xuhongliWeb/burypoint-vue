type Nullable<T> = T | null
type TimeoutId = ReturnType<typeof window.setTimeout>

// 返回埋点信息模板

function getTemplate(): Record<string, any> {
  return {
    eventTime: Date.now(),
    eventResource: '',
    eventModule: '',
    action: '',
  }
}

// 节流

function throttle<C, T extends unknown[]>(
    fn: (this: C, ...args: T) => void,
    delay = 200,
    immediate = false,
  ): (this: C, ...args: T) => void {
    let timer: Nullable<TimeoutId> = null,
      remaining = 0,
      previous = Date.now()
    return function (...args: T) {
      const now = Date.now()
      remaining = now - previous
      if (remaining >= delay || immediate) {
        if (timer) clearTimeout(timer)
        fn.call(this, ...args)
        previous = now
        immediate = false
      } else {
        if (timer) return
        timer = setTimeout(() => {
          fn.call(this, ...args)
          previous = Date.now()
        }, delay - remaining)
      }
    }
  }

export { getTemplate,throttle }
