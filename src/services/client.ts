import axios from "axios";
import { Client } from "@/types";

const BASE_URI = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8080/api";

export const searchClientData = async ({ clientId }: { clientId: string }) => {
  try {
    const { data, status } = await axios.get(`${BASE_URI}/v1/client/${clientId}`);

    if (status === 200) return data as Client;

    throw new Error("Error fetching client data");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    console.error("useClient ~ searchClientData ~ line 13", { error });
    throw error;
  }
};
