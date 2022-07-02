import { RefObject, useEffect } from "react";

export const useClickTargetOutsite = (targetRef:RefObject<HTMLElement>,callBack:Function) =>{
  useEffect(() => {
    const listener = (event:MouseEvent)=>{
      if (!targetRef.current || targetRef.current.contains(event.target as HTMLElement)) return
      callBack(event)
    }
    document.addEventListener("click",listener)
    return () => {
      document.removeEventListener("click",listener)
    }
  },[targetRef,callBack])
}
