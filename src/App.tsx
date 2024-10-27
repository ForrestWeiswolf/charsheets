import React, { useState } from 'react';
import './App.css';
import { formatModifier, modFromAbilityScore } from './utils';
import ModifiableField from './ModifiableField';

const saves = [
  { name: 'Fort', abilityScore: 'Con' },
  { name: 'Ref', abilityScore: 'Dex' },
  { name: 'Will', abilityScore: 'Wis' },
];

function App() {
  const [fields, setFields] = useState({
    name: '',
    abilityScores: {
      Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,
    } as Record<string, number>,
    saves: {
      Fort: { base: 0, total: 0 }, Ref: { base: 0, total: 0 }, Will: { base: 0, total: 0 },
    } as Record<string, { base: number, total: number }>,
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
          <div key={name}>
            <ModifiableField
              numeric
              value={
                (fields.saves[name].base + modFromAbilityScore(fields.abilityScores[abilityScore])).toString()
              }
              formula={
                (fields.saves[name].base + modFromAbilityScore(fields.abilityScores[abilityScore])).toString()
              }
              name={name}
              setFormula={() => { }}
            />

            <ModifiableField
              numeric
              value={fields.saves[name].base.toString()}
              formula={fields.saves[name].base.toString()}
              name="Base"
              id={`base-${name}`}
              setFormula={(f) => {
                setFields({
                  ...fields,
                  saves: {
                    ...fields.saves, [name]: { base: parseInt(f, 10), total: 0 },
                  },
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
