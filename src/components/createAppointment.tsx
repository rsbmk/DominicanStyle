import { useEffect, useState } from "react";

import { CrossPlusIcon } from "../icons/cross";
import { Employee } from "../types";
import { ListboxSelect } from "./listbox";
import { useEmployee } from "../hooks/employees";
import Modal from "./modal";

type CreateAppointment = {
  name: string;
  telephone: number;
  employeeID: number;
  service: string;
  shedule: number;
  employeeId: number;
};

const INPUTS_LIST = [
  {
    placeholder: "Nombre",
    type: "text",
    name: "name",
    required: true,
  },
  {
    placeholder: "Teléfono de contacto",
    type: "number",
    name: "telephone",
    required: true,
  },
  {
    placeholder: "Seleccione un empleado",
    type: "Select",
    name: "employeeID",
    required: true,
  },
  {
    placeholder: "Servicio",
    type: "text",
    name: "service",
    required: true,
  },
  {
    placeholder: "Hora de atención deseada",
    type: "number",
    name: "shedule",
    required: true,
  },
];

export function CreateAppointment() {
  const [isOpen, setIsOpen] = useState(false);
  const [someError, setSomeError] = useState({ message: "", nameInput: "" });
  const [employeeIdSelected, setEmployeeIdSelected] = useState(0);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const { getEmployees } = useEmployee();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    getEmployees()
      .then(setEmployeeList)
      .catch(() => {
        setEmployeeList([]);
        console.log("Error");
      });
  }, []);

  function handleCreateAppointmentSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    if (employeeIdSelected === 0) {
      setSomeError({ message: "Seleccione un empleado", nameInput: "employeeID" });

      window.setTimeout(() => {
        setSomeError({ message: "", nameInput: "" });
      }, 3000);
      return;
    }

    const fromData = new FormData(evt.currentTarget as HTMLFormElement);
    const appointmentData: CreateAppointment = {
      name: fromData.get("name") as string,
      telephone: Number(fromData.get("telephone") as string),
      employeeID: Number(fromData.get("employeeID") as string),
      service: fromData.get("service") as string,
      shedule: Number(fromData.get("shedule") as string),
      employeeId: employeeIdSelected,
    };

    
  }

  return (
    <>
      <button onClick={openModal} className="font-medium button">
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

            if (type === "Select") {
              return (
                <label>
                  <ListboxSelect
                    key={name}
                    optionList={employeeList}
                    placeholder={placeholder}
                    setEmployeeIdSelected={setEmployeeIdSelected}
                  />
                  {someError.nameInput === name && (
                    <ErrorMessageField message={someError.message} />
                  )}
                </label>
              );
            }

            return (
              <label>
                <input
                  name={name}
                  key={name}
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
            <button type="submit" className="button">
              Crear
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
