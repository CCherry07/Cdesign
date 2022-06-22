import { render , userEvent , screen} from '../../utils/test.utils'
import { it , expect  } from 'vitest';
import Button, { ButtonProps } from './button';

const defaultProps = {
  onClick:()=>{ document.querySelector("button")!.textContent = "KD" }
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}
const testLinkProps: ButtonProps = {
  btnType: 'link',
  href:"www.baidu.com",
  size: 'lg',
}

const disabledProps: ButtonProps = {
  disabled: true,
}
describe("test button",async()=>{
  it("test The Default Button",async()=>{
    const wrapper =  render(<Button {...disabledProps}>
      cherry
    </Button>)
    const element = wrapper.getByText('cherry') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeTruthy()
    userEvent.click(element)
  })
  it("test different props rendering different button",async()=>{
    const wrapper =  render(<Button {...testProps}{...defaultProps}>cherry</Button>)
    const element = wrapper.getByText('cherry') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-primary')
    expect(element.disabled).toBeFalsy()
    userEvent.click(screen.getByRole('button'))
    expect(await screen.findByText("KD"))
  })
  it("test btn type is link and button that exists in href prop",async()=>{
    const wrapper =  render(<Button {...testLinkProps}>baidu.com</Button>)
    const element = wrapper.getByText('cherry') as HTMLLinkElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link btn-lg')
    expect(element.disabled).toBeFalsy()
    userEvent.click(element)
    expect(element).toHaveAttribute("href","www.baidu.com")
  })
})
