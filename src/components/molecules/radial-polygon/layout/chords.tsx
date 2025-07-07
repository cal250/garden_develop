import React from "react";
import {
  compact,
  createBoundary,
  RadialPolygonBoundary,
  WedgeData,
} from "@/components/atoms/polygon/utils";

function getChordBorder(
  { chords, data, boundary }: ChordsProps,
  i: number,
  j: number,
) {
  const wedgeBoundary = createBoundary(data?.[j]?.boundary || {}, false);
  if (i === 0)
    return { ...compact(boundary?.outer), ...compact(wedgeBoundary?.outer) };
  if (i === chords.length - 1)
    return { ...compact(boundary?.inner), ...compact(wedgeBoundary?.inner) };
  return boundary?.chord;
}

function generateBorder(props: ChordsProps, i: number, j: number) {
  const { data } = props;
  const border = getChordBorder(props, i, j);

  const segmentBoundary = createBoundary(
    data?.[j]?.segments?.[i]?.boundary || {},
    false,
  );
  const adjacentSegmentBoundary = createBoundary(
    data?.[j]?.segments[i - 1]?.boundary || {},
    false,
  );

  return {
    ...compact(border),
    ...compact(adjacentSegmentBoundary?.inner),
    ...compact(segmentBoundary?.outer),
  };
}

export const Chords: React.FC<ChordsProps> = (props) => {
  const { chords } = props;
  return (
    <React.Fragment>
      {chords.map((cLayer, i) => {
        return (
          <React.Fragment key={i}>
            {cLayer
              .map((cWedge, j) => ({
                cWedge,
                config: generateBorder(props, i, j),
              }))
              .sort((a, b) => (a.config.zIndex || 0) - (b.config.zIndex || 0))
              .map(({ cWedge, config }, j) => {
                return (
                  <path
                    key={`${i}-${j}`}
                    d={cWedge}
                    fill="none"
                    strokeLinecap="round"
                    {...config}
                  />
                );
              })}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

interface ChordsProps {
  chords: Array<Array<string>>;
  boundary?: RadialPolygonBoundary;
  data?: Array<WedgeData>;
}
