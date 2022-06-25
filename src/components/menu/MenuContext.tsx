import { createContext } from 'react';
import { MenuMode, onSelect } from './menu';

export interface MenuContext {
  index:number
  mode?:MenuMode
  onSelect?: onSelect
}
export const MenuContext = createContext<MenuContext>({ index: 0 });
