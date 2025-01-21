import React from 'react';
import ModifiableField from './ModifiableField';
import { modFromAbilityScore } from './utils';

type SaveProps = {
  name: string,
  abilityScoreName: string,
  abilityScoreValue: number,
  baseSave: number,
  setBaseSave: (baseSave: number) => void
};

function Save({
  name, abilityScoreName, abilityScoreValue, baseSave, setBaseSave,
}: SaveProps) {
  const abilityMod = modFromAbilityScore(abilityScoreValue);

  return (
    <div key={name}>
      <ModifiableField
        numeric
        value={(baseSave + abilityMod).toString()}
        formula={
        `${abilityScoreName}+base${name}`
      }
        name={name}
        setFormula={() => { }}
      />

      <ModifiableField
        numeric
        value={baseSave.toString()}
        formula={baseSave.toString()}
        name="Base"
        id={`base_${name}`}
        setFormula={(f) => setBaseSave(parseInt(f, 10))}
      />
    </div>
  );
}

export default Save;
