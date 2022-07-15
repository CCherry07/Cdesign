import classNames from "classnames";
import { FontAwesomeIcon , FontAwesomeIconProps } from "@fortawesome/react-fontawesome"

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps  {
    theme?:ThemeProps
}

const Icon:React.FC<IconProps> = (props)=>{
  const { className , theme ,...resetProps} = props
  const classes = classNames("cd-icon",className , {
    [`icon-${theme}`]:theme
  })
  return (
    <FontAwesomeIcon className={classes} {...resetProps}></FontAwesomeIcon>
  )
}

export default Icon
