export function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="text-sm italic text-red-400">{message}</p>
  );
}