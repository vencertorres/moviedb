import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"label">;

const Label = forwardRef<HTMLLabelElement, Props>(function Label(props, ref) {
  const { children, ...rest } = props;

  return (
    <label {...rest} ref={ref} className="block font-sans text-sm font-medium">
      {children}
    </label>
  );
});

export default Label;
