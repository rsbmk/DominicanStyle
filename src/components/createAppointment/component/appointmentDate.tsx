import { ErrorMessage } from "@/components/errorMessage";

type Props = {
  name: string;
  messageError: string;
  inputHasError: string;
}

export function AppointmentDateSelect({ name, messageError, inputHasError }: Props) {
  return (
    <div>
      <label aria-label="appointmentDate" className="flex gap-2">
        <span>Cuando deseas tu cita:</span>
        <input
          defaultValue={undefined}
          type={"datetime-local"}
          name={name}
          className="font-normal border-b-2 border-blue-300"
        />
      </label>
      {inputHasError === name && <ErrorMessage message={messageError} />}
    </div>
  )
}