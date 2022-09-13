import { getEmployeeType, getEmployeeWithServicesType } from "@/types";

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

export async function getEmployees(): Promise<getEmployeeType[]> {
  try {
    const response = await fetch(`${BASE_URI}/v1/employee`);

    if (response.ok) {
      return await response.json();
    }

    const error = await response.json();
    console.error({ error });
    throw error.message;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function getOneEmployeeWithServices({ employeeId }: { employeeId: number }): Promise<getEmployeeWithServicesType[]> {
  if (!employeeId) throw new Error("employeeId is required");

  try {
    const response = await fetch(`${BASE_URI}/v1/employee/${employeeId}/services`);

    if (response.ok) {
      return await response.json();
    }
    throw await response.json();
  } catch (error) {
    console.error({ error });
    throw error;
  }
}
