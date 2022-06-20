
import CButton ,{  ButtonType , ButtonSize }from './c_button';

function App() {
  return (
    <div className="App">
      <CButton 
        btnType={ ButtonType.Link }
        size={ButtonSize.Large} 
        href='http://baidu.com'>
        hello 
      </CButton>
      <CButton 
        btnType={ ButtonType.Default } 
        size={ButtonSize.Small}
        disabled={true}> 
        撒大大 
      </CButton>
      <CButton 
        btnType={ ButtonType.Primary } 
        size={ButtonSize.Large}> 
        cherry 
      </CButton>
    </div>
  )

}

export default App
