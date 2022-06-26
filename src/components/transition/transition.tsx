import { CSSTransition  } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type QueueTransitionName = "zoom-in-top"|"zoom-in-left"|"zoom-in-bottom"|"zoom-in-right"

type TransitionProps = {
  queueAnim?:QueueTransitionName
  children?:React.ReactNode
  wrapper: boolean
} & CSSTransitionProps

const Transition:React.FC<TransitionProps> = (props)=>{
  const { children , classNames , wrapper , queueAnim , ...restProps} = props
  return (
    <CSSTransition 
      classNames={classNames || queueAnim}
      {...restProps}>
        { wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = { 
  unmountOnExit:true,
  appear:true
}

export default Transition
