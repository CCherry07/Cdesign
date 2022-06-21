import CButton ,{ ButtonType , ButtonSize }from './components/button';
function App() {
  return (
    <div className="App" style={{ display:'flex',justifyContent:"space-around",width:"35rem" }}>
      <CButton 
        btnType={ ButtonType.Link }
        size={ButtonSize.Large} 
        href='http://baidu.com'>
        hello 
      </CButton>
      <CButton 
        btnType={ ButtonType.Default } 
        size={ButtonSize.Large}> 
        思思 
      </CButton>
      <CButton 
        btnType={ ButtonType.Danger } 
        size={ButtonSize.Small}> 
        KD 
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
