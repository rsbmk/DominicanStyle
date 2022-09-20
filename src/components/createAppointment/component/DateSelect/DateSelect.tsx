import { ErrorMessage } from "@/components/errorMessage";

type Props = {
  name: string;
  messageError: string;
  inputHasError: string;
  placeholder?: string;
}

export function DateSelect({ name, messageError, inputHasError, placeholder = 'dd/mm/aaaa hh:mm' }: Props) {
  return (
    <div>
      <label aria-label="appointmentDate" className="flex gap-2">
        <span>Cuando deseas tu cita:</span>
        <input
          placeholder={placeholder}
          defaultValue={undefined}
          type={"datetime-local"}
          name={name}
          className="font-normal border-b-2 border-blue-300 focus-within:outline-blue-200"
        />
      </label>
      {inputHasError === name && <ErrorMessage message={messageError} />}
    </div>
  )
}