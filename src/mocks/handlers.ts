import {rest, RestRequest, ResponseComposition, RestContext} from "msw"
import { Appointment } from "../types";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

// RestRequest<DefaultRequestBody, PathParams>
// ResponseComposition<DefaultRequestBody>
// RestContext

export const  handlers = [
  rest.post(`${BASE_URL}/v1/appointment`, handleCreateAppointment),
]

function handleCreateAppointment (req: RestRequest,res:ResponseComposition, ctx:RestContext) {
  const { employeeId, serviceId, shedule, telephone, name } = req.body as Appointment;

  return res(
    ctx.delay(0),
    ctx.status(201),
    ctx.json({
      data: {
        id: 1,
        employeeId,
        serviceId,
        shedule,
        telephone,
        name,
        createAt: new Date().toISOString(),
      }
    })
  )
}