import { useRef ,useEffect } from "react"

export const useDocTitle =(title:string,keepOnUnmount:boolean =true)=>{
  //将传进来的title实用useRef 持久化，不受生命周期的影响
  const oldTitle = useRef(document.title).current
  //每一次都更新的doc Title
  useEffect(()=>{
    document.title = title
  },[title])

  //页面卸载时，将doc Title 置回前一次的title
  useEffect(()=>{
    return ()=>{
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  },[keepOnUnmount , oldTitle])
} 
