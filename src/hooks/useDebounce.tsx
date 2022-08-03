import { useState, useEffect } from "react"

export const useDebounce = <T,>(value: T, delay = 300): T => {
  const [stateDebounce, setDebounceState] = useState(value)
  let timer: any
  useEffect(() => {
    timer = setTimeout(() => {
      setDebounceState(value)
    }, delay);
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return stateDebounce
}
