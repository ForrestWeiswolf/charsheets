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

const defaultState = {
  name: '',
  abilityScores: {
    Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,
  } as Record<string, number>,
  saves: {
    Fort: { base: 0, total: 0 }, Ref: { base: 0, total: 0 }, Will: { base: 0, total: 0 },
  } as Record<string, { base: number, total: number }>,
};

function App() {
  const [fields, setFields] = useState(defaultState);

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

      <div id="ability-scores">
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

      <div id="saves">
        {saves.map(({ name, abilityScore }) => (
          <Save
            name={name}
            baseSave={fields.saves[name].base}
            abilityScoreName={abilityScore}
            abilityScoreValue={fields.abilityScores[abilityScore]}
            setBaseSave={(baseSave: number) => {
              setFields({
                ...fields,
                saves: {
                  ...fields.saves, [name]: { base: baseSave, total: 0 },
                },
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
