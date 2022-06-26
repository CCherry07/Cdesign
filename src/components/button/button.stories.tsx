import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button  from './button';
export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const BaseButton: ComponentStory<typeof Button> = (args) => <Button {...args}>Default</Button>;


BaseButton.args = {
  btnType:"default"
};


const ButtonWithBtnType:ComponentStory<typeof Button> = ()=>(
  <div style={ { width:"400px" , display:"flex" , justifyContent:"space-between"} }>
    <Button btnType={"default"}>default</Button>
    <Button btnType={"primary"}>primary</Button>
    <Button btnType={"danger"}>danger</Button>
    <Button btnType={"link"} href={window.location.href}>link</Button>
  </div>
)

export const DifferentTypes = ButtonWithBtnType
