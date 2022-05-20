import { lazy, Suspense, useState } from "react";
import { CrossPlusIcon } from "../../icons/cross";

const CreateAppointmentModla = lazy(() => import("./createAppointmentModal"));

export function CreateAppointment() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="font-medium button">
        Agendar cita
        <CrossPlusIcon width={16} height={16} />
      </button>

      <Suspense fallback={null}>
        {isOpen ? <CreateAppointmentModla modalProps={{ isOpen, setIsOpen }} /> : null}
      </Suspense>
    </>
  );
}
