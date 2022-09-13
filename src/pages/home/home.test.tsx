import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "./home";

const user = userEvent.setup()

describe("Page Home", () => {
  afterEach(cleanup);

  it("should render and catch the titile", () => {
    render(<Home />);
    screen.getByLabelText("logo");
  });

  it('should navigate to create appointment page', async () => {
    render(<Home />);
    const appointmentLink = screen.getByText('Agendar cita');
    await user.click(appointmentLink)
    expect(window.location.pathname).toBe('/appointment')
  })

  it('should navigate to employee login page', async () => {
    render(<Home />);
    const employeeLink = screen.getByText('¿Eres empleado? inicia sesión');
    await user.click(employeeLink)
    expect(window.location.pathname).toBe('/employee/login')
  })
});
