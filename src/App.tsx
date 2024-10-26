import React, { useState } from 'react';
import './App.css';
import ModifiableField from './ModifiableField';

function App() {
  const [fields, setFields] = useState({
    name: ''
  } as Record<string, string>)

  return (
    <div className="App">
      <ModifiableField value={fields.name} formula={fields.name} name='Name' setFormula={(f) => {
        setFields({...fields, name: f})
      }} />
    </div>
  );
}

export default App;
