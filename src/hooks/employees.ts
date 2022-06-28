import { Employee } from "@/types";

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

export function useEmployee() {
  async function getEmployees(): Promise<Employee[]> {
    try {
      const response = await fetch(`${BASE_URI}/v1/employees`);

      if (response.ok) {
        const data: Employee[] = await response.json();
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
  return { getEmployees };
}
