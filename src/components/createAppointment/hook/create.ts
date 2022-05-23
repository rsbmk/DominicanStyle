import { useState } from "react";
import { Appointment } from "../../../types";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export function useCreateAppointment({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [employeeIdSelected, setEmployeeIdSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serviceIdSelected, setServiceIdSelected] = useState(0);
  const [someError, setSomeError] = useState({ message: "", nameInput: "" });

  function closeModal() {
    setIsOpen(false);
    setEmployeeIdSelected(0);
    setServiceIdSelected(0);
  }

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
      placeholder: "Hora de atención deseada",
      type: "datetime-local",
      name: "shedule",
      required: true,
    },
  ];

  async function handleCreateAppointmentSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    if (employeeIdSelected === 0) {
      setSomeError({ message: "Seleccione un empleado", nameInput: "employeeId" });

      window.setTimeout(() => {
        setSomeError({ message: "", nameInput: "" });
      }, 3000);
      return;
    }

    if (serviceIdSelected === 0) {
      setSomeError({ message: "Seleccione un servicio", nameInput: "serviceId" });

      window.setTimeout(() => {
        setSomeError({ message: "", nameInput: "" });
      }, 3000);
      return;
    }

    setLoading(true);

    const fromData = new FormData(evt.currentTarget as HTMLFormElement);

    const appointmentData: Appointment = {
      name: fromData.get("name") as string,
      telephone: fromData.get("telephone") as string,
      shedule: fromData.get("shedule") as string,
      serviceId: serviceIdSelected,
      employeeId: employeeIdSelected,
    };

    const response = await fetch(`${BASE_URL}/v1/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(appointmentData),
    });

    if (response.ok) {
      const appointment = await response.json();
      console.log("Appointment created", appointment);
      closeModal();
      setLoading(false);
      return;
    }
    // provar los errores y mostrarlos en el modal
    setLoading(false);
    const error = await response.json();
    console.log("Error creating appointment", error);
  }

  return {
    closeModal,
    employeeIdSelected,
    setServiceIdSelected,
    setEmployeeIdSelected,
    handleCreateAppointmentSubmit,
    INPUTS_LIST,
    loading,
    someError,
  };
}
