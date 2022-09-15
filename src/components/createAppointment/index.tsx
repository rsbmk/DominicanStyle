import { useEffect, useState } from "react";

import LoadingIcon from "@/icons/loading";
import { AppointmentCreateResponse, Client, getEmployeeType } from "@/types";
import { ErrorMessage } from "@/components/errorMessage";
import { getEmployees } from "@/services/employees";
import { DateSelect } from "@/components/createAppointment/component/DateSelect";
import { EmployeeSelect } from "@/components/createAppointment/component/EmployeeSelect";
import { useAppointmentForm, inputsNames } from "./hook/appointmentForm";

type Props = {
  clientData: Client;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentCreateResponse | null>>;
};

export function CreateAppointmentForm({ clientData, setAppointmentData }: Props) {
  const [employeeList, setEmployeeList] = useState<getEmployeeType[]>([]);
  const [loadingEmployeeList, setLoadingEmployeeList] = useState(true);

  const {
    clearEmployeeWithServices,
    employeeWithServices,
    formRef,
    handleCreateAppointment,
    handleServicesData,
    loadingCreateAppointment,
    loadingServicesData,
    showErrors,
  } = useAppointmentForm({ cedula: clientData.cedula, setAppointmentData });

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

  return (
    <section>
      <div>
        <h3 className="m-3 text-lg font-medium text-gray-600">
          Hola,
          <span className="font-bold mx-1 text-transparent bg-clip-text bg-gradient-to-r from-primary-100 via-[#60a0ffef] to-primary-100">
            {clientData.name}
          </span>
        </h3>

        <form
          ref={formRef}
          onSubmit={handleCreateAppointment}
          className="grid gap-4 mx-3 mb-40 font-medium text-gray-600"
        >
          <DateSelect
            inputHasError={showErrors.input}
            messageError={showErrors.message}
            name={inputsNames.date}
          />
          <EmployeeSelect
            labelTitle="Algún empleado de preferencia:"
            loading={loadingEmployeeList}
            optionsList={employeeList}
            inputHasError={showErrors.input}
            messageError={showErrors.message}
            name={inputsNames.employeeId}
            handleOnChange={clearEmployeeWithServices}
          />

          {/* {employeeWithServices.length <= 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleServicesData}
                type={"button"}
                disabled={loadingServicesData}
                className="button1 focus:outline-none"
              >
                {loadingServicesData ? <LoadingIcon /> : "Continuar"}
              </button>
            </div>
          )} */}

          {/* {employeeWithServices.length > 0 && (
            <>
              <div>
                <span>Qué servicios deseas:</span>
                {showErrors.input === inputsNames.serviceIds && (
                  <ErrorMessage message={showErrors.message} />
                )}

                {employeeWithServices.map((employee) => (
                  <div className="mb-2" key={employee.id}>
                    <span className="ml-2 font-semibold">- {employee.Team.name}</span>
                    <div key={employee.id} className="flex flex-col ml-6">
                      {employee.Team.Service.map((service) => (
                        <label key={service.id} className="flex gap-2 font-normal">
                          {service.name}
                          <input type="checkbox" name={inputsNames.serviceIds} value={service.id} />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type={"submit"}
                disabled={loadingCreateAppointment}
                className="button focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingCreateAppointment ? <LoadingIcon /> : "Crear cita"}
              </button>
            </>
            )} */}
        </form>
      </div>
    </section>
  );
}
