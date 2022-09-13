import { useCallback, useRef, useState } from "react";
import {
  AppointmentCreateResponse,
  CreateAppointmentTypes,
  getEmployeeWithServicesType,
} from "@/types";

import { createAppointment, ErrorCreateAppointment } from "@/services/appointments";
import { getOneEmployeeWithServices } from "@/services/employees";
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
  const [loadingServicesData, setLoadingServicesData] = useState(false);
  const [loadingCreateAppointment, setLoadingCreateAppointment] = useState(false);
  const [employeeWithServices, setEmployeeWithServices] = useState<getEmployeeWithServicesType[]>(
    []
  );

  const formRef = useRef<HTMLFormElement>(null);

  const clearEmployeeWithServices = () => setEmployeeWithServices([]);

  const handleCreateAppointment = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      const form = formRef.current;
      if (form === null) return;

      const formData = new FormData(form);
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
        .catch((err: ErrorCreateAppointment) => {
          setShowErrors({ input: err.nameInput, message: err.message });
        })
        .finally(() => setLoadingCreateAppointment(false));
    },
    [formRef, employeeWithServices]
  );

  const handleServicesData = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      evt.preventDefault();
      const form = formRef.current;
      if (form === null) return;

      const formData = new FormData(form);
      const date = formData.get(inputsNames.date);
      const employeeId = formData.get(inputsNames.employeeId);

      if (date === "") {
        setShowErrors({ input: inputsNames.date, message: "La fecha es requerida" });
        return;
      }

      if (employeeId === null) {
        setShowErrors({ input: inputsNames.employeeId, message: "El empleado es requerido" });
        return;
      }

      setShowErrors(resetErrors);
      setLoadingServicesData(true);

      getOneEmployeeWithServices({ employeeId: Number(employeeId) })
        .then(setEmployeeWithServices)
        .catch((err) => {
          console.error({ err });
        })
        .finally(() => setLoadingServicesData(false));
    },
    [formRef]
  );

  return {
    clearEmployeeWithServices,
    employeeWithServices,
    formRef,
    handleCreateAppointment,
    handleServicesData,
    loadingCreateAppointment,
    loadingServicesData,
    showErrors,
  };
}
