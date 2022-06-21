import classNames from "classnames";

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default="default",
  Danger="danger",
  Link = "link"
}

export interface BaseButtonProps {
  /** 设置尺寸 */
  size?: ButtonSize;
  /** 设置类型 */
  btnType?: ButtonType;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  className?: string;
  href?: string;
  children?: React.ReactNode;
}

const Button = (props:BaseButtonProps)=>{
  const { btnType,
          size,
          disabled,
          loading,
          href,
          children,
          className } = props
  const classes = classNames('btn',className,{
    [`btn-${btnType}`]:btnType,
    [`btn-${size}`]:size,
    'disabled':((btnType === ButtonType.Link) && disabled),
    'loading':loading
  })

  if(btnType === ButtonType.Link && href){
    return <a className={classes} href={href}>{children}</a>
  }else{
    return <button className={classes} disabled={disabled}> { children } </button>
  }
}

Button.defaultProps = {
  disabled:false,
  btnType:ButtonType.Default
}

export default Button
