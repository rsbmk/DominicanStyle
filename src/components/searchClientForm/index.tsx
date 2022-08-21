import { useClient } from "@/hooks/client";
import { CalendarIlustraton } from "@/icons/DateSelectIlutration";
import LoadingIcon from "@/icons/loading";
import { SearchIcon } from "@/icons/searchIcon";
import { Client } from "@/types";
import { useState } from "react";
import { Link } from "wouter";

const resetErrors = {
  input: "",
  message: "",
};

export function SearchClientForm({
  setClientData = () => null,
}: {
  setClientData: (client: Client) => void;
}) {
  const [showErrors, setShowErrors] = useState(resetErrors);
  const [loadingClientData, setLoadingClientData] = useState(false);

  const { searchClientData } = useClient();

  const handleSearchClient = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const testCI = /^[0-9]{10}$/;
    const clientId = evt.currentTarget.elements.namedItem("cedula") as HTMLInputElement | null;
    if (clientId === null || !testCI.test(clientId.value)) {
      setShowErrors({ input: "cedula", message: "Cedula no valida" });
      return;
    }
    setShowErrors(resetErrors);

    setLoadingClientData(true);
    searchClientData({ clientId: clientId.value })
      .then((client) => {
        setClientData(client);
      })
      .catch((err) => {
        setShowErrors({
          input: "cedula",
          message: "Ingresó mal su cédula o no ha registrado sus datos",
        });
        console.error({ err });
      })
      .finally(() => setLoadingClientData(false));
  };

  return (
    <>
      <div className="grid w-full my-8 place-content-center">
        <CalendarIlustraton />
      </div>
      <form className="flex items-center justify-around" onSubmit={handleSearchClient}>
        <label>
          <input
            name="cedula"
            type="text"
            placeholder="Ingresa tu número de cédula"
            required
            className="w-56 border-b-2 border-opacity-50 focus:outline-none border-primary-100"
          />
        </label>
        <button disabled={loadingClientData} className="button1 focus:outline-none">
          {loadingClientData ? (
            <LoadingIcon />
          ) : (
            <>
              <SearchIcon width={20} />
              Buscar
            </>
          )}
        </button>
      </form>
      {showErrors.input === "cedula" && (
        <p className="pl-4 mt-2 text-sm italic text-red-400">{showErrors.message}</p>
      )}
      <Link
        href="/client/register"
        className="grid justify-center mt-24 font-semibold text-center text-primary-100 hover:underline"
      >
        <span>¿Es primera vez que haces una cita?</span>
        <span>Registra tus datos</span>
      </Link>
    </>
  );
}
