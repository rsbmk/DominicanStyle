import { afterEach, describe, expect, it } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CheckListServices } from './checkList'
import { getEmployeeType } from '@/types'
import { employeesDataMock } from '@/mocks/data'

describe('Check list services component', () => {
  afterEach(cleanup)

  it('should not fail if selected employee is empty', () => {
    const { getByText } = render(<CheckListServices employeeSelected={{} as getEmployeeType} inputHasError='error' labelTitle='This is the check list test' messageError='' name='' />)
    getByText('This is the check list test')
  })

  it('should render the message error when the name input is equal to the inputHasError', () => {
    const { getByText } = render(<CheckListServices employeeSelected={{} as getEmployeeType} inputHasError='name' labelTitle='' messageError='This is the message error' name='name' />)
    getByText('This is the message error')
  })

  it('should render the employee team', () => {
    const { getByText } = render(<CheckListServices employeeSelected={employeesDataMock[1]} inputHasError='error' labelTitle='Label title' messageError='' name='' />)
    getByText(`- ${employeesDataMock[1].Employee_Team[0].Team.name}`)
  })

  it('should render the list of services and test the checkbox', async () => {
    const { getByRole, getByLabelText } = render(<CheckListServices employeeSelected={employeesDataMock[1]} inputHasError='error' labelTitle='Label title' messageError='' name='' />)
    getByRole('list')
    const checkbox = getByLabelText(employeesDataMock[1].Employee_Team[0].Team.Service[0].name) as HTMLInputElement
    expect(checkbox.type).toBe('checkbox')
    expect(checkbox.checked).toBe(false)

    await userEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
  })
})
