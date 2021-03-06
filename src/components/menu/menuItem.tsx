import React, { useContext } from 'react';
import classNames from 'classnames';

import { MenuContext } from './MenuContext';

export interface MenuItemProps {
  index?:string
  disabled?:boolean
  className?:string
  style?:React.CSSProperties
  children?:React.ReactNode
}

const MenuItem:React.FC<MenuItemProps> = (props) => {
  const {
    index, disabled, className, style, children,
  } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index,
  });
  const handleClick = () => {
    if (!context.onSelect || disabled || typeof index !== "string") return;
    context.onSelect(index);
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;
