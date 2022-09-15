import { Employee, getEmployeeType } from "@/types";
import { ErrorMessage } from "@/components/errorMessage";
import LoadingIcon from "@/icons/loading";

type Props = {
  handleOnChange: () => void;
  name: string;
  messageError: string;
  inputHasError: string;
  loading: boolean;
  optionsList: getEmployeeType[];
  labelTitle: string;
};

export function EmployeeSelect({
  handleOnChange,
  name,
  inputHasError,
  messageError,
  loading,
  optionsList,
  labelTitle,
}: Props) {
  const isEmptyOptionsList = loading === false && optionsList.length === 0;

  return (
    <div>
      <label aria-label="employeeId" className="flex gap-2">
        <span>{labelTitle}</span>
        {loading === true && optionsList.length === 0 ? (
          <LoadingIcon />
        ) : (
          <>
            {isEmptyOptionsList && <ErrorMessage message={"No hay empleados disponibles"} />}
            <select
              onChange={handleOnChange}
              name={name}
              className="font-normal border-b-2 border-blue-300"
              placeholder="Empleados"
            >
              <option key="default" disabled defaultValue={"Empleados"}>
                {isEmptyOptionsList ? "Sin opciones" : "Empleados"}
              </option>
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
  );
}
