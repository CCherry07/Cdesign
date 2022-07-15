import { ChangeEvent, InputHTMLAttributes, StyleHTMLAttributes } from "react"
import classNames from "classnames"
import { IconProp } from '@fortawesome/fontawesome-svg-core'


export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement> , "size"> {
  disabled?:boolean
  size?:"lg"|"sm"
  icon?:IconProp
  prepand?:string | React.ReactNode
  append?:string | React.ReactNode
  children?:React.ReactNode
  onChange?:(e:ChangeEvent<HTMLInputElement>)=>void
}
export const Input:React.FC<InputProps> = (props)=>{
  const { disabled , size , style, icon , prepand , append , children, ...restProps } = props
  const classes = classNames("cd-input-wrapper",{
    [`input-size-${size}`]:size,
    "is-disabled":disabled,
    "input-group":prepand || append,
    "input-group-append":!!append,
    "input-group-prepand":!!prepand
  })

  const convertControlledvalue = (value:any)=>{
    if (typeof value === "undefined" || value === null) {
      return ""
    }
    return value
  }

  if ("value" in props) {
    props.defaultValue && delete props.defaultValue
    restProps.value = convertControlledvalue(props.value)
  }

  return (
    <div className={classes} style={style}>
      { append && <div className="cd-input-group-append"> { append }</div> }
      <input 
        className="cd-input-inner"
        disabled={disabled}
        {...restProps}
      />
      { prepand && <div className="cd-input-group-prepand"> { prepand }</div> }
    </div>
  )
}


export default Input
