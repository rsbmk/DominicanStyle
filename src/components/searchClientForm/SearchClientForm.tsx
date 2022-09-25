import { Link } from "wouter";
import { useCallback, useState } from "react";

import { CalendarIlustraton } from "@/icons/Ilutrations";
import { Client } from "@/types";
import { ErrorMessage } from "@/components/errorMessage";
import { LINKS_PAGES, resetErrors } from "@/constants";
import { searchClientData } from "@/services/client";
import { SearchIcon } from "@/icons/searchIcon";
import { LoadingIcon } from "@/icons/loading";

export function SearchClientForm({ setClientData = () => null }: { setClientData: (client: Client) => void }) {
  const [showErrors, setShowErrors] = useState(resetErrors);
  const [loadingClientData, setLoadingClientData] = useState(false);

  const handleSearchClient = useCallback((evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const testCI = /^[0-9]{10}$/;
    const clientId = evt.currentTarget.elements.namedItem("cedula") as HTMLInputElement | null;

    if (clientId === null || !testCI.test(clientId.value)) {
      setShowErrors({ input: "cedula", message: "Cédula no valida" });
      return;
    }

    setShowErrors(resetErrors);
    setLoadingClientData(true);

    searchClientData({ clientId: clientId.value })
      .then((client) => {
        setClientData(client);
      })
      .catch((err) => {
        const { nameInput = "cedula", message = "Error al buscar el cliente" } = err || {};
        setShowErrors({
          input: nameInput,
          message: message,
        });
      })
      .finally(() => setLoadingClientData(false));
  }, []);

  return (
    <>
      <div aria-label="calendar illustration" className="grid w-full my-8 place-content-center">
        <CalendarIlustraton />
      </div>
      <form className="flex items-center justify-around" onSubmit={handleSearchClient}>
        <label>
          <input
            name="cedula"
            type="text"
            placeholder="Ingresa tu número de cédula"
            required
            className="w-56 text-gray-500 border-b-2 border-opacity-50 focus:outline-none border-primary-100"
          />
        </label>
        <button type={"submit"} aria-label="btn submit search user form" disabled={loadingClientData} className="button1 focus:outline-none">
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
        <div className="pl-4">
          <ErrorMessage message={showErrors.message} />
        </div>
      )}
      <Link href={LINKS_PAGES.registerClient} className="grid justify-center mt-24 font-semibold text-center text-primary-100 hover:underline">
        <span>¿Es primera vez que haces una cita?</span>
        <span>Registra tus datos</span>
      </Link>
    </>
  );
}
