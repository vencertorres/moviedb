import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, Props>(function Input(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className="block w-full rounded bg-white px-3 py-2 text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
    />
  );
});

export default Input;
