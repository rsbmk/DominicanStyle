import { Link } from "wouter";
import { useState } from "react";

import { ArrowIcon } from "@/icons/arrowIcon";
import { Client } from "@/types";
import { createClient } from "@/services/client";
import { ErrorMessage } from "@/components/errorMessage";
import { LoadingIcon } from "@/icons/loading";
import { PersonalInfIlustration } from "@/icons/Ilutrations";
import { LINKS_PAGES, resetErrors } from "@/constants";

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
        setError({ input: "cedula", message: "Ha ocurrido un error, por favor intenta más tarde" });
      })
      .finally(() => setLoading(false));
  };

  const InputsClient = [
    {
      placeholder: "Ingrese su número de cédula",
      name: CLIENTS_INPUTS_NAME.cedula,
      value: client.cedula,
    },
    {
      placeholder: "Ingrese su nombre",
      name: CLIENTS_INPUTS_NAME.name,
      value: client.name,
    },
    {
      placeholder: "Ingrese su apellido",
      name: CLIENTS_INPUTS_NAME.last_name,
      value: client.last_name,
    },
    {
      placeholder: "Ingrese su número de teléfono",
      name: CLIENTS_INPUTS_NAME.telephone,
      value: client.telephone,
    },
  ];

  return (
    <main className="grid gap-4">
      {clientCreated ? (
        <div>
          <h1>Gracias por registrar tus datos</h1>
          <Link href={LINKS_PAGES.createAppointment}>Agendar una cita</Link>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center mt-8 text-center">
            <Link to={LINKS_PAGES.createAppointment}>
              <ArrowIcon className="mt-1 text-primary-100" width={30} height={30} />
            </Link>
            <h1 className="text-3xl font-bold text-center text-primary-100">Registra tus datos</h1>
          </div>
          <div className="grid w-full place-content-center">
            <PersonalInfIlustration />
          </div>
          <form onSubmit={handleCreateCliendSubmit} role="form" className="grid w-full gap-8 my-8 place-content-center">
            {InputsClient.map(({ placeholder, name, value }) => (
              <label>
                <input
                  type="text"
                  placeholder={placeholder}
                  className="w-56 text-gray-500 border-b-2 border-opacity-50 focus:outline-none border-primary-100"
                  name={name || ""}
                  onChange={handleChangeInput}
                  value={value || ""}
                />
                {error.input === name && <ErrorMessage className="w-56" message={error.message} />}
              </label>
            ))}
            <div className="flex justify-end">
              <button className="button1" type="submit">
                {loading ? <LoadingIcon /> : "Guardar"}
              </button>
            </div>
          </form>
        </>
      )}
    </main>
  );
};
