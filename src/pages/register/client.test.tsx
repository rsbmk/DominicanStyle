import userEvent from "@testing-library/user-event";
import { describe, it, afterEach, expect, beforeAll, afterAll } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { server } from "@/mocks/server";

import { RegisterClient } from "./client";

const user = userEvent.setup();

describe("Create cliente page", () => {
  beforeAll(() => {
    server.listen();
  })

  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });

  afterAll(() => {
    server.close();
  })

  it("should render and catch the titile", () => {
    const { getByText } = render(<RegisterClient />);
    getByText("Registra tus datos");
  });

  it("should have a form", () => {
    const { getByRole } = render(<RegisterClient />);
    getByRole("form");
  });

  it("should have a input for cedula", async () => {
    const { getByPlaceholderText } = render(<RegisterClient />);
    const input = getByPlaceholderText("Ingrese su número de cédula") as HTMLInputElement;

    await user.type(input, "123456789");
    expect(input.value).toBe("123456789");

    await user.clear(input);
    expect(input.value).toBe("");
  });

  it("should have a input for name", async () => {
    const { getByPlaceholderText } = render(<RegisterClient />);
    const inputName = getByPlaceholderText("Ingrese su nombre") as HTMLInputElement;

    await user.type(inputName, "Juan");
    expect(inputName.value).toBe("Juan");

    await user.clear(inputName);
    expect(inputName.value).toBe("");
  });

  it("should have a input for last name", async () => {
    const { getByPlaceholderText } = render(<RegisterClient />);

    const input = getByPlaceholderText("Ingrese su apellido") as HTMLInputElement;
    await user.type(input, "Melo");
    expect(input.value).toBe("Melo");

    await user.clear(input);
    expect(input.value).toBe("");
  });

  it("should have a input for telephone", async () => {
    const { getByPlaceholderText } = render(<RegisterClient />);
    const inputTelephone = getByPlaceholderText("Ingrese su número de teléfono") as HTMLInputElement;

    await user.type(inputTelephone, "123456789");
    expect(inputTelephone.value).toBe("123456789");

    await user.clear(inputTelephone);
    expect(inputTelephone.value).toBe("");
  });

  it("the telephone input only should accept numbers", async () => {
    const { getByPlaceholderText } = render(<RegisterClient />);
    const inputTelephone = getByPlaceholderText("Ingrese su número de teléfono") as HTMLInputElement;

    await user.type(inputTelephone, "123456789");
    expect(inputTelephone.value).toBe("123456789");

    await user.type(inputTelephone, "abc");
    expect(inputTelephone.value).toBe("123456789");
  });

  it("should have a button for submit", () => {
    const { getByRole } = render(<RegisterClient />);
    const btn = getByRole("button") as HTMLButtonElement;

    expect(btn.textContent).toBe("Guardar");
  });

  it("should show an error message when the cedula input is empty", async () => {
    const { getByPlaceholderText, getByText } = render(<RegisterClient />);
    const input = getByPlaceholderText("Ingrese su número de cédula") as HTMLInputElement;
    const btn = getByText("Guardar") as HTMLButtonElement;

    await user.clear(input);
    await user.click(btn);

    getByText("Tu cédula es requerida");
  });

  it("if a name input is empty when the form is submit, should show an error message", async () => {
    const { getByRole, getByText, getByPlaceholderText } = render(<RegisterClient />);

    const input = getByPlaceholderText("Ingrese su número de cédula") as HTMLInputElement;
    await user.type(input, "123456789");

    const btn = getByRole("button") as HTMLButtonElement;
    await user.click(btn);

    getByText("Tu nombre es requerido");
  });

  it("if a last name input is empty when the form is submit, should show an error message", async () => {
    const { getByRole, getByText, getByPlaceholderText } = render(<RegisterClient />);

    const input = getByPlaceholderText("Ingrese su número de cédula") as HTMLInputElement;
    await user.type(input, "123456789");

    const inputName = getByPlaceholderText("Ingrese su nombre") as HTMLInputElement;
    await user.type(inputName, "Juan");

    const btn = getByRole("button") as HTMLButtonElement;
    await user.click(btn);

    getByText("Tu apellido es requerido");
  });

  it("submit the form and create a new client", async () => {
    const { getByRole, getByText, getByPlaceholderText } = render(<RegisterClient />);

    const cedulaInput = getByPlaceholderText("Ingrese su número de cédula") as HTMLInputElement;
    await user.type(cedulaInput, "0987654321");

    const inputName = getByPlaceholderText("Ingrese su nombre") as HTMLInputElement;
    await user.type(inputName, "Samuel");

    const lastName = getByPlaceholderText("Ingrese su apellido") as HTMLInputElement;
    await user.type(lastName, "Bocio");

    const inputTelephone = getByPlaceholderText("Ingrese su número de teléfono") as HTMLInputElement;
    await user.type(inputTelephone, "123456789");

    const btn = getByRole("button") as HTMLButtonElement;
    await user.click(btn);

    getByText("Gracias por registrar tus datos");
    const linkToAppointments = getByText("Agendar una cita");

    await user.click(linkToAppointments);
    expect(window.location.pathname).toBe("/appointment/create");
  });

  it("should show an error message when the cedula input is not valid", async () => {
    const { getByPlaceholderText, getByText, debug } = render(<RegisterClient />);

    const input = getByPlaceholderText("Ingrese su número de cédula") as HTMLInputElement;
    await user.type(input, "123456");

    const inputName = getByPlaceholderText("Ingrese su nombre") as HTMLInputElement;
    await user.type(inputName, "Samuel");

    const lastName = getByPlaceholderText("Ingrese su apellido") as HTMLInputElement;
    await user.type(lastName, "Bocio");

    const btn = getByText("Guardar") as HTMLButtonElement;
    await user.click(btn);

    getByText("Debe tener 10 digitos");
  })
});
