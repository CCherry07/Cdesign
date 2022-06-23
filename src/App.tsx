import React, { useState } from 'react';
import Switch from './components/switch';

function App() {
  const [state, setState] = useState(false);
  return (
    <div
      className="App"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        background: 'linear-gradient(to right, #f6d365 0%, #fda085 100%)',
      }}
    >
      <p onClick={() => setState(!state)}>{state ? '对' : '错'}</p>
      <Switch checked={state} />
    </div>
  );
}
export default App;
