import React, {useRef , useState} from 'react'
import axios from 'axios'
import UploadList from './UploadList'
import Dragger from './Dragger'
export type UploadFileStatus = "ready" | "uploading"|"success"|"error"
export interface UploadFile{
  size:number
  name:string
  uid?:string
  status?:UploadFileStatus
  percent?:number
  raw?:File
  response?:any
  error?:any
}
export interface UploadProps{
  action:string
  defaultFileList:UploadFile[]
  drag?:boolean
  children?:React.ReactNode
  onProgress?:(percentage:number,file:UploadFile)=>void
  onSuccess?:(data:any,file:UploadFile)=>void
  onError?:(err:any,file:UploadFile)=>void
  beforeUpload?:(file:UploadFile)=>boolean | Promise<UploadFile>
  onChange?:(file:UploadFile)=>void
  onRemove?:(file:UploadFile)=>void
  name?:string
  headers?:Record<string,any>
  data?:Record<string , any>
  withCredentials?:boolean
  accept?:string
  multiple?:boolean
}


export const Upload:React.FC<UploadProps>=(props)=>{
  const { 
    action,name,
    defaultFileList,
    headers,data,
    withCredentials,
    accept,multiple,
    drag,children,
    beforeUpload, 
    onChange ,  onError, 
    onProgress, onSuccess,
    onRemove
  } = props
  const [fileList , setFileList ] = useState<UploadFile[]>(defaultFileList||[])
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

  const handleRemove = (file:UploadFile)=>{
    setFileList((fileList)=>{
      return fileList.filter(_file=>_file.uid !== file.uid)
    })
    onRemove?.(file)
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
          result.then(processedFile=>uploadRequest(processedFile as File))
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
      name:name || file.name,
      size:file.size,
      percent:0,
      raw:file
    }
    setFileList(fileList=>[_file,...fileList])
    const formDate = new FormData()
    formDate.append(name ||file.name , file)
    data && Object.keys(data).forEach(payloadKey=>{
      formDate.append(payloadKey,data[payloadKey])
    })
    axios.post(action,formDate,{
      headers:{ 
        "content-type":"multipart/form-data",
        ...headers
      },
      withCredentials,
      onUploadProgress:(e)=>{
        let percentage = Math.floor(Math.round(e.loaded * 100)/e.total || 0)
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
    <div className='cd-upload-component'>
     <div className='cd-upload-input' 
        style={{ display:"inline-block" }}
        onClick={handleClick}>
          { drag ? <Dragger onFiles={(files)=>{uploadFiles(files)}}> { children } </Dragger> :children }
     </div>
      <input 
        type="file" 
        className='cd-file-input'  
        style={{ display:"none" }}
        onChange={handlefileInputChange}
        ref={fileInputRef}
        accept={accept}
        multiple={multiple}
      />
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  )
}


export default Upload
