import { Appointment } from "@/types";

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

export function useAppointment() {
  async function getAppointments(): Promise<Appointment[]> {
    try {
      const response = await fetch(`${BASE_URI}/v1/appointment/day`);
      if (response.ok) {
        const data: Appointment[] = await response.json();
        return data;
      }

      const error = await response.json();
      console.error({ error });
      return [];
    } catch (error) {
      console.error({ error });
      return [];
    }
  }

  return { getAppointments };
}
