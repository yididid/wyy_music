
export function debounce (fn, wait) {
  let timer = null
  return function (...args) {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(args)
      timer = null
    }, wait)
  }
}
