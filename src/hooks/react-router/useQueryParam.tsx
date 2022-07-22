import { useMemo, useState } from "react"
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { clearObject, subset } from "../../utils"

// 获取param 中的键值对
export const useQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const [stateKeys] = useState(keys)
  return [
    useMemo(
      () => {
        return subset(Object.fromEntries(searchParams), stateKeys)
      }, [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      return setSearchParams(params)
    }
  ] as const
}

// 更新Url Search query
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  return (params: { [key in string]: unknown }) => {
    const o = clearObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
    return setSearchParams(o)
  }
}
