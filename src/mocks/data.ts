import { Client, getEmployeeType } from "@/types";

export const clientDataMock: Client = {
  cedula: "1757646805",
  name: "Kerobe",
  last_name: "Melo",
  telephone: "093569846",
  createAt: new Date("2022-08-20T17:58:06.000Z"),
};

export const employeesDataMock: getEmployeeType[] = [
  {
    id: 12,
    name: "Roberto",
    last_name: "Bocio",
    telephone: "0987654321",
    createAt: new Date("2022-08-14T16:26:57.000Z"),
    address: null,
    company_id: 1,
    Employee_Team: [
      {
        id: 2,
        team_id: 1,
        employee_id: 12,
        Team: {
          id: 1,
          name: "Barberia",
          createAt: new Date("2022-08-14T02:02:56.000Z"),
          Service: [
            {
              id: 1,
              name: "Corte",
              createAt: new Date("2022-08-20T12:55:48.000Z"),
              team_id: 1,
              price: 10,
            },
            {
              id: 2,
              name: "Barba",
              createAt: new Date("2022-08-20T13:04:36.000Z"),
              team_id: 1,
              price: 5,
            },
          ],
        },
      },
      {
        id: 3,
        team_id: 2,
        employee_id: 12,
        Team: {
          id: 2,
          name: "Manicurista",
          createAt: new Date("2022-08-14T02:04:52.000Z"),
          Service: [
            {
              id: 3,
              name: "Manicura",
              createAt: new Date("2022-08-20T13:05:47.000Z"),
              team_id: 2,
              price: 6,
            },
          ],
        },
      },
    ],
  },
  {
    id: 13,
    name: "Kerobe",
    last_name: "Melo",
    telephone: "0943234567",
    createAt: new Date("2022-09-11T13:42:49.000Z"),
    address: null,
    company_id: 1,
    Employee_Team: [
      {
        id: 4,
        team_id: 2,
        employee_id: 13,
        Team: {
          id: 2,
          name: "Manicurista",
          createAt: new Date("2022-08-14T02:04:52.000Z"),
          Service: [
            {
              id: 3,
              name: "Manicura",
              createAt: new Date("2022-08-20T13:05:47.000Z"),
              team_id: 2,
              price: 6,
            },
          ],
        },
      },
    ],
  }
];
