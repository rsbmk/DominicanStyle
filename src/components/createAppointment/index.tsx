import { useEffect, useState } from "react";

import { CrossPlusIcon } from "../../icons/cross";
import { Employee, Service } from "../../types";
import { ListboxSelect } from "../listbox";
import { useEmployee } from "../../hooks/employees";
import Modal from "../modal";
import { LoadingIcon } from "../../icons/loading";
import { useCreateAppointment } from "./hook/create";

export function CreateAppointment() {
  const [isOpen, setIsOpen] = useState(false);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [serciveList, setServiceList] = useState<Service[]>([]);
  const { getEmployees } = useEmployee();

  const {
    closeModal,
    employeeIdSelected,
    handleCreateAppointmentSubmit,
    INPUTS_LIST,
    loading,
    setEmployeeIdSelected,
    setServiceIdSelected,
    someError,
  } = useCreateAppointment({ setIsOpen });

  useEffect(() => {
    if (employeeList.length === 0 || employeeIdSelected === 0) return;

    const employeeSelected = employeeList.find((employee) => employee.id === employeeIdSelected);
    if (!employeeSelected) return setServiceList([]);

    const serviceList = employeeSelected.service.map((service) => service.service);
    setServiceList(serviceList);
  }, [employeeList, employeeIdSelected]);

  useEffect(() => {
    getEmployees()
      .then(setEmployeeList)
      .catch(() => setEmployeeList([]));
  }, []);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="font-medium button">
        Agendar cita
        <CrossPlusIcon width={16} height={16} />
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="mb-4 text-lg font-medium text-blue-500">Agenda tu cita</h2>
        <form
          onSubmit={handleCreateAppointmentSubmit}
          className="flex flex-col gap-3 overflow-y-scroll "
        >
          {INPUTS_LIST.map((input) => {
            const { placeholder, type, name, required } = input;
            return (
              <label key={name}>
                <input
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  autoComplete="off"
                  required={required}
                  minLength={name === "telephone" ? 10 : undefined}
                  className="w-full p-2 text-gray-500 border-2 border-gray-400 border-opacity-50 rounded-xl focus:outline-none"
                />
                {someError.nameInput === name && <ErrorMessageField message={someError.message} />}
              </label>
            );
          })}

          <label key="employeeId">
            <ListboxSelect
              optionList={employeeList}
              placeholder="Seleccione un empleado"
              setIdSelected={setEmployeeIdSelected}
            />
            {someError.nameInput === "employeeId" && (
              <ErrorMessageField message={someError.message} />
            )}
          </label>

          <label key="serviceId">
            <ListboxSelect
              optionList={serciveList}
              placeholder="Servicio a realizar"
              setIdSelected={setServiceIdSelected}
            />
            {someError.nameInput === "serviceId" && (
              <ErrorMessageField message={someError.message} />
            )}
          </label>

          <div className="flex gap-2 mt-8">
            <button
              type="button"
              className="button2"
              onClick={(evt) => {
                evt.preventDefault();
                closeModal();
              }}
            >
              Cerrar
            </button>
            <button disabled={loading} type="submit" className="button">
              {loading ? <LoadingIcon /> : "Agendar cita"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

function ErrorMessageField({ message }: { message: string }) {
  return <p className="text-sm text-red-400">{message}</p>;
}
