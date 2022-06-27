import React, { FC, useState } from 'react';

export type SwitchSize = 'lg' | 'sm';

export interface SwitchProps {
  defaultChecked?: boolean,
  labelName?: string,
  onChange?: (value: boolean) => any,
  size?: SwitchSize
}

export const Switch: FC<SwitchProps> = ({ defaultChecked, labelName, onChange, size }) => {
  const [state, setState] = useState(defaultChecked);
  const className = size == "sm" ? "switch" : "switch switch-sm";
  return (
    <div className={className} onClick={() => {
      setState(!state);
      onChange!(state as boolean);
    }} >
      <label htmlFor={labelName}></label>
      <input type="checkbox" name={labelName} onChange={() => { }} checked={state} />
      <span className="slider" />
    </div>
  );
};

Switch.defaultProps = {
  defaultChecked: true,
  onChange: () => { },
  size: "lg"
};

export default Switch;
