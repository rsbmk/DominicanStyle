import { ResponseComposition, rest, RestContext, RestRequest } from 'msw'
import { clientDataMock, employeesDataMock } from './data'

import { BASE_URL_MOCK } from '@/constants'
import { Client } from '@/types'

const handleGetClient = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  const { cedula } = req.params

  if (cedula === clientDataMock.cedula) return res(ctx.delay(0), ctx.status(200), ctx.json(clientDataMock))
  return res(ctx.delay(0), ctx.status(404), ctx.json({ nameInput: 'cedula', message: 'Error al buscar el cliente' }))
}

const handleCreateClient = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  const client = req.body as Client

  if (client.cedula.length < 10) {
    return res(
      ctx.delay(0),
      ctx.status(400),
      ctx.json({
        message: 'Debe tener 10 digitos',
        nameInput: 'cedula'
      })
    )
  }

  return res(ctx.delay(0), ctx.status(201), ctx.json({ client, message: 'Cliente creado con exito' }))
}

const handleGetEmployees = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  return res(ctx.delay(0), ctx.status(200), ctx.json(employeesDataMock))
}

// function handlereateAppointment(req: RestRequest, res: ResponseComposition, ctx: RestContext) {
//   const appointment  = req.body
//   console.log("hola", {appointment, req});

//   return res(ctx.delay(0), ctx.status(201), ctx.json(appointmentDataMock));
// }

export const handlers = [
  rest.get(`${BASE_URL_MOCK}/v1/client/:cedula`, handleGetClient),
  rest.post(`${BASE_URL_MOCK}/v1/client`, handleCreateClient),
  rest.get(`${BASE_URL_MOCK}/v1/employee`, handleGetEmployees)
  // rest.post(`${BASE_URL_MOCK}/v1/appointment`, handlereateAppointment),
]
