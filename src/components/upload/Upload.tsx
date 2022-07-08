import React, {useRef , useState} from 'react'
import axios from 'axios'
import Button from '../button/button'

export type UploadFileStatus = "ready" | "uploading"|"success"|"error"
export interface UploadFile{
  uid:string
  size:number
  name:string
  status?:UploadFileStatus
  percent?:number
  raw?:File
  response?:any
  error?:any
}
export interface UploadProps{
  action:string
  defaultFileList:UploadFile[]
  onProgress?:(percentage:number,file:File)=>void
  onSuccess?:(data:any,file:File)=>void
  onError?:(err:any,file:File)=>void
  beforeUpload?:(file:File)=>boolean | Promise<File>
  onChange?:(file:File)=>void
  onRemove?:(file:UploadFile)=>void
}


export const Upload:React.FC<UploadProps>=(props)=>{
  const { 
    action ,
    defaultFileList,
    beforeUpload, 
    onChange ,  onError, 
    onProgress, onSuccess,
    onRemove
  } = props
  const [fileList , setFileList ] = useState<UploadFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const uploadFileList = (uploadFile:UploadFile , uploadObj:Partial<UploadFile>)=>{
    setFileList((prevlist:UploadFile[])=>{
      return prevlist.map(file=>{
        if (file.uid !== uploadFile.uid) return file
          return {...file , ...uploadObj}
      })
    })
  }
  
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
    let _file:UploadFile = {
      uid:Date.now()+'upload-file',
      status:"ready",
      name:file.name,
      size:file.size,
      percent:0,
      raw:file
    }
    setFileList([_file,...fileList])
    const formDate = new FormData()
    formDate.append(file.name , file)
    axios.post(action,formDate,{
      headers:{ 
        "content-type":"multipart/form-data"
      },
      onUploadProgress:(e)=>{
        let percentage = Math.round(e.loaded * 100)/e.total || 0
        if (percentage<100) {
          uploadFileList(_file,{percent:percentage , status:"uploading"})
          if (onProgress) {
            onProgress(percentage,file)
          }
        }
      }
    }).then(res=>{
      uploadFileList(_file , { status:"success" , response:res.data })
        onSuccess?.(res.data,file)
        onChange?.(file)
    }).catch(err=>{
      uploadFileList(_file , { status:"error" , error:err })
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
