import { useEffect, useRef } from "react"

// 判断 首屏dom 是否已经挂载完成
export const useMuntedRef = () => {
  const muntedRef = useRef(false)
  useEffect(() => {
    muntedRef.current = true
    return () => {
      muntedRef.current = false
    }
  })
  return muntedRef
}
