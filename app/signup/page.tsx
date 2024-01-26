import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import Form from "./Form";

export default async function Register() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-[30rem] p-[var(--padding)]">
      <h1 className="mb-8 text-center text-3xl font-semibold">Sign up</h1>

      <Form />
    </main>
  );
}
