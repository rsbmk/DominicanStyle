import { lazy, Suspense, useState } from "react";

import { CrossPlusIcon } from "@/icons/cross";
import { Notifications as NotificationsTypes } from "@/types";

const CreateAppointmentModla = lazy(
  () => import("@/components/createAppointment/createAppointmentModal")
);
const Notifications = lazy(() => import("@/components/modals/notifications"));

export function CreateAppointment() {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationsTypes>({
    show: false,
    message: "",
    type: "",
  });

  return (
    <>
      <Suspense fallback={null}>
        {notification.show && (
          <Notifications notification={notification} setShow={setNotification} />
        )}
      </Suspense>

      <button
        aria-label="create appointment"
        onClick={() => setIsOpen(true)}
        className="font-medium button"
      >
        Agendar cita
        <CrossPlusIcon width={16} height={16} />
      </button>

      <Suspense fallback={null}>
        {isOpen && <CreateAppointmentModla modalProps={{ isOpen, setIsOpen, setNotification }} />}
      </Suspense>
    </>
  );
}
