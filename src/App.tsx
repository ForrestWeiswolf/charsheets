import React, { useState } from 'react';
import './App.css';
import ModifiableField from './ModifiableField';

function App() {
  const [fields, setFields] = useState({} as Record<string, string>)

  return (
    <div className="App">
      <ModifiableField value='?' formula='????' name='foo' setFormula={() => {}} />
    </div>
  );
}

export default App;
