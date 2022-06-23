import { render , userEvent , screen, RenderResult} from '../../utils/test.utils'
import { it , expect  } from 'vitest';
import Menu , { MenuProps } from './menu';
import React from 'react';

const testProps:MenuProps = {
  defaultIndext:0,
  onSelect:(index)=>{
    return index
  },
  className:"test"
}
const modeProps:MenuProps = {
  defaultIndext:0,
  mode:"vertical"
}

const TestMenu:React.FC<MenuProps> = (props)=>{
  return <Menu {...props}>
    <Menu.item index={0}>cherry</Menu.item>
    <Menu.item index={1} disabled>KD</Menu.item>
    <Menu.item index={2}>SIS</Menu.item>
  </Menu>;
}
let wrapper:RenderResult,menuItem:HTMLElement,activeItem:HTMLElement,disabledItem:HTMLElement
describe("test Menu",async()=>{
  beforeEach(()=>{
    wrapper = render(<TestMenu {...testProps}></TestMenu>)
    menuItem = wrapper.getByTestId("test-menu")
    activeItem = wrapper.getByText("cherry")
    disabledItem = wrapper.getByText("KD")
  })
  
  it("test The Default Menu",async()=>{
      expect(menuItem).toBeInTheDocument()
      expect(menuItem.tagName).toEqual('UL')
      expect(menuItem).toHaveClass('viking-menu')
      expect(activeItem).toHaveClass('menu-item is-active')
      expect(disabledItem).toHaveClass("menu-item is-disabled")
      expect(menuItem.getElementsByTagName("li").length).toBe(3)
      userEvent.click(menuItem)
      expect(await screen.findByText("KD"))
  })
  // it("testing different item is different behaviors",async()=>{
   
  // })
  // it("test different mode style layouts",async()=>{
   
  // })
})



