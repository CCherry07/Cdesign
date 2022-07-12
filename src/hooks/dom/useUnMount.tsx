import { useEffect, useRef } from 'react'

export const useUnMount = (cb:()=>void)=>{
  const fnRef = useRef(cb)
  fnRef.current = cb
  useEffect(()=>()=>fnRef.current(),[])
}
