import { useCallback, useState } from "react";

import { AppointmentCreateResponse, CreateAppointmentTypes } from "@/types";
import { createAppointment, ErrorCreateAppointment } from "@/services/appointments";
import { resetErrors } from "@/constants";

type Props = {
  cedula: string;
  setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentCreateResponse | null>>;
};

export const inputsNames = {
  date: "appointmentDate",
  employeeId: "employee_id",
  serviceIds: "serviceIds",
  clientId: "client_id",
};

export function useAppointmentForm({ cedula, setAppointmentData }: Props) {
  const [showErrors, setShowErrors] = useState(resetErrors);
  const [loadingCreateAppointment, setLoadingCreateAppointment] = useState(false);

  /**
   * handleCreateAppointment
   * change the implementation of this function! 
   * The form data is not suported fon node or test enviroment
   */

  const handleCreateAppointment = useCallback((evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget); 
    const servicesIdList = formData.getAll(inputsNames.serviceIds);

    if (servicesIdList.length <= 0) {
      setShowErrors({
        input: inputsNames.serviceIds,
        message: "Debe seleccionar al menos un servicio",
      });
      return;
    }

    setShowErrors(resetErrors);
    setLoadingCreateAppointment(true);

    const appointment: CreateAppointmentTypes = {
      appointment: {
        appointmentDate: formData.get(inputsNames.date) as string,
        client_id: cedula,
        employee_id: Number(formData.get(inputsNames.employeeId)),
      },
      serviceIds: servicesIdList.map((id) => Number(id)),
    };

    createAppointment({ appointment })
      .then(setAppointmentData)
      .catch((err: ErrorCreateAppointment) =>
        setShowErrors({ input: err.nameInput, message: err.message })
      )
      .finally(() => setLoadingCreateAppointment(false));
  }, []);

  return {
    handleCreateAppointment,
    loadingCreateAppointment,
    showErrors,
  };
}
