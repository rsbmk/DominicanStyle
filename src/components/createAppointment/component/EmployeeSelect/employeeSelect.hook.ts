import { getEmployees } from "@/services/employees";
import { getEmployeeType } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  setEmployeeSelected: React.Dispatch<React.SetStateAction<getEmployeeType | null>>;
};

export function useSelectEmployee({ setEmployeeSelected }: Props) {
  const [employeeList, setEmployeeList] = useState<getEmployeeType[]>([]);
  const [loadingEmployeeList, setLoadingEmployeeList] = useState(true);

  useEffect(() => {
    getEmployees()
      .then((employees) => {
        setEmployeeList(employees);
      })
      .catch((err) => {
        console.error({ err });
      })
      .finally(() => setLoadingEmployeeList(false));
  }, []);

  const handleSelectEmployee = (employeeSelectedId: number) => {
    const employeeSelected =
      employeeList.find((employee) => employee.id === employeeSelectedId) || null;
    setEmployeeSelected(employeeSelected);
  };

  return { handleSelectEmployee, employeeList, loadingEmployeeList };
}
