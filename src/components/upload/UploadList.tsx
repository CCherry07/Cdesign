import Icon from '../icon'
import Progress from '../progress'
import type { UploadFile } from './Upload'

export interface UploadListProps {
  fileList:UploadFile[]
  onRemove:(file:UploadFile)=>void
}

export const UploadList:React.FC<UploadListProps> = (props)=>{
  const { fileList , onRemove } = props
  return (
    <ul className='cd-upload-list' >
      { (fileList||[]).map(item=>{
        return (
          <li className='cd-upload-list-item' key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon={"file-alt"} theme="secondary"/>
              { item.name }
              <span className='file-status'>
                {item.status === "uploading" && <Icon icon="spinner" spin theme='primary'/>}
                {item.status === "success" && <Icon icon="check-circle" theme='success'/>}
                {item.status === "error" && <Icon icon="times-circle" theme='danger'/>}
              </span>
              <span className='file-actions'>
                <Icon icon={"times"} onClick={()=>onRemove(item)}/>
              </span>
              { item.status === "uploading" && <Progress percent={item.percent || 0}/> }
            </span>
          </li>
        )
      }) }
    </ul>
  )
}
export default UploadList
