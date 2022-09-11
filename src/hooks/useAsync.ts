import { useCallback, useReducer, useState } from "react"
import { useMuntedRef } from "./dom/useMuntedRef"
import { useSafeDispatch } from './dom/useSafeDispatch';

interface State<D> {
  error: Error | null
  data: D | null
  status: "idle" | "loading" | "error" | "success"
}
const defaultInitState: State<null> = {
  status: "idle",
  data: null,
  error: null
}

const defaultConfig = {
  processErrorBySelf: false
}

export const useAsync = <D>(initState?: State<D>, initConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initConfig }
  const [state, unSafeDispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultInitState,
    ...initState
  })
  const dispatch = useSafeDispatch(unSafeDispatch)
  const [retry, setReTry] = useState(() => () => { })
  const setData = (data: D) => dispatch({
    data,
    status: "success",
    error: null
  })
  const setError = (error: Error) => dispatch({
    data: null,
    status: "error",
    error
  })

  const muntedRef = useMuntedRef()

  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!(promise instanceof Promise<D>)) {
      throw new Error("please Pass In The PromiseType !");
    }
    setReTry(() => () => {
      if (runConfig?.retry) {
        run(runConfig.retry(), runConfig)
      }
    })
    dispatch({ ...state, status: "loading" })
    return promise.then(data => {
      if (muntedRef.current) {
        setData(data)
      }
      return data
    }, (error => {
      setError(error)
      if (config.processErrorBySelf) return Promise.reject(error)
      return error
    }))
  }, [muntedRef, retry, setData, setError, state])
  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    retry,
    setData,
    setError,
    ...state
  }
}
