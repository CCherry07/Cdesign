import React, { useState } from 'react'

const Component = (props:{slot:React.ReactNode,setCount:React.Dispatch<React.SetStateAction<number>>})=>{
  const {slot,setCount} = props
  return <div>
  <button onClick={()=>setCount((count)=>++count)}>add</button>
    {slot}
  </div>
}
const SlotComponent = (props:{count:number})=>{
  const {count} = props
  return (<div>{count}</div>)
}
function App() {
  const [count , setCount] = useState(0)

  return (
    <div className="App">
      <Component setCount={setCount} slot={SlotComponent({count})}></Component>
    </div>
  );
}
export default App;
