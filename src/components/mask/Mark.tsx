export interface MarkProps {
  target:string , 
  keyword?:string,
  color?:string
}

export const Mark:React.FC<MarkProps> = ({target,keyword,color})=>{
  if (!keyword) return <>{target}</>
  const stringSlices = target.split(keyword)
   return (<>
    { 
      stringSlices.map(
        (str,index)=>
        <span key={index}>
          {str}
          {
            index === stringSlices.length - 1 ? null:
             (<span style={{color: color}}>
              { keyword }
            </span>)
          }
        </span>
        )
      }
  </>)
}


Mark.defaultProps = {
  color:"#4382f7",
}

export default Mark
