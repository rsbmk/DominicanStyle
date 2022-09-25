import { createContext, useEffect, useState } from "react";

import { AppointmentCreateResponse, Client } from "@/types";
import { CreateAppointmentForm } from "@/components/createAppointment";
import { searchClientData } from "@/services/client";
import { SearchClientForm } from "@/components/searchClientForm";
import { LoadingIcon } from "@/icons/loading";
import { AppointmentInformation } from "@/components/createAppointment/component/infomation";
import { Link } from "wouter";
import { ArrowIcon } from "@/icons/arrowIcon";
import { LINKS_PAGES } from "@/constants";

export const titleAppointmentContex = createContext({});

export default function Appointment() {
  const [clientData, setClientData] = useState<Client | null>(null);
  const [lastClientId, setLastClientId] = useState(() => window.localStorage.getItem("cedula"));
  const [loadingClientData, setLoadingClientData] = useState(false);
  const [appointmentData, setAppointmentData] = useState<AppointmentCreateResponse | null>(null);

  const handleGetClient = (client: Client) => {
    window.localStorage.setItem("cedula", client.cedula);
    setClientData(client);
    setLastClientId(client.cedula);
  };

  useEffect(() => {
    if (lastClientId === null || clientData !== null) return;

    setLoadingClientData(true);
    searchClientData({ clientId: lastClientId })
      .then(setClientData)
      .catch((err) => console.error({ err }))
      .finally(() => setLoadingClientData(false));
  }, [lastClientId, clientData]);

  return (
    <main>
      <div className="flex items-center justify-center mt-8 text-center">
        <Link to={LINKS_PAGES.home}>
          <ArrowIcon className="mt-1 text-primary-100" width={30} height={30} />
        </Link>
        <h1 aria-label="title appointment" className="text-3xl font-bold text-center text-primary-100">
          {appointmentData === null ? "Agenda tu cita" : "Cita agendada"}
        </h1>
      </div>
      {lastClientId === null ? (
        <SearchClientForm setClientData={handleGetClient} />
      ) : (
        <>
          {loadingClientData && clientData === null && (
            <div className="flex items-end justify-center w-full h-10 text-primary-100">
              <LoadingIcon stroke="#09f" opacity="opacity-70" />
            </div>
          )}

          {appointmentData === null && clientData !== null && loadingClientData === false && (
            <CreateAppointmentForm clientData={clientData} setAppointmentData={setAppointmentData} />
          )}

          {appointmentData !== null && clientData !== null && <AppointmentInformation appointmentData={appointmentData} clientData={clientData} />}
        </>
      )}
    </main>
  );
}
