import React, {useRef} from 'react'
import axios from 'axios'
import Button from '../button/button'


export interface UploadProps{
  action:string
  onProgress?:(percentage:number,file:File)=>void
  onSuccess?:(data:any,file:File)=>void
  onError?:(err:any,file:File)=>void
  beforeUpload?:(file:File)=>boolean | Promise<File>
  onChange?:(file:File)=>void
}

export const Upload:React.FC<UploadProps>=(props)=>{
  const { action ,beforeUpload, onChange ,  onError, onProgress, onSuccess }=props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleClick = ()=>{
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handlefileInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const files = e.target.files
    if (!files) return
    uploadFiles(files)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  const uploadFiles = (files:FileList)=>{
    let arrayFile = Array.from(files) 
    arrayFile.forEach(file=>{
      if (!beforeUpload) {
        uploadRequest(file)
      }else{
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile=>{
            uploadRequest(processedFile)
          })
        }else if (result !== false) {
          uploadRequest(file)
        }
      }
    })
  }

  const uploadRequest=(file:File)=>{
    const formDate = new FormData()
    formDate.append(file.name , file)
    axios.post(action,formDate,{
      headers:{ 
        "content-type":"multipart/form-data"
      },
      onUploadProgress:(e)=>{
        let percentage = Math.round(e.loaded * 100)/e.total || 0
        if (percentage) {
          if (onProgress) {
            onProgress(percentage,file)
          }
        }
      }
    }).then(res=>{
        onSuccess?.(res.data,file)
        onChange?.(file)
    }).catch(err=>{
        onError?.(err,file)
        onChange?.(file)
    })
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
        onChange={handlefileInputChange}
        ref={fileInputRef}
      />
    </div>
  )
}


export default Upload
