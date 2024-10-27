import React, { useState } from 'react';
import './ModifiableField.css';

type ModifiableFieldProps = {
  value: string, formula: string, name: string,
  setFormula: (formula: string) => void,
  numeric?: boolean
  id?: string
};

function ModifiableField({
  value, formula, name, setFormula, numeric = false, id = name,
}: ModifiableFieldProps) {
  const [focused, setFocused] = useState(false);
  const [editedFormula, setEditedFormula] = useState(formula);

  return (
    <>
      <label htmlFor={`${id}-input`}>{name}</label>
      <input
        id={`${id}-input`}
        type="text"
        className={numeric ? 'modifiable-field numeric' : 'modifiable-field'}
        value={focused ? editedFormula : value}
        onChange={(e) => setEditedFormula(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setFormula(editedFormula);
        }}
      />
    </>
  );
}

export default ModifiableField;
