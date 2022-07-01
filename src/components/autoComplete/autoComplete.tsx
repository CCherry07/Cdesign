import { ChangeEvent, SetStateAction, useState } from 'react'
import Input,{ InputProps } from '../input/input'
import Icon from '../icon/icon'

export type DataSourceItemType<T = {}> = T & DataSourceItemObject
export interface DataSourceItemObject {
  value: string;
  text: string;
}
export type filterOptionType = (inputValue: string,options: DataSourceItemType[])=>(DataSourceItemType[] | Promise<DataSourceItemType[]>)
export interface AutoCompleteProps extends Omit<InputProps , "onSelect"> {
  dataSource?:DataSourceItemType[],  
  filterOption?:filterOptionType
  onSelect?:(options:DataSourceItemType)=>void
  renderOption?:(options:DataSourceItemType)=>React.ReactNode
}

export const AutoComplete:React.FC<AutoCompleteProps> = (props)=>{
  const { filterOption , renderOption , onSelect ,value , dataSource = [], ...restprops  } = props
  const [inputValue,setInputValue] = useState(value)
  const [options , setOptions] = useState<DataSourceItemType[]>([])
  const [loading , setloading] = useState(false)
  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value.trim()
    setInputValue(value)
    if (value) {
      setloading(true)
      const filterOptions = filterOption?.(value,dataSource)||[]
      if (filterOptions instanceof Promise) {
        filterOptions.then((result: SetStateAction<DataSourceItemObject[]>)=>{
          setloading(false)
          setOptions(result)
        }).catch(error=>{
          throw error
        })
      }else{
        setOptions(filterOptions)
      }
    }else{
      setOptions([])
    }
  }

  const renderChild = (option:DataSourceItemType) =>{
    return renderOption ? renderOption(option) : option.text
  }

  const handleSelect = (option:DataSourceItemType) =>{
    setInputValue(option.value)
    setOptions([])
    if (!onSelect)return
    onSelect(option)
  }
  const generateDrodown = () =>{
    return (
      <ul>
        {options.map((item , idx)=>{
          return (<li key={item.value} onClick={()=>handleSelect(item)}> { renderChild(item) } </li>)
        })}
      </ul>
    )
  }
  return (
    <div className='viking-auto-complete'>
      <Input 
      value={inputValue}
      onChange={handleChange} 
      { ...restprops }/>

      { loading && <Icon icon={"spinner"} spin></Icon> }
      { options && generateDrodown() }
    </div>
  )
}


export default AutoComplete
