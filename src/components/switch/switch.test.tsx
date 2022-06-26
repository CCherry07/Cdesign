import { it, expect } from 'vitest';
import React from 'react';
import { render, userEvent } from '../../utils/test.utils';
import Switch, { SwitchProps } from './switch';

const testProps: SwitchProps = {
    defaultChecked: true,
    labelName: "Test"
};

// describe('test switch', async () => {
//     it('test The Default Button', async () => {
//         const wrapper = render(<Switch {...testProps}></Switch>);
//         const element = wrapper.getByLabelText(testProps.labelName as string) as HTMLElement;
//         expect(element).toBeInTheDocument();
//         userEvent.click(element);
//     });
// });
