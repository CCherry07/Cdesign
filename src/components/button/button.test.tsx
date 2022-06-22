import { render } from '../../utils/test.utils'
import { it , expect } from 'vitest';
import Button from './button';

describe("test button",async()=>{
  it("test The Default Button",async()=>{
    const { getByText } =  render(<Button>cherry</Button>)
    const el = getByText("cherry")
    expect(el).toBeInTheDocument()
    expect(el.tagName).equals("BUTTON")
    expect(el).toHaveClass("btn btn-default")
  })
  it("test different props rendering different button",async()=>{
    
  })
  it("test btn type is link and button that exists in href prop",async()=>{
    
  })
})
