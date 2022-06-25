import React, { FC, useState, cloneElement } from 'react';

export type SwitchSize = 'lg' | 'sm';

export interface SwitchProps {
  defaultChecked?: boolean,
  labelName?: string,
  onChange?: () => any
}

export const Switch: FC<SwitchProps> = ({ defaultChecked = false, labelName, onChange }) => {
  const [state, setState] = useState(defaultChecked);
  return (
    <div className='switch' onClick={() => setState(!state)} >
      <label htmlFor={labelName}></label>
      <input type="checkbox" name={labelName} checked={state} onChange={onChange} />
      <span className="slider" />
    </div>
  );
};

Switch.defaultProps = {
  defaultChecked: true,
  onChange: () => { }
};

export default Switch;
