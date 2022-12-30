import { BASE_URL_MOCK } from '@/constants'
import { getEmployeeType } from '@/types'
import axios from 'axios'

const BASE_URL: string = import.meta.env.VITE_BASE_API_URL ?? BASE_URL_MOCK

export async function getEmployees(): Promise<getEmployeeType[]> {
  try {
    const { data, status } = await axios.get(`${BASE_URL}/v1/employee`)

    if (status === 200) return data as getEmployeeType[]

    throw new Error('Error fetching Employee data')
  } catch (error) {
    if (axios.isAxiosError(error)) throw new Error(error ?? 'Error fetching Employee data')

    throw error
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
