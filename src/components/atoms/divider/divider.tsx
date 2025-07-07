import { useDivider, UseDividerProps } from "./use-divider";
import { forwardRef } from "@/components/utils/react/polymorphism";

export interface DividerProps extends Omit<UseDividerProps, "children"> {}

const Divider = forwardRef<DividerProps, "hr">((props, ref) => {
  const { Component, getDividerProps } = useDivider({ ...props });

  return <Component ref={ref} {...getDividerProps()} />;
}, "hr");

Divider.displayName = "Divider";

export default Divider;
