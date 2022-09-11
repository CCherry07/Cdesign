import { useCallback } from "react"
import { useMuntedRef } from "./useMuntedRef"

export const useSafeDispatch = <S>(dispatch: React.Dispatch<S>) => {
  const { current: isMounted } = useMuntedRef()
  return useCallback((...args: [S]) => isMounted ? dispatch(...args) : void 0, [dispatch, isMounted])
}
