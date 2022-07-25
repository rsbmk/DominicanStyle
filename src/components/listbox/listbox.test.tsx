import userEvent from "@testing-library/user-event";
import { cleanup, render } from "@testing-library/react";

import { afterEach, describe, expect, it, vi } from "vitest";
import { ListboxSelect } from "@/components/listbox/listbox";
import { Employee } from "@/types";

const EmployeeList: Employee[] = [
  {
    id: 1,
    createdAt: "2022-05-29T04:41:26.981Z",
    name: "Roberto Melo",
    phone: "54587",
    address: "Avenida flavio reyes",
    teamId: 1,
    service: [
      {
        service: {
          id: 1,
          createAt: "2022-05-29T04:26:46.291Z",
          name: "Corte",
          price: 10,
          description: "Corte para caballeros y niños",
        },
      },
      {
        service: {
          id: 2,
          createAt: "2022-05-29T04:27:32.106Z",
          name: "Barba",
          price: 5,
          description: "Arreglo de barba",
        },
      },
    ],
    team: { id: 1, createAt: "2022-05-29T04:23:21.696Z", name: "Barbería" },
  },
];
const user = userEvent.setup();

const mockhandleSelect = vi.fn();

afterEach(cleanup);

describe("Home", () => {
  it("renderiza el ListBoxSelect", async () => {
    const { getByText, getByLabelText } = render(
      <ListboxSelect
        hasError={false}
        optionList={EmployeeList}
        placeholder="Selecciona un empleado"
        setIdSelected={mockhandleSelect}
      />
    );

    expect(getByText("Selecciona un empleado")).toBeTruthy();

    const button = getByLabelText("select");
    expect(button).toBeTruthy();
    await user.click(button);

    const nameEmploye = getByText("Roberto Melo");
    expect(nameEmploye).toBeTruthy();

    await user.click(nameEmploye);
    const employeSelected = button.firstChild as HTMLSpanElement;
    expect(employeSelected.innerHTML).toBe("Roberto Melo");
  });

  it("renderiza el ListBoxSelect con error", async () => {
    const { getByText, getByLabelText } = render(
      <ListboxSelect
        hasError={true}
        optionList={EmployeeList}
        placeholder="Selecciona un empleado"
        setIdSelected={() => null}
      />
    );

    expect(getByText("Selecciona un empleado")).toBeTruthy();

    const button = getByLabelText("select");
    const classnameError = button.className.includes("border-red-500 bg-red-50 bg-opacity-50");
    expect(classnameError).toBeTruthy();
  });
});
