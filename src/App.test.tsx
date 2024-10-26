import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

it('has a "Name" input you can type in', () => {
  render(<App />);
  const nameInput = screen.getByLabelText('Name');
  expect(nameInput).toBeInTheDocument();

  fireEvent.focus(nameInput);
  fireEvent.change(nameInput, { target: { value: 'Chalconte bar Irrisun' } });
  fireEvent.blur(nameInput);

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

    fireEvent.focus(strInput);
    fireEvent.change(strInput, { target: { value: '13' } });
    fireEvent.blur(strInput);

    expect(strInput).toHaveValue('13');
  });
});
