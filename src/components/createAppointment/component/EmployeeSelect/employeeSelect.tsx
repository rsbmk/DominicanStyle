import { Employee, getEmployeeType } from '@/types'
import { ErrorMessage } from '@/components/errorMessage'
import { LoadingIcon } from '@/icons/loading'

interface Props {
  handleOnChange: (employeeSelectedId: number) => void
  name: string
  messageError: string
  inputHasError: string
  loading: boolean
  optionsList: getEmployeeType[]
  labelTitle: string
}

export function EmployeeSelect ({ handleOnChange, name, inputHasError, messageError, loading, optionsList, labelTitle }: Props) {
  const isEmptyOptionsList = !loading && optionsList.length === 0

  const handleSelectEmployee: React.ChangeEventHandler<HTMLSelectElement> = (evt) => {
    const employeeSelectedId = Number(evt.target.value)
    handleOnChange(employeeSelectedId)
  }

  return (
    <div>
      <label aria-label='employeeId' className='flex gap-2'>
        <span>{labelTitle}</span>
        {loading && optionsList.length === 0
          ? (
            <LoadingIcon />
            )
          : (
            <>
              {isEmptyOptionsList && <ErrorMessage message='No hay empleados disponibles' />}
              <select
                onChange={handleSelectEmployee}
                name={name}
                className='font-normal border-b-2 border-blue-300 focus-within:outline-blue-200'
                placeholder='Empleados'
              >
                <option value=''>{isEmptyOptionsList ? 'Sin opciones' : 'Empleados'}</option>
                {optionsList.map((employee: Employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </>
            )}
      </label>
      {inputHasError === name && <ErrorMessage message={messageError} />}
    </div>
  )
}
