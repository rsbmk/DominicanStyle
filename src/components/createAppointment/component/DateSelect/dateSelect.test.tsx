import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'

import { inputsNames } from '@/components/createAppointment/hook/appointmentForm'
import { DateSelect } from './DateSelect'

const user = userEvent.setup()

describe('Date select for create appointment', () => {
  afterEach(() => {
    cleanup()
  })

  it('shoud render the label input', () => {
    const { getByText } = render(<DateSelect inputHasError='' name={inputsNames.date} messageError='' />)
    getByText('Cuando deseas tu cita:')
  })

  it('the user should be able to write in the input', async () => {
    const { getByPlaceholderText } = render(<DateSelect inputHasError='' name={inputsNames.date} messageError='' />)
    const inputDate = getByPlaceholderText('dd/mm/aaaa hh:mm') as HTMLInputElement

    await user.type(inputDate, '2021-10-10 10:10')
    expect(inputDate.value).toBe('2021-10-10T10:10')
  })

  it('should render a error if in the input throw an error', () => {
    const { getByText } = render(<DateSelect inputHasError={inputsNames.date} name={inputsNames.date} messageError='error' />)
    getByText('error')
  })
})
