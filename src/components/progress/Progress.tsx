import React from "react"
import  { ThemeProps } from '../icon/icon'
export interface ProgressProps {
  percent:number
  strokeHight?:number
  showText?:boolean
  styles?:React.CSSProperties
  theme?:ThemeProps
}

export const Progress:React.FC<ProgressProps> = (props)=> {
  const {percent , showText , strokeHight ,styles ,theme} = props
  return (
    <div className="cd-progress-bar" style={styles}>
      <div 
        className="cd-progress-bar-outer"
        style={{height:`${strokeHight}px`}}
      >
        <div className={`cd-progress-bar-inner color-${theme}`} style={{width:`${percent}%`}}>
          { showText && <span className="inner-text">{ `${percent}%` }</span> }
        </div>
      </div>
    </div>
  )
}
Progress.defaultProps = {
  strokeHight:15,
  showText:true,
  theme:"primary"
}

export default Progress
