import React from "react";
import {
  RegularPolygon,
  RegularPolygonProps,
} from "@/components/atoms/polygon/regular-polygon";
import { forwardRef } from "@/components/utils/react/polymorphism";

export interface RegularHexagonProps
  extends Omit<RegularPolygonProps, "sides"> {}

/**
 * A regular hexagon component that renders with 6 equal sides.
 * @param props
 */
export const RegularHexagon = forwardRef<RegularHexagonProps>((props, ref) => {
  return <RegularPolygon sides={6} {...props} ref={ref} />;
});
