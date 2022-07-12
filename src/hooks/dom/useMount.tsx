import { useEffect } from "react"

export const useMount =(cb:()=>void)=>{
  useEffect(()=>{
    cb()
  },[])
}
