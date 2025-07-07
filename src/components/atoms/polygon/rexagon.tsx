import React from "react";
import { Polygon, PolygonProps } from "@/components/atoms/polygon/polygon";
import { generateHexagonPoints } from "@/components/atoms/polygon/utils";
import { forwardRef, PropsOf } from "@/components/utils/react/polymorphism";

interface Props extends Omit<PolygonProps, "points"> {
  /**
   * The angle of the tip of the hexagon
   * @default 45 degrees
   */
  tipAngle?: number;
}

/**
 * A hexagon that resembles a rectangle with a wedge on the left and right
 */
export const Rexagon = forwardRef<Props>(({ tipAngle = 90, ...props }, ref) => {
  return (
    <Polygon
      ref={ref}
      points={(width: number, height: number) => {
        return generateHexagonPoints({ width, height, tipAngle });
      }}
      {...props}
    />
  );
});

export type RexagonProps = PropsOf<typeof Rexagon>;
