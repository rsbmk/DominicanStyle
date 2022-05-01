import { useState } from "react";
import { CrossPlusIcon } from "../icons/cross";
import { ListboxSelect } from "./listbox";
import Modal from "./modal";

const EMPLOYED_STAFF_OPTIONS = [
  { name: "Kenia Melo" },
  { name: "Kerobe Melo" },
  { name: "Roberto Melo" },
];

const INPUTS_LIST = [
  {
    placeholder: "Nombre",
    type: "text",
    name: "name",
    required: true,
  },
  {
    placeholder: "Teléfono",
    type: "number",
    name: "telephone",
    required: true,
  },
  {
    placeholder: "Personal ...",
    type: "Select",
    name: "employedStaff",
    required: true,
  },
  {
    placeholder: "Servicio",
    type: "text",
    name: "service",
    required: true,
  },
  {
    placeholder: "Horario",
    type: "number",
    name: "shedule",
    required: true,
  },
];

export function CreateAppointment() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleCreateAppointmentSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    const fromData = new FormData(evt.currentTarget as HTMLFormElement);
    fromData.forEach((value, key) => {
      console.log({ key, value });
    });
  }

  return (
    <>
      <button onClick={openModal} className="font-medium button">
        Agendar cita
        <CrossPlusIcon width={16} height={16} />
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="mb-4 text-lg font-medium text-blue-500">Crea tu cita</h2>
        <form
          onSubmit={handleCreateAppointmentSubmit}
          className="flex flex-col gap-2 overflow-y-scroll "
        >
          {INPUTS_LIST.map((input) => {
            const { placeholder, type, name, required } = input;

            if (type === "Select") {
              return <ListboxSelect key={name} name={name} optionList={EMPLOYED_STAFF_OPTIONS} />;
            }

            return (
              <input
                name={name}
                key={name}
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                required={required}
                className="w-full p-2 text-gray-500 border-2 border-gray-400 border-opacity-50 rounded-xl focus:outline-none"
              />
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
