import axios from 'axios'
import { AppointmentCreateResponse, CreateAppointmentTypes } from '@/types'
import { BASE_URL_MOCK } from '@/constants'

const BASE_URI = import.meta.env.VITE_BASE_API_URL || BASE_URL_MOCK

export interface ErrorCreateAppointment {
  error: string
  fields: string[]
  message: string
  nameInput: string
  status: number
}

export async function createAppointment ({
  appointment
}: {
  appointment: CreateAppointmentTypes
}): Promise<AppointmentCreateResponse> {
  try {
    const { data, status } = await axios.post(`${BASE_URI}/v1/appointment`, appointment)

    if (status === 201) return data

    const error = { nameInput: 'appointmentDate', message: 'Error al crear la cita', error: data }
    throw error
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response
    throw error
  }
}
