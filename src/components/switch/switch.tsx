import React, { FC, useState } from 'react';

export type SwitchSize = 'lg' | 'sm';

export interface SwitchProps {
  defaultChecked?: boolean,
  labelName?: string,
  onChange?: (value: boolean) => any
}

export const Switch: FC<SwitchProps> = ({ defaultChecked, labelName, onChange }) => {
  const [state, setState] = useState(defaultChecked);
  return (
    <div className='switch' onClick={() => {
      setState(!state);
      onChange!(state as boolean);
    }} >
      <label htmlFor={labelName}></label>
      <input type="checkbox" name={labelName} checked={state} />
      <span className="slider" />
    </div>
  );
};

Switch.defaultProps = {
  defaultChecked: true,
  onChange: () => { }
};

export default Switch;
