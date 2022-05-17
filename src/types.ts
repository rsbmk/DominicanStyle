export type Employee = {
  address: string;
  createdAt: string;
  id: number;
  name: string;
  phone: string;
  teamId: number;
  team: Team;
  service: ServiceWithService[];
};

export type Team = {
  createAt: string;
  id: number;
  name: string;
};

export type ServiceWithService = {
  service: {
    createAt: string;
    description: string;
    id: number;
    name: string;
    price: number;
  };
};

export type Service = {
  createAt: string;
  description: string;
  id: number;
  name: string;
  price: number;
};

export type Appointment = {
  name: string;
  telephone: string;
  shedule: string;
  serviceId: number;
  employeeId: number;
};
