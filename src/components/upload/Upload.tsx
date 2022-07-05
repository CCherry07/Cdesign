import {useRef} from 'react'
import axios from 'axios'
import Button from '../button/button'

export interface UploadProps{
  action:string
  onProgress?:(percentage:number,file:File)=>void
  onSuccess?:(data:any,file:File)=>void
  onError?:(err:any,file:File)=>void 
}

export const Upload:React.FC<UploadProps>=(props)=>{
  const { action , onError, onProgress, onSuccess }=props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleClick = ()=>{
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  return (
    <div className='viking-upload-component'>
      <Button 
        btnType={"primary"}
        onClick={ handleClick }
      >upload</Button>
      <input 
        type="file" 
        className='viking-file-input'  
        style={{ display:"none" }}
        ref={fileInputRef}
      />
    </div>
  )
}


export default Upload
