import { useState } from 'react'

import { AppointmentCreateResponse, Client, getEmployeeType } from '@/types'
import { CheckListServices } from '@/components/createAppointment/component/checkListServices'
import { DateSelect } from '@/components/createAppointment/component/DateSelect'
import { useAppointmentForm, inputsNames } from '@/components/createAppointment/hook/appointmentForm'
import { useSelectEmployee, EmployeeSelect } from '@/components/createAppointment/component/EmployeeSelect'
import { LoadingIcon } from '@/icons/loading'

interface Props {
  clientData: Client
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentCreateResponse | null>>
}

export function CreateAppointmentForm ({ clientData, setAppointmentData }: Props) {
  const [employeeSelected, setEmployeeSelected] = useState<getEmployeeType | null>(null)

  const { handleCreateAppointment, loadingCreateAppointment, showErrors } = useAppointmentForm({ cedula: clientData.cedula, setAppointmentData })

  const { employeeList, loadingEmployeeList, handleSelectEmployee } = useSelectEmployee({ setEmployeeSelected })

  return (
    <section>
      <h3 className='m-3 text-lg font-medium text-gray-600'>
        Hola,
        <span className='font-bold mx-1 text-transparent bg-clip-text bg-gradient-to-r from-primary-100 via-[#60a0ffef] to-primary-100'>
          {clientData.name}
        </span>
      </h3>

      <form aria-label='create appointment form' onSubmit={handleCreateAppointment} className='grid gap-4 mx-3 mb-40 font-medium text-gray-600'>
        <DateSelect inputHasError={showErrors.input} messageError={showErrors.message} name={inputsNames.date} />
        <EmployeeSelect
          labelTitle='Algún empleado de preferencia:'
          loading={loadingEmployeeList}
          optionsList={employeeList}
          inputHasError={showErrors.input}
          messageError={showErrors.message}
          name={inputsNames.employeeId}
          handleOnChange={handleSelectEmployee}
        />

        {employeeSelected !== null && (
          <>
            <CheckListServices
              employeeSelected={employeeSelected}
              inputHasError={showErrors.input}
              labelTitle='Qué servicios deseas:'
              messageError={showErrors.message}
              name={inputsNames.serviceIds}
            />

            <button
              type='submit'
              disabled={loadingCreateAppointment}
              className='button focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loadingCreateAppointment ? <LoadingIcon /> : 'Crear cita'}
            </button>
          </>
        )}
      </form>
    </section>
  )
}
