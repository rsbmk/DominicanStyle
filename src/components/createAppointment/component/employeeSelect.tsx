import { ErrorMessage } from "@/components/errorMessage";
import LoadingIcon from "@/icons/loading";
import { getEmployees } from "@/services/employees";
import { Employee, getEmployeeType } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  clearEmployeeWithServices: () => void;
  name: string;
  messageError: string;
  inputHasError: string;
}

export function EmployeeSelect({ clearEmployeeWithServices, name, inputHasError, messageError }: Props) {
  const [loadingEmployeeList, setLoadingEmployeeList] = useState(false);
  const [employeeList, setEmployeeList] = useState<getEmployeeType[]>([]);


  useEffect(() => {
    setLoadingEmployeeList(true);
    getEmployees()
      .then((employees) => {
        setEmployeeList(employees);
      })
      .catch((err) => {
        console.error({ err });
      })
      .finally(() => setLoadingEmployeeList(false));
  }, []);

  return (
    <div>
      <label aria-label="employeeId" className="flex gap-2">
        <span>Algún empleado de preferencia:</span>
        {loadingEmployeeList && employeeList === null ? (
          <LoadingIcon />
        ) : (
          <select
            onChange={clearEmployeeWithServices}
            name={name}
            className="font-normal border-b-2 border-blue-300"
            placeholder="Empleados"
          >
            <option key="default" selected disabled>
              Empleados
            </option>
            {employeeList.map((employee: Employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        )}
      </label>
      {inputHasError === name && (
        <ErrorMessage message={messageError} />
      )}
    </div>
  )
}