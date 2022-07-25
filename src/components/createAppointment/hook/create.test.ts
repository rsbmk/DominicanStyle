import { renderHook, act } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { useCreateAppointment } from "./create";

describe("useCreateAppointment", () => {
  it("Error employeId empty", async () => {
    const { result } = renderHook(() => useCreateAppointment({ setIsOpen: () => null }));

    const setNotification = () => null;
    const formData = new FormData();

    await act(() => {
      result.current.handleCreateAppointmentSubmit(formData, setNotification);
    });

    expect(result.current.someError).toStrictEqual({
      message: "Seleccione un empleado",
      nameInput: "employeeId",
    });
  });

  // it("Error serviceId empty", async () => {
  //   const { result } = renderHook(() => useCreateAppointment({ setIsOpen: () => null }));

  //   const setNotification = () => null;
  //   const formData = new FormData();

  //   await act(async () => {
  //     await result.current.setEmployeeIdSelected(1);
  //     await result.current.handleCreateAppointmentSubmit(formData, setNotification);
  //   });

  //   expect(result.current.someError).toStrictEqual({
  //     message: "Seleccione un servicio",
  //     nameInput: "serviceId",
  //   });
  // });
});
