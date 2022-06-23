import React, { useState } from 'react'
import type { FC } from 'react'
import classNames from 'classnames'
import item, { MenuItemProps } from './menuItem'
import { MenuContext } from './MenuContext'
type MenuMode = "horizontal" | "vertical"
type onSelect = (selectIndex:number)=>void
export interface MenuProps {
  defaultIndext?:number
  className?:string
  mode?:MenuMode
  style?:React.CSSProperties
  onSelect?:onSelect
  children?: React.ReactNode
}

export interface MenuFc extends FC<MenuProps> {
  item:React.FC<MenuItemProps>
}


const Menu:MenuFc = (props) =>{
  const { defaultIndext, className , mode , style ,onSelect, children} = props
  const [currentActive, setActive] = useState(defaultIndext)
  const classes = classNames("viking-menu" , className , {
    "menu-vertical": mode === "vertical"
  })
  const handleClick = (index:number)=>{
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext:MenuContext = {
    index:currentActive || 0,
    onSelect:handleClick
  }
  return(
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
          { children }
      </MenuContext.Provider>
    </ul>
  )
}

Menu.item = item
Menu.defaultProps = {
  defaultIndext:0,
  mode:"horizontal"
} 

export default Menu
