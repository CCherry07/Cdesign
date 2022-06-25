import { render , userEvent , screen, RenderResult, fireEvent ,cleanup} from '../../utils/test.utils'

import { it , expect, vi} from 'vitest';
import Menu , { MenuProps } from './menu';
import React from 'react';

const testProps:MenuProps = {
  defaultIndext:"0",
  onSelect:(index)=>{
    return index
  },
  className:"test"
}

const modeProps:MenuProps = {
  defaultIndext:"0",
  mode:"vertical",
}

const TestMenu:React.FC<MenuProps> = (props)=>{
  return <Menu {...props} data-testid="test-menu">
    <Menu.Item>cherry</Menu.Item>
    <Menu.Item disabled>KD</Menu.Item>
    <Menu.Item>SIS</Menu.Item>
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
  it("testing different item is different behaviors",async()=>{
    const thirdItem = wrapper.getByText("SIS")
    fireEvent.click(thirdItem)
    vi.spyOn(testProps,"onSelect")
    // expect(vi.spyOn(testProps,"onSelect")).toHaveBeenCalledWith(2)
    expect(thirdItem).toHaveClass("is-active")
    expect(activeItem).not.toHaveClass("is-active")
    fireEvent.click(disabledItem)
    expect(disabledItem).not.toHaveClass("is-active")
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it("test different mode style layouts",async()=>{
    cleanup()
    const modeWrapper = render(<TestMenu {...modeProps}></TestMenu>)
    const modeMenu = modeWrapper.getByTestId("test-menu")
    expect(modeMenu.tagName).toEqual('UL')
    expect(modeMenu).toHaveClass("menu-vertical")
  })
})



