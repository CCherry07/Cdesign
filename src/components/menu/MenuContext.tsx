import { createContext } from 'react';
import { MenuMode, onSelect } from './menu';

export interface MenuContext {
  index:string
  defaultOpenSubMenus?:string[]
  mode?:MenuMode
  onSelect?: onSelect
}
export const MenuContext = createContext<MenuContext>({ index: "0" });
