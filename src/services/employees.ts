import { getEmployeeType } from "@/types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:8080/api/v1';

export async function getEmployees(): Promise<getEmployeeType[]> {
  try {
    const { data, status } = await axios.get(`${BASE_URL}/v1/employee`);

    if (status === 200) return data as getEmployeeType[]

    const error = { message: "Error fetching Employee data" }
    throw error;

  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response

    throw error;
  }
}

// export async function getOneEmployeeWithServices({ employeeId }: { employeeId: number }): Promise<getEmployeeWithServicesType[]> {
//   if (!employeeId) throw new Error("employeeId is required");

//   try {
//     const { data, status } = await axios.get(`${BASE_URL}/v1/employee/${employeeId}/services`);

//     if (status === 200) return data as getEmployeeWithServicesType[]

//     const error = { message: "Error fetching Employee data" }
//     throw error;

//   } catch (error) {
//    if (axios.isAxiosError(error)) throw error.response

//     throw error;
//   }
// }
