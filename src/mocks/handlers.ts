import { rest, RestRequest, ResponseComposition, RestContext } from "msw";
import { Appointment, Employee } from "../types";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const EmployeeData: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main St",
    createdAt: new Date().toISOString(),
    phone: "123456789",
    service: [
      {
        service: {
          id: 1,
          name: "Service 1",
          price: 100,
          createAt: new Date().toISOString(),
          description: "Service 1 description",
        },
      },
    ],
    team: {
      id: 1,
      createAt: new Date().toISOString(),
      name: "Team 1",
    },
    teamId: 1,
  },
];

const AppointmenData: Appointment[] = [
  {
    employeeId: 1,
    serviceId: 1,
    name: "John Doe",
    telephone: "123456789",
    schedule: "2020-01-01T00:00:00.000Z",
  },
];

export const handlers = [
  rest.get(`${BASE_URL}/v1/employees`, handleGetEmployees),
  rest.post(`${BASE_URL}/v1/appointment`, handleCreateAppointment),
];

function handleCreateAppointment(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
  console.log("handleCreateAppointment", req.body);
  return res(ctx.delay(0), ctx.status(201), ctx.json(req.body));
}

function handleGetEmployees(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
  return res(ctx.delay(0), ctx.status(200), ctx.json(EmployeeData));
}
