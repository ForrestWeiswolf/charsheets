import ModifiableField from "./ModifiableField";
import { render, screen, fireEvent } from '@testing-library/react';

const displayedValue = '11'
const formula = "A+B+C"
const name = 'Example'

describe('ModifiableField', () => {
  const noop = () => { }

  it('shows the value when not focused', () => {
    render(<ModifiableField
      value={displayedValue} formula={formula} name={name} setFormula={noop}
    />)

    const textbox = screen.getByRole('textbox')

    expect(textbox).toHaveValue(displayedValue)
  })

  it('shows the formula only when focused', () => {
    render(<ModifiableField
      value={displayedValue} formula={formula} name={name} setFormula={noop}
    />)
    const textbox = screen.getByRole('textbox')

    fireEvent.focus(textbox)
    expect(textbox).toHaveValue(formula)

    fireEvent.focusOut(textbox)
    expect(textbox).toHaveValue(displayedValue)
  })


  it('has a label with the name', () => {
    render(<ModifiableField
      value={displayedValue} formula={formula} name={name} setFormula={noop}
    />)
    expect(screen.getByLabelText(name)).toBeInTheDocument()
  })

  it('allows the formula to be changed', () => {
    render(<ModifiableField
      value={displayedValue} formula={formula} name={name} setFormula={noop}
    />)
    const textbox = screen.getByRole('textbox')

    fireEvent.focus(textbox)
    fireEvent.change(textbox, { target: { value: '10' } })
    expect(textbox).toHaveValue('10')
  })

  it('calls setFormula on blur', () => {
    const spy = jest.fn()
    render(<ModifiableField
      value={displayedValue} formula={formula} name={name} setFormula={spy}
    />)
    const textbox = screen.getByRole('textbox')

    fireEvent.focus(textbox)
    fireEvent.change(textbox, { target: { value: '10' } })
    fireEvent.blur(textbox)

    expect(spy).toBeCalledWith('10')
  })


  // TODO: calls onChange on blur?
})

