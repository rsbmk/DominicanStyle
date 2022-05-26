/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Notifications as NotiTypes, TypesNotification } from "../../types";

type NotificationsProps = {
  setShow: React.Dispatch<React.SetStateAction<NotiTypes>>;
  notification: NotiTypes;
};

const TYPES_NOTIFICATIONS = {
  success: "text-green-400",
  error: "text-red-400",
  info: "text-blue-400",
  "": "",
};

export default function Notifications({ setShow, notification }: NotificationsProps) {
  const { message, show, type } = notification;

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow({ show: false, message: "", type: "" });
      }, 5000);
    }
  }, [show]);

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 z-20 flex items-start px-4 py-6 pointer-events-none"
    >
      <article className="w-full">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="-translate-x-full opacity-0"
        >
          <div className="w-full max-w-sm p-4 overflow-hidden bg-white border-2 border-gray-300 shadow-lg pointer-events-auto rounded-2xl">
            <p
              className={`text-base font-medium text-center ${
                TYPES_NOTIFICATIONS[type as TypesNotification]
              }`}
            >
              {message}
            </p>
          </div>
        </Transition>
      </article>
    </div>
  );
}
