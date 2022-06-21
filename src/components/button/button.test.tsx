import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Button from './button';

describe("button",async()=>{
  it("should render correctly",async()=>{
   const {getByText} = render(<Button>123</Button>);
    expect(getByText('123')).toBeTruthy();
  })
})
