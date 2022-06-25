import classNames from "classnames"
import React, { useContext } from "react"
import { MenuContext }  from './MenuContext'
export interface SubMenuProps {
  index?:number
  title:string
  className?:string
  children?:React.ReactNode
}

const SubMenu:React.FC<SubMenuProps> = (props)=>{
  const {index , title , className , children} = props
  const context = useContext(MenuContext)
  const classes = classNames("menu-item submenu-item" , className , {
    "is-active":context.index === index
  })
  return (
    <li key={index} className={classes}>
      <div className="submenu-title">
        {title}
      </div>
    </li>
  )
}

