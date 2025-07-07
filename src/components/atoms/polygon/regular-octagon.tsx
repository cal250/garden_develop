import React from "react";
import {
  RegularPolygon,
  RegularPolygonProps,
} from "@/components/atoms/polygon/regular-polygon";
import { forwardRef } from "@/components/utils/react/polymorphism";

export const RegularOctagon = forwardRef<RegularOctagonProps>((props, ref) => (
  <RegularPolygon sides={8} {...props} ref={ref} />
));

export interface RegularOctagonProps
  extends Omit<RegularPolygonProps, "sides"> {}
