import { useSpinner, UseSpinnerProps } from "./use-spinner";
import { forwardRef } from "@/components/utils/react/polymorphism";

export interface SpinnerProps extends UseSpinnerProps {}

const Spinner = forwardRef<SpinnerProps>((props, ref) => {
  const { slots, classNames, label, getSpinnerProps } = useSpinner({
    ...props,
  });

  return (
    <div ref={ref} {...getSpinnerProps()}>
      <div className={slots.wrapper({ class: classNames?.wrapper })}>
        <i className={slots.circle1({ class: classNames?.circle1 })} />
        <i className={slots.circle2({ class: classNames?.circle2 })} />
      </div>
      {label && (
        <span className={slots.label({ class: classNames?.label })}>
          {label}
        </span>
      )}
    </div>
  );
});

Spinner.displayName = "Spinner";

export default Spinner;
