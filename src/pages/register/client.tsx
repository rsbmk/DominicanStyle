import { Link } from "wouter";
import { useState } from "react";

import { Client } from "@/types";
import { createClient } from "@/services/client";
import { ErrorMessage } from "@/components/errorMessage";
import { resetErrors } from "@/constants";
import LoadingIcon from "@/icons/loading";

const CLIENTS_INPUTS_NAME: Client = {
  cedula: "cedula",
  createAt: null,
  last_name: "last_name",
  name: "name",
  telephone: "telephone",
};

const INITAL_STATE_CLIENT: Client = {
  cedula: "",
  createAt: null,
  last_name: "",
  name: "",
  telephone: "",
};

export const RegisterClient = () => {
  const [client, setClient] = useState<Client>(INITAL_STATE_CLIENT);
  const [clientCreated, setClientCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(resetErrors);

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    const clientValue = name === CLIENTS_INPUTS_NAME.telephone ? value.replace(/\D/g, "") : value;
    setClient({ ...client, [name]: clientValue });
  };

  const handleCreateCliendSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!client[CLIENTS_INPUTS_NAME.cedula as keyof Client]) {
      setError({ input: CLIENTS_INPUTS_NAME.cedula, message: "Tu cédula es requerida" });
      return;
    }

    if (!client[CLIENTS_INPUTS_NAME.name as keyof Client]) {
      setError({ input: CLIENTS_INPUTS_NAME.name, message: "Tu nombre es requerido" });
      return;
    }

    if (!client[CLIENTS_INPUTS_NAME.last_name as keyof Client]) {
      setError({ input: CLIENTS_INPUTS_NAME.last_name, message: "Tu apellido es requerido" });
      return;
    }

    setLoading(true);
    createClient({ client })
      .then(() => {
        window.localStorage.setItem("cedula", client.cedula);
        setClientCreated(true);
      })
      .catch((error) => {
        if (error?.input) return setError(error);
        if (error?.message) return setError({ input: "cedula", message: error.message });
        setError({ input: "cedula", message: "Ha ocurrido un error, por favor intenta de nuevo" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <main>
      {clientCreated ? (
        <>
          <h1>Gracias por registrar tus datos</h1>
          <Link href="/appointment/create">Agendar una cita</Link>
        </>
      ) : (
        <>
          <h1>Registra tus datos</h1>
          <form onSubmit={handleCreateCliendSubmit} role="form">
            <label>
              <input
                type="text"
                placeholder="Ingrese su número de cédula"
                name={CLIENTS_INPUTS_NAME.cedula}
                onChange={handleChangeInput}
                value={client.cedula}
              />
              {error.input === CLIENTS_INPUTS_NAME.cedula && <ErrorMessage message={error.message} />}
            </label>
            <label>
              <input type="text" onChange={handleChangeInput} value={client.name} name={CLIENTS_INPUTS_NAME.name} placeholder="Ingrese su nombre" />
              {error.input === CLIENTS_INPUTS_NAME.name && <ErrorMessage message={error.message} />}
            </label>
            <label>
              <input
                type="text"
                onChange={handleChangeInput}
                value={client.last_name}
                name={CLIENTS_INPUTS_NAME.last_name}
                placeholder="Ingrese su apellido"
              />
              {error.input === CLIENTS_INPUTS_NAME.last_name && <ErrorMessage message={error.message} />}
            </label>
            <label>
              <input
                type="text"
                onChange={handleChangeInput}
                value={client.telephone as keyof Client}
                name={CLIENTS_INPUTS_NAME.telephone as keyof Client}
                placeholder="Ingrese su número de teléfono"
              />
            </label>
            <button type="submit">{loading ? <LoadingIcon /> : "Guardar"}</button>
          </form>
        </>
      )}
    </main>
  );
};