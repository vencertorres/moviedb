import { useFormStatus } from "react-dom";

export default function Button({
  children,
  full,
}: {
  children: React.ReactNode;
  full?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`mt-6 rounded bg-sky-500 p-3 font-sans font-medium hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-500 ${full ? " w-full" : "w-full lg:w-auto"}`}
      disabled={pending}
    >
      {children}
    </button>
  );
}
