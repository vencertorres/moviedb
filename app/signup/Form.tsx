"use client";

import { useFormState } from "react-dom";
import Button from "../components/ui/Button";
import FormItem from "../components/ui/FormItem";
import Input from "../components/ui/Input";
import InputError from "../components/ui/InputError";
import Label from "../components/ui/Label";
import { signUp } from "../lib/actions";

const initialState = {
  errors: {
    email: undefined,
    password: undefined,
  },
};

export default function Form() {
  const [state, formAction] = useFormState(signUp, initialState);

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
        {state.errors.email && <InputError>{state.errors.email}</InputError>}
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
        {state.errors.password && (
          <InputError>{state.errors.password}</InputError>
        )}
      </FormItem>

      <Button className="mt-6 w-full">Log in</Button>
    </form>
  );
}
