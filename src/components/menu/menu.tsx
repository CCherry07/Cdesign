import React, { useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { MenuContext } from './MenuContext';
import item, { MenuItemProps } from './menuItem';
import SubMenu, { SubMenuProps } from './SubMenu'

export type MenuMode = 'horizontal' | 'vertical';
export type onSelect = (selectIndex:string)=>void;
export interface MenuProps {
  defaultIndext?:string
  className?:string
  mode?:MenuMode
  style?:React.CSSProperties
  onSelect?:onSelect
  defaultOpenSubMenus?:string[]
  children?: React.ReactNode
}

export interface MenuRc extends FC<MenuProps> {
  Item:React.FC<MenuItemProps>
  SubMenu:React.FC<SubMenuProps>
}

const Menu:MenuRc = (props) => {
  const {
    defaultIndext, className, mode, style,defaultOpenSubMenus, onSelect, children,
  } = props;
  const [currentActive, setActive] = useState(defaultIndext);
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    "menu-horizontal":mode !== "vertical"
  });
  const handleClick = (index:string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext:MenuContext = {
    mode,
    defaultOpenSubMenus,
    index: currentActive || "0",
    onSelect: handleClick,
  };
  const renderChildren = () =>{
    return React.Children.map(children,(child , index)=>{
      const childEl = child as React.FunctionComponentElement<MenuItemProps>
      const { name } = childEl.type
      if (name === "MenuItem" || name === "SubMenu") {
        return React.cloneElement(childEl , { index:index.toString() })
      }else{
        console.error("warning: Menu has is a child is not a MenuItem");
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        { renderChildren() }
      </MenuContext.Provider>
    </ul>
  );
};
Menu.SubMenu = SubMenu
Menu.Item = item;
Menu.defaultProps = {
  defaultIndext: "0",
  mode: 'horizontal',
};

export default Menu;
