import React, { useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { MenuContext } from './MenuContext';
import item, { MenuItemProps } from './menuItem';
import SubMenu, { SubMenuProps } from './SubMenu'


type MenuMode = 'horizontal' | 'vertical';
type onSelect = (selectIndex:number)=>void;
export interface MenuProps {
  defaultIndext?:number
  className?:string
  mode?:MenuMode
  style?:React.CSSProperties
  onSelect?:onSelect
  children?: React.ReactNode
}

export interface MenuRc extends FC<MenuProps> {
  Item:React.FC<MenuItemProps>
  SubMenu:React.FC<SubMenuProps>
}

const Menu:MenuRc = (props) => {
  const {
    defaultIndext, className, mode, style, onSelect, children,
  } = props;
  const [currentActive, setActive] = useState(defaultIndext);
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    "menu-horizontal":mode !== "vertical"
  });
  const handleClick = (index:number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext:MenuContext = {
    index: currentActive || 0,
    onSelect: handleClick,
  };
  const renderChildren = () =>{
    return React.Children.map(children,(child , index)=>{
      const childEl = child as React.FunctionComponentElement<MenuItemProps>
      const { name } = childEl.type
      if (name === ( "MenuItem" || "SubMenu")) {
        return React.cloneElement(childEl , { index })
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
  defaultIndext: 0,
  mode: 'horizontal',
};

export default Menu;
