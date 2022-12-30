import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CreateAppointmentForm } from './form'
import { clientDataMock } from '@/mocks/data'
import { server } from '@/mocks/server'

const user = userEvent.setup()

describe('create appointment form', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterEach(() => {
    cleanup()
    server.resetHandlers()
  })

  afterAll(() => server.close())

  it('should render the title form and the name of client', () => {
    const { getByText } = render(<CreateAppointmentForm clientData={clientDataMock} setAppointmentData={() => { }} />)
    getByText('Hola,')
    getByText(clientDataMock.name)
  })

  it('submit the form', async () => {
    const { getByPlaceholderText, getByLabelText, getByText, debug } = render(<CreateAppointmentForm clientData={clientDataMock} setAppointmentData={() => { }} />)
    const inputDate = getByPlaceholderText('dd/mm/aaaa hh:mm') as HTMLInputElement
    await user.type(inputDate, '2021-10-10 10:10')
    expect(inputDate.value).toBe('2021-10-10T10:10')

    const inputEmployee = getByPlaceholderText('Empleados') as HTMLInputElement
    await user.selectOptions(inputEmployee, '13')
    expect(inputEmployee.value).toBe('13')

    const checkboxService = getByLabelText('Manicura') as HTMLInputElement
    expect(checkboxService.checked).toBe(false)
    await user.click(checkboxService)
    expect(checkboxService.checked).toBe(true)

    const btnSubmit = getByText('Crear cita')
    // await user.click(btnSubmit); // in node, the FormData is not suported
  })
})
