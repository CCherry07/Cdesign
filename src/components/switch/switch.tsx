import { FC } from "react";
import classNames from "classnames";
import { useState } from "react";
import { useEffect } from "react";

export type SwitchSize = 'lg' | 'sm'

interface SwitchProps {
    className?: string
    size?: SwitchSize
    checked?: boolean
}

export const Switch: FC<SwitchProps> = (props) => {
    const { className, size, checked } = props
    const [state, setState] = useState(checked)
    useEffect(() => setState(checked), [checked])
    return (
        <label className="switch">
            <input type="checkbox" checked={state} />
            <span className="slider"></span>
        </label>
    )
}

export default Switch;