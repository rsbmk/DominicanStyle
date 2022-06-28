import { describe, expect, it } from "vitest";
import { render, fireEvent } from "@testing-library/react";
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

describe.only("Home", () => {
  it("renderiza el ListBoxSelect", () => {
    const { getByText, getByLabelText } = render(
      <ListboxSelect
        hasError={false}
        optionList={EmployeeList}
        placeholder="Selecciona un empleado"
        setIdSelected={() => null}
      />
    );

    expect(getByText("Selecciona un empleado")).toBeTruthy();

    const button = getByLabelText("select employe");
    fireEvent.click(button);

    const nameEmploye = getByText("Roberto Melo");
    expect(nameEmploye).toBeTruthy();
  });
});
