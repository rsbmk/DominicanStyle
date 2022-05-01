import React from "react";

import { CreateAppointment } from "../components/createAppointment";
import { TimelimeHoursList } from "../components/timelineHoursList";

export function Appointment() {
  return (
    <main className="p-2">
      <h1 className="mt-8 mb-4 text-3xl font-semibold text-center text-blue-500">Citas del día</h1>
      <section className="mb-4 transition-all">
        <CreateAppointment />
      </section>
      <TimelimeHoursList />
    </main>
  );
}
