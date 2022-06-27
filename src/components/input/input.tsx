import { InputHTMLAttributes } from "react"
import classNames from "classnames"
import { IconProp } from '@fortawesome/fontawesome-svg-core'


export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement> , "size"> {
  disabled?:boolean
  size?:"lg|sm"
  icon?:IconProp
  prepand?:string | React.ReactNode
  append?:string | React.ReactNode
  children?:React.ReactNode
}

export const Input:React.FC<InputProps> = (props)=>{
  const { disabled , size , icon , prepand , append , children, ...restProps } = props
  const classes = classNames()
  return (
    <input> { children }  </input>
  )
}


export default Input
