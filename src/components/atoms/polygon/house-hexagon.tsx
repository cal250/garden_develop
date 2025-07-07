import React, { useCallback } from 'react'
import { Polygon, PolygonProps } from '@/components/atoms/polygon/polygon'
import { computeLength, Point } from '@/components/atoms/polygon/utils'
import { forwardRef, PropsOf } from '@/components/utils/react/polymorphism'
import { useDesignContext } from '@/hooks/use-design-context'

interface Props extends Omit<PolygonProps, 'points'> {
  /**
   * The angle of the roof in degrees. Minimum value is 0. Setting this to 0 will result in a flat roof. (A rectangle)
   * @default 30
   */
  roofAngle?: number

  /**
   * The width of the roof. If the value is between 0 and 1, it will be treated as a percentage of the width of the hexagon.
   * @default 0.3
   */
  roofWidth?: number

  /**
   * Inverts the hexagon so that the roof is at the bottom. This will rotate the hexagon by 180 degrees.
   * @default false
   */
  inverted?: boolean

  /**
   * The height of the roof. If the value is between 0 and 1, it will be treated as a percentage of the height of the hexagon.
   * If the roofHeight is set, the roofAngle will be ignored.
   */
  roofHeight?: number

  /**
   * If true, the roof will be mirrored at the bottom.
   * @default false
   */
  mirrored?: boolean

  door?: { width: number; height: number }
}

function computeShape(
  roofAngle: number,
  roofWidth: number,
  width: number,
  height: number,
  roofHeight?: number,
  mirrored?: boolean,
  door?: { width: number; height: number },
): Array<Point> {
  const roofWidthPx = computeLength(roofWidth, width)
  const halfRoofWidth = (width - roofWidthPx) / 2

  // Compute roof height from angle if not explicitly given
  let roofHeightPx =
    roofHeight !== undefined
      ? computeLength(roofHeight, height)
      : Math.tan((roofAngle * Math.PI) / 180) * halfRoofWidth

  // Ensure roof height does not exceed total height
  roofHeightPx = Math.min(height, roofHeightPx)

  // Define the top part of the hexagon
  const topPoints: Array<Point> = [
    [0, roofHeightPx],
    [halfRoofWidth, 0],
    [width - halfRoofWidth, 0],
    [width, roofHeightPx],
  ]

  let bottomPoints: Array<Point> = []

  if (mirrored) {
    // Reflect the top part for the bottom if mirrored
    bottomPoints = [
      [width, height - roofHeightPx],
      [width - halfRoofWidth, height],
      [halfRoofWidth, height],
      [0, height - roofHeightPx],
    ]
  } else {
    // Normal hexagon bottom points
    bottomPoints = [
      [width, height],
      [0, height],
    ]

    if (door) {
      const doorWidth = computeLength(door.width, width)
      const doorHeight = computeLength(door.height, height)
      const doorGap = Math.tan(((90 - roofAngle) * Math.PI) / 180) * doorHeight

      const halfDoorWidth = doorWidth / 2

      bottomPoints = [
        [width, height],
        [width / 2 + halfDoorWidth, height],
        [width / 2 + halfDoorWidth - doorGap, height - doorHeight],
        [width / 2 - halfDoorWidth + doorGap, height - doorHeight],
        [width / 2 - halfDoorWidth, height],
        [0, height],
      ]
    }
  }

  return [...topPoints, ...bottomPoints]
}

export const HouseHexagon = forwardRef<Props>(
  ({ roofAngle, roofWidth = 0.3, roofHeight, inverted, mirrored = false, door, ...props }, ref) => {
    const { designAngle } = useDesignContext({ designAngle: roofAngle })

    const points = useCallback(
      (width: number, height: number) => {
        return computeShape(designAngle, roofWidth, width, height, roofHeight, mirrored, door)
      },
      [designAngle, roofWidth, roofHeight, door, mirrored],
    )

    return (
      <Polygon
        points={points}
        {...props}
        ref={ref}
        rotation={props.rotation ?? (inverted ? 180 : 0)}
      />
    )
  },
)

export type HouseHexagonProps = PropsOf<typeof HouseHexagon>
