import React, { useState } from 'react';

type ModifiableFieldProps = {
  value: string, formula: string, name: string, setFormula: (formula: string) => void
};

function ModifiableField({
  value, formula, name, setFormula,
}: ModifiableFieldProps) {
  const [focused, setFocused] = useState(false);
  const [editedFormula, setEditedFormula] = useState(formula);

  return (
    <>
      <label htmlFor={`${name}-input`}>{name}</label>
      <input
        id={`${name}-input`}
        type="text"
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
