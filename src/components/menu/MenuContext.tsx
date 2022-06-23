import { createContext } from 'react';

type onSelect = (selectIndex:number)=>void;
export interface MenuContext {
  index:number
  onSelect?: onSelect
}
export const MenuContext = createContext<MenuContext>({ index: 0 });
