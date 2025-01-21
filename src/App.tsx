import React, { useState } from 'react';
import './App.css';
import { formatModifier, modFromAbilityScore } from './utils';
import ModifiableField from './ModifiableField';
import Save from './Save';

const saves = [
  { name: 'Fort', abilityScore: 'Con' },
  { name: 'Ref', abilityScore: 'Dex' },
  { name: 'Will', abilityScore: 'Wis' },
];

const abilityScores = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'];

const defaultState = {
  // eslint-disable-next-line object-property-newline
  Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,
  // eslint-disable-next-line object-property-newline
  baseFort: 0, baseRef: 0, baseWill: 0, totalFort: 0, totalRef: 0, totalWill: 0,
} as Record<string, number>;

function App() {
  const [name, setName] = useState('');
  const [fields, setFields] = useState(defaultState);

  return (
    <div className="App">
      <ModifiableField
        value={name}
        formula={name}
        name="Name"
        setFormula={(f) => {
          setName(f);
        }}
      />

      <div id="ability-scores">
        {
          abilityScores.map((scoreName) => (
            <div key={scoreName}>
              <ModifiableField
                numeric
                value={fields[scoreName].toString()}
                formula={fields[scoreName].toString()}
                name={scoreName}
                setFormula={(f) => {
                  setFields({
                    ...fields, [scoreName]: parseInt(f, 10),
                  });
                }}
              />
              <b>{formatModifier(modFromAbilityScore(fields[scoreName]))}</b>
            </div>
          ))
        }
      </div>

      <div id="saves">
        {saves.map((save) => (
          <Save
            name={save.name}
            key={save.name}
            baseSave={fields[`base${save.name}`]}
            abilityScoreName={save.abilityScore}
            abilityScoreValue={fields[save.abilityScore]}
            setBaseSave={(baseSave: number) => {
              setFields({
                ...fields,
                [`base${save.name}`]: baseSave,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
