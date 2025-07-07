import { forwardRef, PropsOf } from '@/components/utils/react/polymorphism'
import { Polygon, PolygonProps } from '@/components/atoms/polygon/polygon'
import { useCallback } from 'react'
import { Point } from '@/components/atoms/polygon/utils'
import { useDesignContext } from '@/hooks/use-design-context'

type Chamfer =
  | { x?: number; y?: number }
  | number
  | { x: number; angle: number }
  | { y: number; angle: number }

type Sides = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

interface Props extends Omit<PolygonProps, 'points'> {
  /**
   * The length of the trim on the edges in pixels or a percentage (value between 0 and 1).
   * @default 0.1
   */
  chamferLength?: Chamfer | Partial<Record<Sides, Chamfer>>
}

function normalizeChamferLength(
  chamferLength: number | Chamfer | Partial<Record<Sides, Chamfer>>,
): Record<Sides, Chamfer> {
  if (
    typeof chamferLength === 'number' ||
    (typeof chamferLength === 'object' && ('x' in chamferLength || 'y' in chamferLength))
  ) {
    return {
      topLeft: chamferLength,
      topRight: chamferLength,
      bottomLeft: chamferLength,
      bottomRight: chamferLength,
    }
  }

  return {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
    ...chamferLength,
  }
}

function removeAdjacentDuplicatePoints(points: Array<Point>): Array<Point> {
  if (points.length <= 1) return points

  return points.filter((point, index) => {
    // Get next point (wrapping around to first point if at the end)
    const nextPoint = index === points.length - 1 ? points[0] : points[index + 1]

    // Compare current point with next point
    const isDuplicate =
      Math.abs(point[0] - nextPoint[0]) < Number.EPSILON &&
      Math.abs(point[1] - nextPoint[1]) < Number.EPSILON

    return !isDuplicate
  })
}

function createRectagon(
  chamfer: Record<Sides, Chamfer>,
  width: number,
  height: number,
  designAngle: number,
) {
  const chamferLengths = Object.entries(chamfer).reduce(
    (acc: any, [side, chamfer]) => {
      if (typeof chamfer === 'number') {
        chamfer = { x: chamfer, angle: designAngle }
      }

      if ('angle' in chamfer) {
        if ('x' in chamfer) {
          chamfer = {
            x: chamfer.x,
            y: Math.tan((chamfer.angle * Math.PI) / 180) * chamfer.x,
          } as { x: number; y: number }
        } else {
          chamfer = {
            x: Math.tan((chamfer.angle * Math.PI) / 180) * chamfer.y,
            y: chamfer.y,
          } as { x: number; y: number }
        }
      } else {
        chamfer = {
          x: chamfer.x ?? 0,
          y: chamfer.y ?? 0,
        } as { x: number; y: number }
      }

      // @ts-ignore
      chamfer.x = chamfer.x < 1 ? width * chamfer.x : chamfer.x
      // @ts-ignore
      chamfer.y = chamfer.y < 1 ? height * chamfer.y : chamfer.y

      acc[side] = {
        // @ts-ignore
        xCut: Math.min(width * 0.49, chamfer.x / Math.sqrt(2)),
        // @ts-ignore
        yCut: Math.min(height * 0.49, chamfer.y / Math.sqrt(2)),
      }
      return acc
    },
    {} as Record<Sides, { xCut: number; yCut: number }>,
  )

  return removeAdjacentDuplicatePoints([
    [chamferLengths.topLeft.xCut, 0],
    [width - chamferLengths.topRight.xCut, 0],
    [width, chamferLengths.topRight.yCut],
    [width, height - chamferLengths.bottomRight.yCut],
    [width - chamferLengths.bottomRight.xCut, height],
    [chamferLengths.bottomLeft.xCut, height],
    [0, height - chamferLengths.bottomLeft.yCut],
    [0, chamferLengths.topLeft.yCut],
  ] as Array<Point>)
}

/**
 * A polygon that resembles a rectangle with flattened edges.
 */
export const Rectagon = forwardRef<Props>(({ chamferLength = 0.1, ...props }, ref) => {
  const { designAngle } = useDesignContext()

  const points = useCallback(
    (width: number, height: number) => {
      const chamfer = normalizeChamferLength(chamferLength)
      return createRectagon(chamfer, width, height, designAngle)
    },
    [chamferLength, designAngle],
  )

  return <Polygon points={points} {...props} ref={ref} />
})

export type RectagonProps = PropsOf<typeof Rectagon>
