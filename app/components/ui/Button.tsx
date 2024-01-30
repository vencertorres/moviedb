import { useFormStatus } from "react-dom";

import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

const Button = forwardRef<HTMLButtonElement, Props>(
  function Button(props, ref) {
    const { className, children, disabled, ...rest } = props;

    const { pending } = useFormStatus();

    const classname =
      "rounded bg-sky-500 p-3 font-sans font-medium hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-500 " +
      className;

    return (
      <button {...rest} ref={ref} className={classname} disabled={pending}>
        {children}
      </button>
    );
  },
);

export default Button;
