import React, { useState } from 'react';
import './App.css';
import { formatModifier, modFromAbilityScore } from './utils';
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
          (Object.keys(fields.abilityScores)).map((scoreName) => (
            <div key={scoreName}>
              <ModifiableField
                numeric
                value={fields.abilityScores[scoreName].toString()}
                formula={fields.abilityScores[scoreName].toString()}
                name={scoreName}
                setFormula={(f) => {
                  setFields({
                    ...fields,
                    abilityScores: {
                      ...fields.abilityScores, [scoreName]: parseInt(f, 10),
                    },
                  });
                }}
              />
              <b>{formatModifier(modFromAbilityScore(fields.abilityScores[scoreName]))}</b>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
