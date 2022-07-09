import { Upload } from './components/upload/Upload';
import "./app.scss"
function App() {
 const  handleProgress=(o,file)=>{
  console.log(o);
  }
  return (
    <div className="App">
      <Upload action='https://jsonplaceholder.typicode.com/posts' onProgress={handleProgress}></Upload>
    </div>
  );
}
export default App;
