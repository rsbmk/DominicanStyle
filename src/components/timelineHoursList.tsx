import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const WORKING_HOURS = 24;

export function TimelimeHoursList() {
  const [hourOfDayList, setHourOfDayList] = useState<string[]>([]);

  useEffect(() => {
    for (let index = 0; index < WORKING_HOURS; index++) {
      setHourOfDayList((preState) => [
        ...preState,
        DateTime.now()
          .set({ hour: 0 + index, minute: 0 })
          .toFormat("HH"),
      ]);
    }

    return () => setHourOfDayList([]);
  }, []);

  return (
    <ul className="space-y-2">
      {hourOfDayList.map((hour, i) => {
        const isNow = DateTime.now().toFormat("HH") === hour;
        return (
          <li
            key={i}
            className={`flex items-center gap-4 ${
              isNow ? "text-red-500 font-medium" : "text-gray-600"
            }`}
          >
            {hour}:00
            <p
              className={`w-full border-b-2 border-opacity-50 ${
                isNow ? "border-red-500" : "border-gray-400"
              }`}
            ></p>
          </li>
        );
      })}
    </ul>
  );
}
