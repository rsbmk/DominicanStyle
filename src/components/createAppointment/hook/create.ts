import { useCallback, useState } from "react";
import dayjs from "dayjs";
import fetch from "cross-fetch";

import { Appointment, Notifications } from "@/types";

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
      name: "schedule",
      required: true,
    },
  ];

  const validateSelections = ({
    employeeIdSelected,
    serviceIdSelected,
  }: {
    employeeIdSelected: number;
    serviceIdSelected: number;
  }) => {
    return new Promise((resolve, reject) => {
      if (employeeIdSelected === 0)
        reject({ message: "Seleccione un empleado", nameInput: "employeeId" });

      if (serviceIdSelected === 0)
        reject({ message: "Seleccione un servicio", nameInput: "serviceId" });

      resolve({ message: "", nameInput: "" });
    });
  };

  const handleCreateAppointmentSubmit = useCallback(async function (
    formData: FormData,
    setNotification: React.Dispatch<React.SetStateAction<Notifications>>
  ) {
    validateSelections({ employeeIdSelected, serviceIdSelected }).catch((error) => {
      printError(error);
      return true;
    });

    const shedule = new Date(formData.get("schedule") as string);
    const isValidDateShedule = dayjs(shedule, {}, true).isValid();

    if (!isValidDateShedule)
      return printError({ message: "La fecha ingresada no es válida", nameInput: "schedule" });

    setLoading(true);

    const appointmentData: Appointment = {
      name: formData.get("name") as string,
      telephone: formData.get("telephone") as string,
      schedule: shedule.toJSON(),
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

      console.log("response", response);

      if (response.ok) {
        const appointment = await response.json();
        console.log("Appointment created", appointment);
        closeModal();
        setLoading(false);
        setNotification({ message: "Cita creada con éxito", show: true, type: "success" });
        return;
      }

      const error = await response.json();
      const { message, nameInput, error: errorMessage } = error;

      setLoading(false);
      printError({ message, nameInput });
      setNotification({ message: errorMessage, show: true, type: "error" });
      closeModal();
    } catch (error) {
      console.error("Error", error);
    }
  },
  []);

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
