import React, { useState } from 'react';
import './App.css';
import { formatModifier, modFromAbilityScore } from './utils';
import ModifiableField from './ModifiableField';

const SAVES = [
  { name: 'Fort', abilityScore: 'Con' },
  { name: 'Ref', abilityScore: 'Dex' },
  { name: 'Will', abilityScore: 'Wis' },
];

function App() {
  const [name, setName] = useState('')
  const [abilityScores, setAbilityScores] = useState({
    Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,
  } as Record<string, number>);
  const [saves, setSaves] = useState({
    Fort: { base: 0, total: 0 }, Ref: { base: 0, total: 0 }, Will: { base: 0, total: 0 },
  } as Record<string, { base: number, total: number }>)

  return (
    <div className="App">
      <ModifiableField
        value={name}
        formula={name}
        name="Name"
        setFormula={(name) => { setName(name) }}
      />

      <div id="ability-scores">
        {
          // TODO: check if there's a good way to make sure the order is correct
          (Object.keys(abilityScores)).map((scoreName) => (
            <div key={scoreName}>
              <ModifiableField
                numeric
                value={abilityScores[scoreName].toString()}
                formula={abilityScores[scoreName].toString()}
                name={scoreName}
                setFormula={(f) => {
                  setAbilityScores({
                    ...abilityScores, [scoreName]: parseInt(f, 10),
                  });
                }}
              />
              <b>{formatModifier(modFromAbilityScore(abilityScores[scoreName]))}</b>
            </div>
          ))
        }
      </div>

      <div id="saves">
        {SAVES.map(({ name, abilityScore }) => {
          const abilityMod = modFromAbilityScore(abilityScores[abilityScore])
          return (
            <div key={name}>
              <ModifiableField
                numeric
                value={(saves[name].base + abilityMod).toString()}
                formula={(saves[name].base + abilityMod).toString()}
                name={name}
                setFormula={() => { }}
              />

              <ModifiableField
                numeric
                value={saves[name].base.toString()}
                formula={saves[name].base.toString()}
                name="Base"
                id={`base-${name}`}
                setFormula={(f) => {
                  setSaves({
                    ...saves, [name]: { base: parseInt(f, 10), total: 0 },
                  });
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
