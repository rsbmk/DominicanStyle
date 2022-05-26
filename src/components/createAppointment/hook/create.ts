import { useState } from "react";
import { Appointment, Notifications } from "../../../types";
import { DateTime } from "luxon";

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

  async function handleCreateAppointmentSubmit(
    evt: React.FormEvent,
    setNotification: React.Dispatch<React.SetStateAction<Notifications>>
  ) {
    evt.preventDefault();

    if (employeeIdSelected === 0)
      return printError({ message: "Seleccione un empleado", nameInput: "employeeId" });

    if (serviceIdSelected === 0)
      return printError({ message: "Seleccione un servicio", nameInput: "serviceId" });

    const fromData = new FormData(evt.currentTarget as HTMLFormElement);

    const shedule = new Date(fromData.get("shedule") as string);
    const isValidDateShedule = DateTime.fromJSDate(shedule).isValid;

    if (!isValidDateShedule)
      return printError({ message: "La fecha ingresada no es válida", nameInput: "shedule" });

    setLoading(true);

    const appointmentData: Appointment = {
      name: fromData.get("name") as string,
      telephone: fromData.get("telephone") as string,
      shedule: fromData.get("shedule") as string,
      serviceId: serviceIdSelected,
      employeeId: employeeIdSelected,
    };

    try {
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
        setNotification({ message: "Cita creada con éxito", show: true, type: "success" });
        return;
      }

      // provar los errores y mostrarlos en el modal
      setLoading(false);
      const error = await response.json();
      const { message, nameInput, error: errorMessage } = error;
      printError({ message, nameInput });
      setNotification({ message: errorMessage, show: true, type: "error" });
    } catch (error) {
      console.error("Error", error);
    }
  }

  function printError({ message = "", nameInput = "" }) {
    setSomeError({ message, nameInput });

    window.setTimeout(() => {
      setSomeError({ message: "", nameInput: "" });
    }, 3000);
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
