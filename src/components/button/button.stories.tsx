import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import Button  from './button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const BaseButton: ComponentStory<typeof Button> = (args) => <Button {...args}>Default</Button>;

BaseButton.args = {
  onClick:(e)=>{
    action("clicked")(e)
    alert("click event was triggered ( ≧Д≦)!!!")
  }
};

const ButtonWithBtnType:ComponentStory<typeof Button> = ()=>(
  <div style={{ width:"400px" , display:"flex" , justifyContent:"space-between"}}>
    <Button btnType={"default"}>default</Button>
    <Button btnType={"primary"}>primary</Button>
    <Button btnType={"danger"}>danger</Button>
    <Button btnType={"link"} href={window.location.href}>link</Button>
  </div>
)

export const DifferentTypes = ButtonWithBtnType
