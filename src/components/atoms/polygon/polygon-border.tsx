import React from 'react'
import { Segment } from '@/components/atoms/polygon/hooks/use-polygon-geometry'
import { BoundaryProps, PolygonPathsType } from '@/components/atoms/polygon/utils'
import { useUniqueId } from '@/hooks/use-unique-id'

export const PolygonBorder: React.FC<PolygonBorderProps> = ({
  viewBox,
  paths,
  segments,
  borders,
  stroke,
}) => {
  const polygonId = useUniqueId()
  return (
    <svg
      className="absolute left-0 top-0 pointer-events-none  h-full w-full"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <mask id={`stroke-mask-${polygonId}`}>
          <path d={paths.exterior} fill="white" stroke="none" />
          <path d={paths.interior} fill="black" stroke="none" />
        </mask>
        <filter id={`shadow-${polygonId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="20" dy="20" stdDeviation="10" floodColor="rgba(0, 0, 0, 0.5)" />
        </filter>
      </defs>
      <g>
        <path
          d={paths.exterior}
          fill={stroke}
          stroke="none"
          filter={`url(#shadow-${polygonId})`}
          mask={`url(#stroke-mask-${polygonId})`}
        />
      </g>
      {segments.map((segment, i) => (
        <path
          key={i}
          d={`M ${segment[0].join(' ')} L ${segment[1].join(' ')} L ${segment[2].join(' ')} L ${segment[3].join(' ')} Z`}
          fill={borders[i].stroke}
          {...borders[i]}
          strokeWidth={0}
        />
      ))}
    </svg>
  )
}

export interface PolygonBorderProps {
  viewBox: string
  paths: Record<PolygonPathsType, string>
  segments: Array<Segment>
  borders: Array<BoundaryProps>
  stroke: string
}
