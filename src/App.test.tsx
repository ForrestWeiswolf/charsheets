import React from 'react';
import {
  fireEvent, render, screen, within,
} from '@testing-library/react';
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

  it('shows the ability score modifiers', () => {
    render(<App />);

    const strInput = screen.getByLabelText('Str');

    typeInInput(strInput, '17');

    expect(screen.getByText('+3')).toBeInTheDocument();

    typeInInput(strInput, '8');

    expect(screen.queryByText('+3')).not.toBeInTheDocument();
    expect(screen.getByText('-1')).toBeInTheDocument();
  });
});

describe('saves', () => {
  it('has inputs for saves', () => {
    render(<App />);
    ['Fort', 'Ref', 'Will'].forEach((save) => {
      expect(screen.getByLabelText(save)).toBeInTheDocument();
    });
  });

  it('has inputs for base saves', () => {
    render(<App />);
    ['Fort', 'Ref', 'Will'].forEach((save) => {
      const baseSave = within(screen.getByLabelText(save).parentElement as HTMLElement).getByLabelText('Base');
      expect(baseSave).toBeInTheDocument();
    });
  });

  it('allows base saves to be changed', () => {
    render(<App />);
    const baseFort = within(screen.getByLabelText('Fort').parentElement as HTMLElement).getByLabelText('Base');

    typeInInput(baseFort, '7');

    expect(baseFort).toHaveValue('7');
  });

  it('changes the total save when a base save changes', () => {
    render(<App />);
    const baseFort = within(screen.getByLabelText('Fort').parentElement as HTMLElement).getByLabelText('Base');
    const fort = screen.getByLabelText('Fort');

    typeInInput(baseFort, '7');

    expect(fort).toHaveValue('7');
  });

  it('changes total Fort save when Con ability score changes', () => {
    render(<App />);
    const baseSave = within(screen.getByLabelText('Fort').parentElement as HTMLElement).getByLabelText('Base');
    const save = screen.getByLabelText('Fort');
    const abilityScore = screen.getByLabelText('Con');

    typeInInput(baseSave, '7');
    typeInInput(abilityScore, '14');
    expect(save).toHaveValue('9');
  });

  it('changes total Ref save when Dex ability score changes', () => {
    render(<App />);
    const baseSave = within(screen.getByLabelText('Ref').parentElement as HTMLElement).getByLabelText('Base');
    const save = screen.getByLabelText('Ref');
    const abilityScore = screen.getByLabelText('Dex');

    typeInInput(baseSave, '3');
    typeInInput(abilityScore, '7');
    expect(save).toHaveValue('1');
  });

  it('changes total Will save when Wis ability score changes', () => {
    render(<App />);
    const baseSave = within(screen.getByLabelText('Will').parentElement as HTMLElement).getByLabelText('Base');
    const save = screen.getByLabelText('Will');
    const abilityScore = screen.getByLabelText('Wis');

    typeInInput(baseSave, '7');
    typeInInput(abilityScore, '17');
    expect(save).toHaveValue('10');
  });

  it('shows Con + base_Fort as the formula for total Ref', () => {
    render(<App />);

    fireEvent.focus(screen.getByLabelText('Fort'));
    expect(screen.getByLabelText('Fort')).toHaveValue('Con+base_Fort');
  });

  it('shows Dex + base_Ref as the formula for total Ref', () => {
    render(<App />);

    fireEvent.focus(screen.getByLabelText('Ref'));
    expect(screen.getByLabelText('Ref')).toHaveValue('Dex+base_Ref');
  });

  it('shows Wis + base_Will as the formula for total Will', () => {
    render(<App />);

    fireEvent.focus(screen.getByLabelText('Will'));
    expect(screen.getByLabelText('Will')).toHaveValue('Wis+base_Will');
  });
});
