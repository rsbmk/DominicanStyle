import { cleanup, render } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'

import { employeesDataMock } from '@/mocks/data'
import { EmployeeSelect } from './employeeSelect'
import { inputsNames } from '@/components/createAppointment/hook/appointmentForm'
import { server } from '@/mocks/server'

const user = userEvent.setup()

describe('employee selector in create appointment from', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterEach(() => {
    cleanup()
    server.resetHandlers()
  })

  afterAll(() => server.close())

  it('should render the title lable', () => {
    const { getByText } = render(<EmployeeSelect labelTitle='Algún empleado de preferencia:' optionsList={employeesDataMock} loading={false} handleOnChange={() => null} inputHasError='' messageError='' name='' />)
    getByText('Algún empleado de preferencia:')
  })

  it('should render the select list of employees', async () => {
    const { getByPlaceholderText } = render(<EmployeeSelect labelTitle='' optionsList={employeesDataMock} loading={false} handleOnChange={() => null} inputHasError='' messageError='' name='' />)
    const selectEmployeeInput = getByPlaceholderText('Empleados') as HTMLSelectElement

    await user.selectOptions(selectEmployeeInput, '12')

    expect(selectEmployeeInput.value).toBe('12')
  })

  it('should render the error message', () => {
    const { getByText } = render(<EmployeeSelect labelTitle='' optionsList={employeesDataMock} loading={false} handleOnChange={() => null} inputHasError={inputsNames.employeeId} messageError='Error message' name={inputsNames.employeeId} />)
    getByText('Error message')
  })

  it('if the loading is flase and the list options is false, should show a error message and it not have a options', async () => {
    const { getByText, getByPlaceholderText } = render(<EmployeeSelect labelTitle='' optionsList={[]} loading={false} handleOnChange={() => null} inputHasError='' messageError='' name='' />)
    getByText('No hay empleados disponibles')

    const selectEmployeeInput = getByPlaceholderText('Empleados') as HTMLSelectElement
    await user.click(selectEmployeeInput)

    getByText('Sin opciones')
  })
})
