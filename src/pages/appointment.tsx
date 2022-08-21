import { useState } from "react";

import { Client } from "@/types";
import { SearchClientForm } from "@/components/searchClientForm";

export default function Appointment() {
  const [lastClientId, setLastClientId] = useState(() => window.localStorage.getItem("cedula"));
  const [clientData, setClientData] = useState<Client | null>(null);

  const handleGetClient = (client: Client) => {
    window.localStorage.setItem("cedula", client.cedula);
    setClientData(client);
    setLastClientId(client.cedula);
  };

  return (
    <main className="">
      <h1 className="mt-8 text-3xl font-bold text-center text-primary-100">Agenda tu cita</h1>
      {lastClientId === null && clientData === null ? (
        <SearchClientForm setClientData={handleGetClient} />
      ) : (
        <span>ya tienes al cliente identificado</span>
      )}
    </main>
  );
}
