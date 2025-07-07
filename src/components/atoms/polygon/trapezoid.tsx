import React, { useCallback } from "react";
import { Polygon, PolygonProps } from "@/components/atoms/polygon/polygon";
import { Point } from "@/components/atoms/polygon/utils";
import { forwardRef } from "@/components/utils/react/polymorphism";

export const Trapezoid = forwardRef<TrapezoidProps>(
  ({ slopeAngle = 45, inverted = false, ...props }, ref) => {
    const slope = {
      left:
        typeof slopeAngle === "number" ? slopeAngle : (slopeAngle?.left ?? 0),
      right:
        typeof slopeAngle === "number" ? slopeAngle : (slopeAngle?.right ?? 0),
    };

    const getPoints = useCallback(
      (width: number, height: number) => {
        const yPosition = height;

        const leftXPosition = Math.min(
          yPosition * Math.tan((slope.left * Math.PI) / 180),
          width * 0.45,
        );
        const rightXPosition = Math.min(
          yPosition * Math.tan((slope.right * Math.PI) / 180),
          width * 0.45,
        );

        return [
          [0, height],
          [width, height],
          [width - rightXPosition, 0],
          [leftXPosition, 0],
        ] as Array<Point>;
      },
      [slopeAngle],
    );

    return (
      <Polygon
        points={getPoints}
        rotation={inverted ? 180 : 0}
        {...props}
        ref={ref}
      />
    );
  },
);

export interface TrapezoidProps extends Omit<PolygonProps, "points"> {
  /**
   * The angle of the sloping sides on the left and right. 90 degrees makes it a rectangle.
   * @default 45
   */
  slopeAngle?: number | { left?: number; right?: number };

  /**
   * Inverts the trapezoid so that the sloping sides are on the bottom.
   */
  inverted?: boolean;
}
