import { useMemo } from "react";
import {
  createPolygonClipPath,
  createSVGPath,
  getBoundingBox,
  inscribedRectangle,
  normalizePointsWithStrokeInset,
  Point,
  PolygonPathsType,
} from "@/components/atoms/polygon/utils";

export type Segment = [Point, Point, Point, Point];

/**
 * Calculates polygon geometry and returns an array of line segments
 * with variable stroke width based on vertex angles
 */
export const usePolygonGeometry = (
  points: Point[],
  strokeWidths: Array<number>,
  rotation = 0,
  inscribedContent = false,
  containerWidth?: number,
  containerHeight?: number,
) => {
  return useMemo(() => {
    const {
      exteriorPoints,
      middlePoints,
      interiorPoints, // points for the content inside the polygon
      width,
      height,
    } = normalizePointsWithStrokeInset(
      points,
      strokeWidths,
      rotation,
      containerWidth,
      containerHeight,
    );

    const segments: Segment[] = middlePoints.map((point, i) => {
      const nextIndex = (i + 1) % middlePoints.length;

      return [
        exteriorPoints[i],
        interiorPoints[i],
        interiorPoints[nextIndex],
        exteriorPoints[nextIndex],
      ];
    });

    const exteriorBounds = getBoundingBox(exteriorPoints);
    const boundingBox = inscribedContent
      ? inscribedRectangle(interiorPoints)
      : getBoundingBox(interiorPoints);

    const contentBounds = {
      left: (boundingBox.x * 100) / exteriorBounds.width,
      top: (boundingBox.y * 100) / exteriorBounds.height,
      width: (boundingBox.width * 100) / exteriorBounds.width,
      height: (boundingBox.height * 100) / exteriorBounds.height,
    };

    // Calculate clip path (percentage-based coordinates)
    const clipPath = createPolygonClipPath(
      interiorPoints.map(([x, y]) => [x - boundingBox.x, y - boundingBox.y]),
      boundingBox.width,
      boundingBox.height,
    );

    const paths: Record<PolygonPathsType, string> = {
      exterior: createSVGPath(exteriorPoints),
      interior: createSVGPath(interiorPoints),
      middle: createSVGPath(middlePoints),
    };

    return {
      paths,
      segments,
      viewBox: `0 0 ${width} ${height}`,
      aspectRatio: width / height,
      clipPath,
      contentBounds,
      boundingBox,
    };
  }, [
    points,
    strokeWidths,
    rotation,
    containerWidth,
    containerHeight,
    inscribedContent,
  ]);
};
