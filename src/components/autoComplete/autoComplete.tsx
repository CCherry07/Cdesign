import {useState , useEffect,useRef } from 'react'
import type { ChangeEvent , SetStateAction } from 'react'
import classNames from 'classnames';
import Input,{ InputProps } from '../input/input'
import Icon from '../icon'
import { useClickTargetOutsite, useDebounce } from '../../hooks';
import { isVoid } from '../../utils';

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
  const { filterOption , renderOption , onSelect,
          className , style  ,value ,  dataSource = [],
          ...restprops } = props

  const [inputValue,setInputValue] = useState(value as string)
  const [options , setOptions] = useState<DataSourceItemType[]>([])
  const [loading , setloading] = useState(false)
  const [activeIndex , setActiveIndex] = useState(-1)
  const componentRef = useRef<HTMLDivElement>(null)
  const retrySearch = useRef(false)

  const debounceValue = useDebounce(inputValue)
  useClickTargetOutsite(componentRef,()=>{
    setOptions([])
  })
  
  const classes = classNames('viking-auto-complete',className)

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

  const hoverEvents ={
    onMouseEnter:()=>setActiveIndex(-1),
    onMouseLeave:()=>setActiveIndex(0)
  }

  const generateDrodown = () =>{
    return (
      <ul className='viking-suggestion-list'>
        { loading && (<div className='suggestions-loading-icon'>
            <Icon icon={"spinner"} spin/>
        </div>) }
        {options.map((item , idx)=>{
          const suggestionItemClass = classNames("suggestion-item",{
            "item-highlighted":idx === activeIndex
          })
          return (<li key={item.value} {...hoverEvents} className={suggestionItemClass} onClick={()=>handleSelect(item)}> { renderChild(item) } </li>)
        })}
      </ul>
    )
  }
  return (
    <div className={classes} ref={componentRef} style={style}>
        <Input 
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restprops} />
        { options && generateDrodown() }
    </div>
  )
}

export default AutoComplete
