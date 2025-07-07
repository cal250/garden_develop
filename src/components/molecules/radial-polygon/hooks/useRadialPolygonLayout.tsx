import { useMemo } from "react";
import { Point, RadialPolygonBoundary } from "@/components/atoms/polygon/utils";

export interface UseRadialPolygonLayoutProps {
  points: Array<Point>;
  center: Point;
  coreSize: number;
  numLayers: number;
  boundary?: RadialPolygonBoundary;
}

export function useRadialPolygonLayout({
  points,
  center,
  coreSize,
  numLayers,
}: UseRadialPolygonLayoutProps) {
  const background = useMemo(() => {
    return (
      points
        .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x},${y}`)
        .join(" ") + " Z"
    );
  }, [points]);

  const core = useMemo(() => {
    return (
      points
        .map(([x, y]) => {
          const dx = x - center[0];
          const dy = y - center[1];
          return [x - dx * (1 - coreSize), y - dy * (1 - coreSize)];
        })
        .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x},${y}`)
        .join(" ") + " Z"
    );
  }, [points, coreSize, center]);

  const radii = useMemo(() => {
    return points.reduce(
      (acc, [x, y]) => {
        return [
          ...acc,
          Array.from({ length: numLayers }).map((_, i) => {
            const dx = x - center[0];
            const dy = y - center[1];

            const x1 = x - (dx * (1 - coreSize) * i) / numLayers;
            const y1 = y - (dy * (1 - coreSize) * i) / numLayers;

            const x2 = x - (dx * (1 - coreSize) * (i + 1)) / numLayers;
            const y2 = y - (dy * (1 - coreSize) * (i + 1)) / numLayers;

            return `M ${x1},${y1} L ${x2},${y2}`;
          }),
        ];
      },
      [] as Array<Array<string>>,
    );
  }, [points, center, coreSize, numLayers]);

  const chords = useMemo(() => {
    return Array.from({
      length: coreSize === 0 ? numLayers : numLayers + 1,
    }).reduce((acc: Array<Array<string>>, _, index) => {
      return [
        ...acc,
        points.map(([x, y], i) => {
          const [x1, y1] = points[(i + 1) % points.length];
          const dx = x - center[0];
          const dy = y - center[1];

          const dx1 = x1 - center[0];
          const dy1 = y1 - center[1];

          const x2 = x - (dx * (1 - coreSize) * index) / numLayers;
          const y2 = y - (dy * (1 - coreSize) * index) / numLayers;

          const x3 = x1 - (dx1 * (1 - coreSize) * index) / numLayers;
          const y3 = y1 - (dy1 * (1 - coreSize) * index) / numLayers;

          return `M ${x2},${y2} L ${x3},${y3}`;
        }),
      ];
    }, []);
  }, [points, numLayers, center, coreSize]);

  return { background, core, radii, chords };
}
