import Icon from '../icon'
import type { UploadFile } from './Upload'

export interface UploadListProps {
  fileList:UploadFile[]
  onRemove?:(file:UploadFile)=>void
}

export const UploadList:React.FC<UploadListProps> = (props)=>{
  const { fileList , onRemove } = props
  return (
    <ul className='viking-upload-list' >
      { (fileList||[]).map(item=>{
        return (
          <li className='viking-upload-list-item' key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon={"file-alt"} theme="secondary"/>
              { item.name }
            </span>
          </li>
        )
      }) }
    </ul>
  )
}
export default UploadList
