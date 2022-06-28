import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

export function Schedule({ hour }: { hour: string }) {
  const isNow = dayjs().minute(0).format("HH") === hour;
  const isLessTime = dayjs().isSameOrBefore(dayjs().hour(Number(hour)), "hour");

  const [status, bgColor] = isLessTime ? ["Abierta", "bg-green-400"] : ["Cerrada", "bg-red-400"];

  return (
    <article
      className={`pl-2 py-2 w-full flex gap-8 text-gray-500 border-2 rounded-xl border-opacity-50 ${
        isNow ? "border-red-500" : "border-gray-400"
      }`}
    >
      <div>
        <h3 className="font-medium text-blue-500">Roberto</h3>
        <p className="text-sm">093559245</p>
      </div>
      <div>
        <p>
          Corte
          <span className="text-lg text-blue-400"> $10</span>
        </p>
        <p>
          {status} <span className={`inline-block w-2 h-2  rounded-full ${bgColor}`}></span>
        </p>
      </div>
    </article>
  );
}
