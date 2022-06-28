import { lazy, Suspense, useEffect, useState } from "react";

import { Employee, Notifications, Service } from "@/types";
import { ListboxSelect } from "@/components/listbox";
import { useCreateAppointment } from "@/components/createAppointment/hook/create";
import { useEmployee } from "@/hooks/employees";
import Modal from "@/components/modal";

const LoadingIcon = lazy(() => import("@/icons/loading"));

type Props = {
  modalProps: {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNotification: React.Dispatch<React.SetStateAction<Notifications>>;
    isOpen: boolean;
  };
};

export default function CreateAppointmentModal({ modalProps }: Props) {
  const { isOpen, setIsOpen, setNotification } = modalProps;
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [serciveList, setServiceList] = useState<Service[]>([]);
  const { getEmployees } = useEmployee();

  useEffect(() => {
    getEmployees()
      .then(setEmployeeList)
      .catch(() => setEmployeeList([]));
  }, []);

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

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <h2 className="mb-4 text-lg font-medium text-blue-500">Agenda tu cita</h2>
      <form
        onSubmit={(evt) => handleCreateAppointmentSubmit(evt, setNotification)}
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
                className={`w-full p-2 text-gray-500 placeholder-gray-400 border-2 border-opacity-50 rounded-xl focus:outline-none ${
                  someError.nameInput === name
                    ? "border-red-500 bg-red-50 bg-opacity-50"
                    : "border-gray-400 bg-slate-100 bg-opacity-50"
                }`}
              />
              {someError.nameInput === name && <ErrorMessageField message={someError.message} />}
            </label>
          );
        })}

        <label key="employeeId">
          <ListboxSelect
            hasError={someError.nameInput === "employeeId"}
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
            hasError={someError.nameInput === "serviceId"}
            optionList={serciveList}
            placeholder="Servicio a realizar"
            setIdSelected={setServiceIdSelected}
          />
          {someError.nameInput === "serviceId" && <ErrorMessageField message={someError.message} />}
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
            <Suspense fallback={null}>{loading ? <LoadingIcon /> : "Agendar cita"}</Suspense>
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ErrorMessageField({ message }: { message: string }) {
  return <p className="text-sm text-red-400">{message}</p>;
}
