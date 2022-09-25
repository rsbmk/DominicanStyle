import { Link } from "wouter";
import dayjs from "dayjs";

import { AppointmentCreateResponse, Appointment_state, Client } from "@/types";
import { appointmentState, LINKS_PAGES } from "@/constants";
import { BookingIlustraton } from "@/icons/Ilutrations";

type Props = {
  clientData: Client;
  appointmentData: AppointmentCreateResponse;
}

export function AppointmentInformation({ clientData, appointmentData }: Props) {
  return (
    <div className="grid gap-3 pl-3 mt-8 place-content-center">
      <h3 className="mb-3 text-lg font-normal text-center">
        Muchas gracias
        <span className="font-bold mx-1 text-transparent bg-clip-text bg-gradient-to-r from-primary-100 via-[#60a0ffef] to-primary-100">
          {clientData.name}
        </span>
        por preferirnos <br /> Tú cita ha sido creada con éxito.
      </h3>

      <div className="grid w-full place-content-center">
        <BookingIlustraton />
      </div>

      <div>
        <h4 className="font-medium">Información de la cita</h4>
        <p className="flex justify-between pl-2">
          Creación de la cita:
          <span className="block text-primary-100">
            {dayjs(appointmentData.createAt).format("DD/MM/YYYY HH:mm")}
          </span>
        </p>

        <p className="flex justify-between pl-2">
          Fecha de agendamiento:
          <span className="block text-primary-100">
            {dayjs(appointmentData.appointmentDate).format("DD/MM/YYYY HH:mm")}
          </span>
        </p>

        <p className="flex justify-between pl-2">
          Estado:
          <span className="block text-primary-100">
            {appointmentState[appointmentData.state as Appointment_state]}
          </span>
        </p>
      </div>

      <div>

        <h4 className="font-medium">Cliente</h4>
        <p className="flex justify-between pl-2">
          Nombre:
          <span className="block text-primary-100">
            {appointmentData.Client.name} {appointmentData.Client.last_name}
          </span>
        </p>
        <p className="flex justify-between pl-2">
          CI:
          <span className="block text-primary-100">
            {appointmentData.Client.cedula}
          </span>
        </p>
        <p className="flex justify-between pl-2">
          Número de teléfono:
          <span className="block text-primary-100">
            {appointmentData.Client.telephone ?? "No registrado"}
          </span>
        </p>
      </div>

      <div>

        <h4 className="font-medium">Empleado</h4>
        <p className="flex justify-between pl-2">
          Nombre:
          <span className="block text-primary-100">
            {appointmentData.Employee.name} {appointmentData.Employee.last_name}
          </span>
        </p>
        <p className="flex justify-between pl-2">
          Número de teléfono:
          <span className="block text-primary-100">
            {appointmentData.Employee.telephone ?? "No registrado"}
          </span>
        </p>
      </div>
      <div>
        <h4 className="font-medium">Servicios</h4>
        <ul>
          {appointmentData.Service_Appointment.map((service) => (
            <li key={service.id}>
              {service.Service.name} - ${service.Service.price}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid w-full place-content-center">
        <Link href={LINKS_PAGES.home} className="w-32 button">
          Inicio
        </Link>
      </div>
    </div>
  )
}