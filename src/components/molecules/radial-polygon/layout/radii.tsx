import React from "react";
import {
  BoundaryProps,
  compact,
  createBoundary,
  WedgeData,
} from "@/components/atoms/polygon/utils";
import { twMerge } from "tailwind-merge";

function generateBorder(props: RadiiProps, i: number, j: number) {
  const { data } = props;

  const wedgeBoundary = createBoundary(data?.[i]?.boundary || {}, false);
  const previousWedgeBoundary = createBoundary(
    data?.[i === 0 ? props.radii.length - 1 : i - 1]?.boundary || {},
    false,
  );

  const segmentBoundary = createBoundary(
    data?.[i]?.segments?.[j]?.boundary || {},
    false,
  );
  const adjacentSegmentBoundary = createBoundary(
    data?.[i === 0 ? props.radii.length - 1 : i - 1]?.segments?.[j]?.boundary ||
      {},
    false,
  );
  return {
    ...compact(props.boundary),
    ...compact(wedgeBoundary?.left),
    ...compact(previousWedgeBoundary?.right),
    ...compact(adjacentSegmentBoundary?.left),
    ...compact(segmentBoundary?.right),
  };
}

export const Radii: React.FC<RadiiProps> = (props) => {
  const { radii } = props;
  return (
    <React.Fragment>
      {radii.map((rWedge, i) => {
        return (
          <React.Fragment key={i}>
            {rWedge
              .map((rLayer, j) => ({
                rLayer,
                config: generateBorder(props, i, j),
              }))
              .sort((a, b) => (a.config.zIndex || 0) - (b.config.zIndex || 0))
              .map(({ rLayer, config }, j) => {
                return (
                  <path
                    key={j}
                    d={rLayer}
                    fill="none"
                    {...config}
                    className={twMerge("z-0", config.className)}
                  />
                );
              })}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

interface RadiiProps {
  radii: Array<Array<string>>;
  boundary?: BoundaryProps;
  data?: Array<WedgeData>;
}
