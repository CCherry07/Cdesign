import classNames from "classnames"
import React, { ReactNode, useContext, useState } from "react"
import QueueAnim from 'rc-queue-anim';
import Icon from "../icon"
import { MenuContext }  from './MenuContext'
import { MenuItemProps } from "./menuItem"
export interface SubMenuProps {
  index?:string
  title:string
  className?:string
  children?:React.ReactNode
}

const SubMenu:React.FC<SubMenuProps> = (props)=>{
  const {index , title , className , children} = props
  const { defaultOpenSubMenus, ...context} = useContext(MenuContext)
  const isOpend = (index && context.mode === "vertical") ? (defaultOpenSubMenus || []).includes(index) : false
  const [ menuOpen , setOpen ] = useState(isOpend)
  const classes = classNames("menu-item submenu-item" , className , {
    "is-active":context.index === index,
    "trans-icon":menuOpen,
    "is-opened":menuOpen,
    "is-vertical":context.mode === "vertical"
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
    const childrenEls = React.Children.map(children,(child , idx)=>{
      const childEl = child as React.FunctionComponentElement<MenuItemProps>
      const { name } = childEl.type      
      if (name === "MenuItem") {
        return React.cloneElement(childEl,{index:`${index}-${idx}`})
      }else{
        console.error("warning: Menu has is a child is not a MenuItem");
      }
    })
    return (
      <QueueAnim type={['right', 'left']} leaveReverse>
        { menuOpen? ( <ul className={subMenuClasses} key="cherry">
                        { childrenEls }
                     </ul> ): null }
      </QueueAnim>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

export default SubMenu
