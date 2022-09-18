import { ErrorMessage } from "@/components/errorMessage";
import { getEmployeeType } from "@/types";
import { isEmpty } from "@/utils/isEmpty";

type Props = {
  name: string;
  messageError: string;
  inputHasError: string;
  labelTitle: string;
  employeeSelected: getEmployeeType;
};

export function CheckListServices({ inputHasError, name, messageError, employeeSelected, labelTitle }: Props) {
  return (
    <div>
      <span>{labelTitle}</span>
      {inputHasError === name && (
        <ErrorMessage message={messageError} />
      )}

      {!isEmpty(employeeSelected) && employeeSelected.Employee_Team.map((EmployeeTeam) => (
        <div className="mb-2" key={EmployeeTeam.id}>
          <span className="ml-2 font-semibold">- {EmployeeTeam.Team.name}</span>
          <ul className="flex flex-col ml-6">
            {EmployeeTeam.Team.Service.map((service) => (
              <li key={service.id}>
                <label className="flex gap-2 font-normal">
                  {service.name}
                  <input type="checkbox" name={name} value={service.id} />
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}