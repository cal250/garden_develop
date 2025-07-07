import {
  getPolygonPoints,
  normalizePoints,
  Point,
  RadialPolygonBoundary,
  Sides,
} from "@/components/atoms/polygon/utils";
import { useMemo } from "react";

export interface UseRadialPolygonGeometryProps {
  /**
   * Width of the polygon
   */
  width: number;
  /**
   * Height of the polygon.
   */
  height: number;

  /**
   * The style of the boundary
   */
  boundary?: RadialPolygonBoundary;

  /**
   * A custom set of points to use for the polygon
   */
  points?: Array<Point>;

  /**
   * Number of sides in the polygon
   */
  sides?: Sides;

  /**
   * Rotation of the polygon in degrees
   * @default 0
   */
  rotation?: number;
}

export function useRadialPolygonGeometry({
  points,
  sides,
  width,
  height,
  boundary,
  rotation = 0,
}: UseRadialPolygonGeometryProps) {
  const border = boundary?.outer?.strokeWidth || 0;
  const {
    points: normalizedPoints,
    center,
    width: contentWidth,
    height: contentHeight,
  } = useMemo(() => {
    const polygonPoints = points
      ? points
      : sides
        ? getPolygonPoints(sides)
        : [];

    return normalizePoints(
      polygonPoints,
      width - border * 2,
      height - border * 2,
      rotation,
    );
  }, [points, sides, width, height, rotation]);

  return {
    points: normalizedPoints,
    center,
    border,
    contentWidth,
    contentHeight,
  };
}
