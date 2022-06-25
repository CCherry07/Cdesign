import classNames from "classnames"
import React, { useContext, useState } from "react"
import { MenuContext }  from './MenuContext'
import { MenuItemProps } from "./menuItem"
export interface SubMenuProps {
  index?:number
  title:string
  className?:string
  children?:React.ReactNode
}

const SubMenu:React.FC<SubMenuProps> = (props)=>{
  const {index , title , className , children} = props
  const context = useContext(MenuContext)
  const [ menuOpen , setOpen ] = useState(false)
  const classes = classNames("menu-item submenu-item" , className , {
    "is-active":context.index === index
  })

  const handleClick = (e:React.MouseEvent)=>{
    e.stopPropagation()
    setOpen(!menuOpen)
  }

  let timer:any
  const handleHover = (e:React.MouseEvent , toggle:boolean)=>{
    clearTimeout(timer)
    e.stopPropagation()
    timer =setTimeout(()=>{
      setOpen(toggle)
    },300)
  }

  const clickEvents = context.mode ==="vertical" ? {
    onClick:handleClick
  }:null
  const hoverEvents = context.mode !=="vertical" ? {
    onMouseEnter:(e:React.MouseEvent)=>handleHover(e,true),
    onMouseLeave:(e:React.MouseEvent)=>handleHover(e,false)
  }:null
  
  const renderChildren = () =>{
    const subMenuClasses = classNames("viking-submenu", {
      "menu-opened":menuOpen
    })
    const childrenEls = React.Children.map(children,(child , index)=>{
      const childEl = child as React.FunctionComponentElement<MenuItemProps>
      const { name } = childEl.type      
      if (name === "MenuItem") {
        return React.cloneElement(childEl , { index })
      }else{
        console.error("warning: Menu has is a child is not a MenuItem");
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childrenEls}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

export default SubMenu
