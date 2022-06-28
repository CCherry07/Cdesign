import { ChangeEvent, useState } from 'react'
import Input,{ InputProps } from '../input/input'

export interface DataSourceItemObject {
  value: string;
  text: string;
}
export interface AutoCompleteProps extends Omit<InputProps , "onSelect"> {
  dataSource?:DataSourceItemObject[],
  filterOption?:(inputValue: string,options: DataSourceItemObject[])=>DataSourceItemObject[]
  onSelect?:(options:DataSourceItemObject)=>void
}

export const AutoComplete:React.FC<AutoCompleteProps> = (props)=>{
  const { filterOption , onSelect ,value , dataSource, ...restprops  } = props
  const [inputValue,setInputValue] = useState(value)
  const [options , setOptions] = useState(props.dataSource||[])
  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value.trim()
    setInputValue(value)
    if (value) {
      const filterOptions = filterOption?.(value,options)||[]
      console.log(filterOptions);
      setOptions(filterOptions)
    }else{
      setOptions(dataSource||[])
    }
  }
  return (
    <div className='viking-auto-complete'>
      <Input 
      value={inputValue}
      onChange={handleChange} 
      { ...restprops }/>
    </div>
  )
}


export default AutoComplete
