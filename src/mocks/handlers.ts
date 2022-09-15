import { rest, RestRequest, ResponseComposition, RestContext } from "msw";
import { clientDataMock } from "./data";
const BASE_URL = 'http://localhost:8080/api/v1'

export const handlers = [
  rest.get(`${BASE_URL}/client/:cedula`, handleGetClient),

];

function handleGetClient(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
  const { cedula } = req.params;

  if (cedula === clientDataMock.cedula) return res(ctx.delay(0), ctx.status(200), ctx.json(clientDataMock));
  return res(ctx.delay(0), ctx.status(404), ctx.json({ "nameInput": 'cedula', 'message': 'Error al buscar el cliente' }));
}
