import classNames from 'classnames';
import {  useState , DragEvent } from 'react';


interface DraggerProps{
  onFiles:(files:FileList)=>void
  children?:React.ReactNode
}

export const Dragger:React.FC<DraggerProps> = (props)=>{
  const { onFiles , children } = props
  const [ dragOver , setDragOver ] = useState(false)

  const classes = classNames("cd-uploader-dragger",{
          "is-dragover":dragOver
    }) 
  
  const handleDrag = (e:DragEvent<HTMLElement>,over:boolean)=>{
    e.preventDefault()
    setDragOver(over)
  }

  const handleDrop = (e:DragEvent<HTMLElement>)=>{
    e.preventDefault()
    setDragOver(false)
    onFiles(e.dataTransfer.files)
  }

  return (
    <div className={classes}
      onDragOver={e=>handleDrag(e,true)}
      onDragLeave={e=>handleDrag(e,false)}
      onDrop={handleDrop}
    >
      { children }
    </div>
  )

}

export default Dragger
