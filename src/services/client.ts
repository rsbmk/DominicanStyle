import axios from "axios";
import { Client } from "@/types";
import { BASE_URL_MOCK } from "@/constants";

const BASE_URI = import.meta.env.VITE_BASE_API_URL || BASE_URL_MOCK

export const searchClientData = async ({ clientId }: { clientId: string }) => {
  try {
    const { data, status } = await axios.get(`${BASE_URI}/v1/client/${clientId}`);

    if (status === 200) return data as Client;

    const error = { message: "Error fetching client data" }
    throw error;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
