export function ErrorMessage({ message, className }: { message: string, className?: string }) {
  return (
    <p className={`text-sm italic text-red-400 ${className}`}>{message}</p>
  );
}