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
