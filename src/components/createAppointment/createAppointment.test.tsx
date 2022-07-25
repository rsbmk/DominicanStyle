import { render, cleanup } from "@testing-library/react";
import dayjs from "dayjs";
import userEvent from "@testing-library/user-event";

import { CreateAppointment } from ".";
import { describe, it, expect, afterAll, afterEach, beforeAll } from "vitest";
import { server } from "@/mocks/server";

const user = userEvent.setup();
beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

describe.only("Create appointment", () => {
  it("user interaction", async () => {
    const { findByText, getAllByLabelText, getByLabelText, getByPlaceholderText, getByTitle } =
      render(<CreateAppointment />);

    const button = getByLabelText("create appointment");
    expect(button).toBeTruthy();
    await user.click(button);

    const titleModal = await findByText("Agenda tu cita");
    expect(titleModal).toBeTruthy();

    const inputName = getByPlaceholderText("Nombre");
    expect(inputName).toBeTruthy();
    await user.type(inputName, "Juan");

    const telephone = getByPlaceholderText("Teléfono de contacto");
    expect(telephone).toBeTruthy();
    await user.type(telephone, "1234567890");

    const schedule = getByPlaceholderText("Hora de atención deseada");
    expect(schedule).toBeTruthy();
    await user.type(schedule, dayjs().format("DD/MM/YYYY HH:mm"));

    const [employeeInput, serviceInput] = getAllByLabelText("select");
    // console.log(prettyDOM(employee[0]));

    expect(employeeInput).toBeTruthy();
    await user.click(employeeInput);

    const employeeOption = await getByTitle("option John Doe");
    expect(employeeOption).toBeTruthy();

    await user.click(employeeOption);
    await user.click(serviceInput);

    const serviceOption = await getByTitle("option Service 1");
    expect(serviceOption).toBeTruthy();
    await user.click(serviceOption);

    const buttonSubmit = getByLabelText("crear cita");
    expect(buttonSubmit).toBeTruthy();

    await user.click(buttonSubmit);
  });
});
