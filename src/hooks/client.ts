import { Client } from "@/types";

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

export function useClient() {
  const searchClientData = async ({ clientId = "" } = {}) => {
    try {
      const response = await fetch(`${BASE_URI}/v1/client/${clientId}`);

      if (response.ok) {
        return (await response.json()) as Client;
      }

      throw await response.json();
    } catch (error) {
      console.error("useClient ~ searchClientData ~ line 13", error);
      throw error;
    }
  };

  return { searchClientData };
}
