import { describe, expect, it } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import Appointment from "@/pages/appointment";

describe.skip("appointment", () => {
  it("render appointment", () => {
    const { getByText, getByLabelText } = render(<Appointment />);
    expect(getByText("Citas del día")).toBeTruthy();

    const createAppointmentButton = getByLabelText("create appointment");
    const isClickCreateAppointment = fireEvent.click(createAppointmentButton);
    expect(isClickCreateAppointment).toBeTruthy();
  });
});
