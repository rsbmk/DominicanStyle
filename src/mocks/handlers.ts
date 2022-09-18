import { rest, RestRequest, ResponseComposition, RestContext } from "msw";
import { clientDataMock, employeesDataMock } from "./data";
import { BASE_URL_MOCK } from "@/constants";

export const handlers = [
  rest.get(`${BASE_URL_MOCK}/v1/client/:cedula`, handleGetClient),
  rest.get(`${BASE_URL_MOCK}/v1/employee`, handleGetEmployees),
  // rest.post(`${BASE_URL_MOCK}/v1/appointment`, handlereateAppointment),
];

function handleGetClient(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
  const { cedula } = req.params;

  if (cedula === clientDataMock.cedula) return res(ctx.delay(0), ctx.status(200), ctx.json(clientDataMock));
  return res(ctx.delay(0), ctx.status(404), ctx.json({ "nameInput": 'cedula', 'message': 'Error al buscar el cliente' }));
}

function handleGetEmployees(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
  return res(ctx.delay(0), ctx.status(200), ctx.json(employeesDataMock));
}

// function handlereateAppointment(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
//   const appointment  = req.body
//   console.log("hola", {appointment, req});
  
//   return res(ctx.delay(0), ctx.status(201), ctx.json(appointmentDataMock));
// }
