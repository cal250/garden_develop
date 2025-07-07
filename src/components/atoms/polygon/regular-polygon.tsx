import React from "react";
import { Polygon, PolygonProps } from "./polygon";
import { getPolygonPoints, Sides } from "./utils";
import { forwardRef } from "@/components/utils/react/polymorphism";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<PolygonProps, "points"> {
  /**
   * Number of sides in the polygon
   */
  sides: Sides;
}

export const RegularPolygon = forwardRef<Props>(({ sides, ...props }, ref) => {
  return (
    <Polygon
      ref={ref}
      points={(width: number, height: number) =>
        getPolygonPoints(
          sides,
          Math.max(width, height),
          Math.max(width, height),
        )
      }
      {...props}
      className={twMerge("aspect-square", props.className)}
    />
  );
});

export type RegularPolygonProps = React.ComponentProps<typeof RegularPolygon>;
