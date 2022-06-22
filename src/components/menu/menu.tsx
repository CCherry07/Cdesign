import React, { createContext  , useState} from 'react'
import classNames from 'classnames'
import item from './menuItem'
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

interface MenuContext {
  index:number
  onSelect?: onSelect
}

export interface Menu {
  item:React.ReactNode
}


export const MenuContext = createContext<MenuContext>({ index:0 })

const Menu:React.FC<MenuProps> = (props) =>{
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
