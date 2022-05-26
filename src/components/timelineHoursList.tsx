import { useEffect, useState } from "react";
import dayjs from "dayjs";

const HOURS_OF_WORK = 24;

export function TimelimeHoursList() {
  const [hourOfDayList, setHourOfDayList] = useState<string[]>([]);

  useEffect(() => {
    const hourOfDayList = [...Array(HOURS_OF_WORK).keys()].map((hour) => {
      return dayjs().hour(hour).minute(0).format("HH:mm");
    });
    setHourOfDayList(hourOfDayList);

    return () => setHourOfDayList([]);
  }, []);

  return (
    <ul className="space-y-2">
      {hourOfDayList.map((hour, i) => {
        const isNow = dayjs().minute(0).format("HH:mm") === hour;
        return (
          <li
            key={i}
            className={`flex items-center gap-4 ${
              isNow ? "text-red-500 font-medium" : "text-gray-600"
            }`}
          >
            {hour}
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
