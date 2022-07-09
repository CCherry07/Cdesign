import { Upload, UploadFile } from './components/upload/Upload';
import "./app.scss"
function App() {
 const  handleProgress=(o:number,file:File)=>{
  console.log(o);
  }
  const defalutFileList:UploadFile[] = [
    {uid:"1",size:432,name:"file1",status:"error",percent:50},
    {uid:"2",size:432,name:"file2",status:"success",percent:50},
    {uid:"3",size:432,name:"file3",status:"uploading",percent:50}
  ]
  return (
    <div className="App">
      <Upload action='https://jsonplaceholder.typicode.com/posts' defaultFileList={defalutFileList} onProgress={handleProgress}></Upload>
    </div>
  );
}
export default App;
