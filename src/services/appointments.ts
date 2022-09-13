import { AppointmentCreateResponse, CreateAppointmentTypes } from "@/types";

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

export type ErrorCreateAppointment = {
  error: string
  fields: string[]
  message: string
  nameInput: string
  status: number
}

export async function createAppointment({ appointment }: { appointment: CreateAppointmentTypes }):Promise<AppointmentCreateResponse> {
  try {
    const response = await fetch(`${BASE_URI}/v1/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    if (response.ok) {
      return await response.json();
    }

    const error: Error = await response.json();
    throw error;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}
