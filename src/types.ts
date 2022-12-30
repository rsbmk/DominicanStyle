/**
 * Model Company
 *
 */
export interface Company {
  id: number
  name: string
  createAt: Date | null
}

/**
 * Model Appointment
 *
 */
export interface Appointment {
  id: number
  createAt: Date | null
  appointmentDate: Date
  state: Appointment_state
  client_id: string
  employee_id: number
}

/**
 * Model Client
 *
 */
export interface Client {
  cedula: string
  name: string
  last_name: string
  telephone: string | null
  createAt: Date | null
}

/**
 * Model Employee
 *
 */
export interface Employee {
  id: number
  name: string
  last_name: string
  telephone: string | null
  createAt: Date | null
  address: string | null
  company_id: number
}

/**
 * Model Employee_Team
 *
 */
export interface Employee_Team {
  id: number
  team_id: number
  employee_id: number
}

/**
 * Model Service
 *
 */
export interface Service {
  id: number
  name: string
  createAt: Date | null
  team_id: number
  price: number
}

/**
 * Model Service_Appointment
 *
 */
export interface Service_Appointment {
  id: number
  service_id: number
  appointment_id: number
}

/**
 * Model Team
 *
 */
export interface Team {
  id: number
  name: string
  createAt: Date | null
}

export type Appointment_state = 'pending' | 'confirmed' | 'process' | 'close' | 'cancelled'

/**
 * Theses interfaces are used to define the return the services
 */

export interface getEmployeeType {
  Employee_Team: EmployeeTeam[]
  address: null
  company_id: number
  createAt: Date
  id: number
  last_name: string
  name: string
  telephone: string
}

export interface EmployeeTeam {
  Team: {
    Service: Service[]
    createAt: Date
    id: number
    name: string
  }
  employee_id: number
  id: number
  team_id: number
}

// export interface getEmployeeWithServicesType {
//   Team: TeamServices;
//   employee_id: number;
//   id: number;
//   team_id: number;
// }

// interface TeamServices {
//   Service: Service[];
//   createAt: Date;
//   id: number;
//   name: string;
// }

export interface CreateAppointmentTypes {
  appointment: {
    appointmentDate: string
    client_id: string
    employee_id: number
  }
  serviceIds: number[]
}

export interface AppointmentCreateResponse {
  Client: Client
  Employee: Employee
  Service_Appointment: ServiceAppointment[]
  appointmentDate: Date
  client_id: string
  createAt: Date
  employee_id: number
  id: number
  state: string
}

export interface ServiceAppointment {
  Service: Service
  appointment_id: number
  id: number
  service_id: number
}
