import { getDistance, Point } from "@/components/atoms/polygon/utils";

export interface UseWedgeProps {
  center: Point;
  point: Point;
  nextPoint: Point;
  coreSize: number;
}

export function useWedge({
  center,
  point,
  nextPoint,
  coreSize,
}: UseWedgeProps) {
  const [x, y] = point;
  const [x1, y1] = nextPoint;
  const sideLength = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
  const area =
    Math.abs(
      x * (y1 - center[1]) + x1 * (center[1] - y) + center[0] * (y - y1),
    ) / 2;
  const wedgeHeight = (2 * area) / sideLength;
  const rotation = Math.atan2(y - y1, x - x1);
  const sideB = getDistance(center, [x1, y1]);
  const sideC = getDistance(center, [x, y]);
  // calculate the angle at x,y using the law of cosines
  const xyAngle = Math.acos(
    (sideLength ** 2 + sideC ** 2 - sideB ** 2) / (2 * sideLength * sideC),
  );

  const x1y1Angle = Math.acos(
    (sideLength ** 2 + sideB ** 2 - sideC ** 2) / (2 * sideLength * sideB),
  );

  const centerAngle = Math.PI - xyAngle - x1y1Angle;

  const layerHeight = wedgeHeight - wedgeHeight * coreSize;

  const points: Array<Point> = [
    [0, wedgeHeight],
    [sideLength, wedgeHeight],
    [sideLength - layerHeight / Math.tan(xyAngle), wedgeHeight * coreSize],
    [layerHeight / Math.tan(x1y1Angle), wedgeHeight * coreSize],
  ];

  return {
    height: wedgeHeight,
    rotation: (rotation * 180) / Math.PI,
    width: sideLength,
    points,
    layerHeight,
    clipPath: `polygon(${points.map(([x, y]) => `${x}px ${y}px`).join(", ")})`,
    centerAngle: centerAngle * (180 / Math.PI),
    xyAngle: xyAngle * (180 / Math.PI),
    x1y1Angle: x1y1Angle * (180 / Math.PI),
  };
}
