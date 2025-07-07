import {
  useRadialPolygonGeometry,
  UseRadialPolygonGeometryProps,
} from "@/components/molecules/radial-polygon/hooks/useRadialPolygonGeometry";
import { useMemo } from "react";

export type UseRadialPolygonProps = UseRadialPolygonGeometryProps & {
  /**
   * Configuration for the core of the polygon
   */
  coreSize?: number;
};

export function useRadialPolygon({
  coreSize = 0,
  width,
  points: originalPoints,
  height,
  boundary,
  sides,
  rotation,
}: UseRadialPolygonProps) {
  const { points, center, border, contentWidth, contentHeight } =
    useRadialPolygonGeometry({
      width,
      boundary,
      points: originalPoints,
      height,
      sides,
      rotation,
    });

  const coreStrokeWidth = boundary?.inner?.strokeWidth || 0;

  const coreProps = useMemo(() => {
    const centerXRatio = center[0] / width;
    const centerYRatio = center[1] / height;
    return {
      strokeWidth: coreStrokeWidth,
      stroke: "none",
      points,
      fill: "transparent",
      overflow: false,
      className: "flex items-center justify-center",
      style: {
        zIndex: 3,
        position: "absolute" as const,
        left: center[0] - (contentWidth + border * 2) * coreSize * centerXRatio,
        top: center[1] - (contentHeight + border * 2) * coreSize * centerYRatio,
        width: contentWidth * coreSize,
        height: contentHeight * coreSize,
      },
    };
  }, [
    points,
    contentWidth,
    contentHeight,
    coreSize,
    coreStrokeWidth,
    border,
    center,
    width,
    height,
  ]);

  return {
    points,
    center,
    border,
    coreSize,
    contentWidth,
    contentHeight,
    coreStrokeWidth,
    coreProps,
  };
}
