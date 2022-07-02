import { ChangeEvent, SetStateAction, useState , useEffect } from 'react'
import Input,{ InputProps } from '../input/input'
import Icon from '../icon'
import { isVoid } from '../../utils';
import { useDebounce } from '../../chooks';
import classNames from 'classnames';
import { useRef } from 'react';
export type DataSourceItemType<T = {}> = T & DataSourceItemObject
export interface DataSourceItemObject {
  value: string;
  text: string;
}
export type filterOptionType = <T extends DataSourceItemType>(inputValue: string,options: T[])=>(T[] | Promise<T[]>)
export interface AutoCompleteProps extends Omit<InputProps , "onSelect"> {
  dataSource?:DataSourceItemType[],  
  filterOption?:filterOptionType
  onSelect?:(options:DataSourceItemType)=>void
  renderOption?:(options:DataSourceItemType)=>React.ReactNode
}

export const AutoComplete:React.FC<AutoCompleteProps> = (props)=>{
  const { filterOption , renderOption , onSelect ,value , dataSource = [], ...restprops  } = props
  const [inputValue,setInputValue] = useState(value as string)
  const [options , setOptions] = useState<DataSourceItemType[]>([])
  const [loading , setloading] = useState(false)
  const [activeIndex , setActiveIndex] = useState(-1)
  const retrySearch = useRef(false)
  const debounceValue = useDebounce(inputValue)

  useEffect(()=>{
    if (isVoid(debounceValue) || !retrySearch.current) return setOptions([])
      setloading(true)
      const filterOptions = filterOption?.(debounceValue,dataSource)||[]
      if (filterOptions instanceof Promise) {
        filterOptions.then((result: SetStateAction<DataSourceItemObject[]>)=>{
          setActiveIndex(0)
          setloading(false)
          setOptions(result)
        }).catch(error=>{
          setloading(false)
          throw error
        })
      }else{
        setOptions(filterOptions)
      }
  },[debounceValue])

  const handleKeyAction = (activeIdx:number) =>{
    if (activeIdx < 0) activeIdx = options.length -1 
    if (activeIdx >= options.length) activeIdx = 0
    setActiveIndex(activeIdx) 
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    switch (e.key) {      
      case "Escape":
        setOptions([])
        break
      case "ArrowUp":
        handleKeyAction(activeIndex-1)
        break;
      case "ArrowDown":
        handleKeyAction(activeIndex+1)
        break
      case "Enter":
        options?.[activeIndex]&&handleSelect(options[activeIndex])
        break
      default:
        break;
    }
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value.trim()
    setInputValue(value)
    retrySearch.current = true
  }

  const renderChild = (option:DataSourceItemType) =>{
    return renderOption ? renderOption(option) : option.text
  }

  const handleSelect = (option:DataSourceItemType) =>{
    setInputValue(option.value)
    setOptions([])
    if (!onSelect)return
    onSelect(option)
    retrySearch.current = false
  }

  const generateDrodown = () =>{
    return (
      <ul>
        {options.map((item , idx)=>{
          const activeClass = classNames("suggestion-item",{
            "item-highlighted":idx === activeIndex
          })
          return (<li key={item.value} className={activeClass} onClick={()=>handleSelect(item)}> { renderChild(item) } </li>)
        })}
      </ul>
    )
  }
  return (
    <div className='viking-auto-complete'>
      <Input 
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown} 
      { ...restprops }/>
      { loading && <Icon icon={"spinner"} spin></Icon> }
      { options && generateDrodown() }
    </div>
  )
}

export default AutoComplete
