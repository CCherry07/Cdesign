import { Upload, UploadFile } from './components/upload/Upload';
import "./app.scss"
import { useUnMount } from './hooks/dom/useUnMount';
import { useState } from 'react';
import { useMount } from './hooks/dom/useMount';


const Component = ()=>{
  useUnMount(()=>{
    console.log("组件卸载了");
  })
  useMount(()=>{
    console.log("组件安装了");
  })
  return (<div>
    123
  </div>)
}
function App() {
  const [show , setShow] = useState(true)

  return (
    <div className="App">
     {show ?<Component></Component>:null}
      <button onClick={()=>setShow(!show)}> asd </button>
    </div>
  );
}
export default App;
