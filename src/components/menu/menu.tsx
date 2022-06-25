import React, { useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import item, { MenuItemProps } from './menuItem';
import { MenuContext } from './MenuContext';

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
  item:React.FC<MenuItemProps>
}

const Menu:MenuRc = (props) => {
  const {
    defaultIndext, className, mode, style, onSelect, children,
  } = props;
  const [currentActive, setActive] = useState(defaultIndext);
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
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
      if (name === "MenuItem") {
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

Menu.item = item;
Menu.defaultProps = {
  defaultIndext: 0,
  mode: 'horizontal',
};

export default Menu;
