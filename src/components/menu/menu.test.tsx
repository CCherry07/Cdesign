import { render , userEvent , screen, RenderResult, fireEvent ,cleanup, act} from '../../utils/test.utils'
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
      <Menu.Item >cherry</Menu.Item>
      <Menu.Item disabled>KD</Menu.Item>
      <Menu.SubMenu title="dep">
          <Menu.Item >dep1</Menu.Item>
          <Menu.Item >dep2</Menu.Item>
          <Menu.Item >dep2</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item >SIS</Menu.Item>
  </Menu>;
}

const createCssfile = ()=>{
  const cssString = `
    .cd-submenu {
      display:none;
    }
    .cd-submenu.menu-opened{
      display:block;
    }
  ` 
  const style = document.createElement("style")
  style.innerHTML = cssString
  return style
}
let wrapper:RenderResult,menuItem:HTMLElement,activeItem:HTMLElement,disabledItem:HTMLElement
describe("test Menu",async()=>{
  beforeEach(()=>{
    wrapper = render(<TestMenu {...testProps}></TestMenu>)
    wrapper.container.appendChild(createCssfile())
    menuItem = wrapper.getByTestId("test-menu")
    activeItem = wrapper.getByText("cherry")
    disabledItem = wrapper.getByText("KD")
  })

  it("test The Default Menu",async()=>{
      expect(menuItem).toBeInTheDocument()
      expect(menuItem.tagName).toEqual('UL')
      expect(menuItem).toHaveClass('cd-menu')
      expect(activeItem).toHaveClass('menu-item is-active')
      expect(disabledItem).toHaveClass("menu-item is-disabled")
      expect(menuItem.querySelectorAll(":scope > li").length).toBe(4)
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
  it("test submenu.s.display",async()=>{
    expect(wrapper.queryByText("dep1")).not.toBeVisible()
    const subMenuEl = wrapper.getByText("dep")
    fireEvent.mouseEnter(subMenuEl)
    expect(await screen.findByText("dep1"))
    fireEvent.click(wrapper.getByText("dep1"))
    expect(testProps.onSelect).toHaveBeenCalledWith("2-0")
    fireEvent.mouseLeave(subMenuEl)
    expect(wrapper.queryByText("dep1")).not.toBeVisible()
  })
})


