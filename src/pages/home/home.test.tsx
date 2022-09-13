import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "./home";

describe("Page Home", () => {
  afterEach(cleanup);

  it("should render and catch the titile", () => {
    render(<Home />);
    screen.getByLabelText("logo");
  });

  it('should navigate to create appointment page', async () => {
    render(<Home />);
    const appointmentLink = screen.getByText('Agendar cita');
    await userEvent.click(appointmentLink)
    expect(window.location.pathname).toBe('/appointment')
  })

  it('should navigate to employee login page', async () => {
    render(<Home />);
    const employeeLink = screen.getByText('¿Eres empleado? inicia sesión');
    await userEvent.click(employeeLink)
    expect(window.location.pathname).toBe('/employee/login')
  })
});
