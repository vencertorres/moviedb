import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

const FormItem = forwardRef<HTMLDivElement, Props>(
  function FormItem(props, ref) {
    const { children, ...rest } = props;

    return (
      <div {...rest} ref={ref} className="mt-4 space-y-1 first:mt-0">
        {children}
      </div>
    );
  },
);

export default FormItem;
