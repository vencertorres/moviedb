"use client";

import { useFormState } from "react-dom";
import Button from "../components/Button";
import { logIn } from "../lib/actions";

export default function Form() {
  const [error, formAction] = useFormState(logIn, undefined);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email" className="block font-sans text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className="mt-1 block w-full rounded bg-white px-3 py-2 text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="mt-4">
        <label
          htmlFor="password"
          className="block font-sans text-sm font-medium"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          className="mt-1 block w-full rounded bg-white px-3 py-2 text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        />
      </div>

      <Button full>Log in</Button>
    </form>
  );
}
