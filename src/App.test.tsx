import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const typeInInput = (input: HTMLElement, value: string) => {
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value } });
  fireEvent.blur(input);
};

it('has a "Name" input you can type in', () => {
  render(<App />);
  const nameInput = screen.getByLabelText('Name');

  typeInInput(nameInput, 'Chalconte bar Irrisun');

  expect(nameInput).toHaveValue('Chalconte bar Irrisun');
});

describe('ability scores', () => {
  it('has inputs for ability scores, defaulting to 10', () => {
    render(<App />);

    ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'].forEach((score) => {
      const scoreInput = screen.getByLabelText(score);

      expect(scoreInput).toHaveValue('10');
    });
  });

  it('lets you edit the ability scores', () => {
    render(<App />);
    const strInput = screen.getByLabelText('Str');

    typeInInput(strInput, '13');

    expect(strInput).toHaveValue('13');
  });
});
