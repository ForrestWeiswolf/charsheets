import React, { useState } from 'react';
import './App.css';
import ModifiableField from './ModifiableField';

function App() {
  const [fields, setFields] = useState({
    name: '',
    abilityScores: {
      Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,
    } as Record<string, number>,
  });

  return (
    <div className="App">
      <ModifiableField
        value={fields.name}
        formula={fields.name}
        name="Name"
        setFormula={(f) => {
          setFields({ ...fields, name: f });
        }}
      />

      <div>
        {
          // TODO: check if there's a good way to make sure the order is correct
          (Object.keys(fields.abilityScores)).map((score) => (
            <ModifiableField
              key={score}
              value={fields.abilityScores[score].toString()}
              formula={fields.abilityScores[score].toString()}
              name={score}
              setFormula={(f) => {
                setFields({
                  ...fields,
                  abilityScores: {
                    ...fields.abilityScores, [score]: parseInt(f, 10),
                  },
                });
              }}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
