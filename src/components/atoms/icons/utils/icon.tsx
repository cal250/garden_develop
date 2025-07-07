import React from "react";
import { forwardRef, PropsOf } from "@/components/utils/react/polymorphism";

type Props = {};

export const Icon = forwardRef<Props, "svg">(({ ...props }, ref) => {
  return <svg {...props} ref={ref} />;
});

export type IconProps = PropsOf<typeof Icon>;
