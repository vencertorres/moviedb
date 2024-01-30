import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"p">;

const InputError = forwardRef<HTMLParagraphElement, Props>(
  function InputError(props, ref) {
    const { children, ...rest } = props;

    return (
      <p {...rest} ref={ref} className="font-sans text-sm text-red-500">
        {children}
      </p>
    );
  },
);

export default InputError;
