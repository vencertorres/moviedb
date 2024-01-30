"use client";

import { useFormState } from "react-dom";
import Button from "../components/ui/Button";
import FormItem from "../components/ui/FormItem";
import Input from "../components/ui/Input";
import InputError from "../components/ui/InputError";
import Label from "../components/ui/Label";
import { logIn } from "../lib/actions";

export default function Form() {
  const [error, formAction] = useFormState(logIn, undefined);

  return (
    <form action={formAction}>
      <FormItem>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          required
        />
        {error && <InputError>{error}</InputError>}
      </FormItem>

      <FormItem>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          required
        />
      </FormItem>

      <Button className="mt-6 w-full">Log in</Button>
    </form>
  );
}
