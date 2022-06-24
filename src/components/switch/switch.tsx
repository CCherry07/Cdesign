import React, { FC, useState, useEffect } from 'react';

export type SwitchSize = 'lg' | 'sm';

interface SwitchProps {
  checked?: boolean
}

export const Switch: FC<SwitchProps> = ({ checked = false }) => {
  const [state, setState] = useState(checked);
  useEffect(() => setState(checked), [checked]);
  return (
    <label className="switch">
      <input type="checkbox" checked={state} defaultChecked />
      <span className="slider" />
    </label>
  );
};

Switch.defaultProps = {
  checked: true,
};

export default Switch;
