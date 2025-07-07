import { FloatingLayer } from '@/components/molecules/radial-polygon/layout/floating-layer'
import { useFloatingLayer } from '@/components/molecules/radial-polygon/hooks/useFloatingLayer'
import { useWedge } from '@/components/molecules/radial-polygon/hooks/useWedge'
import { Point, WedgeData } from '@/components/atoms/polygon/utils'
import { css } from '@emotion/css'
import React, { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import Segment from './segment'
import { SlotClasses } from '@/components/utils/react/types'
import { useUniqueId } from '@/hooks/use-unique-id'

const Wedge: React.FC<WedgeProps> = ({
  index,
  layers = 1,
  data,
  color: mainColor,
  center,
  point,
  nextPoint,
  coreSize,
  parentRef,
  onSegmentClick,
  classNames,
}) => {
  const id = useUniqueId()
  const { rotation, width, height, layerHeight, clipPath, centerAngle } = useWedge({
    point,
    nextPoint,
    center,
    coreSize,
  })

  const floatingLayerContainer = useFloatingLayer(parentRef.current)

  const floatingLayerProps = useMemo(() => {
    return {
      container: floatingLayerContainer,
      center,
      rotation,
      className: twMerge(classNames?.floatingLayer, data?.floatingLayerClassName),
      angle: centerAngle,
      wedgeId: id,
    }
  }, [
    floatingLayerContainer,
    center,
    rotation,
    centerAngle,
    classNames,
    data?.floatingLayerClassName,
    id,
  ])

  const { fill = 'transparent', color = mainColor, className } = data || {}

  return (
    <div
      style={{
        position: 'absolute',
        top: point[1],
        width,
        height,
        left: point[0],
        color,
        // The first two wedges are in most cases covered and overlapped by other wedges
        zIndex: index < 12 ? 13 : 12,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) translate(-50%, -50%)`,
        ...data?.wedgeStyle,
      }}
    >
      <div
        className={twMerge(
          'flex h-full w-full flex-col justify-end',
          // Use emotion to allow tailwind classes to override the background color
          css`
            clip-path: ${clipPath};
            background-color: ${fill};
          `,
          className,
        )}
      >
        {Array.from({ length: layers }).map((_, i) => {
          const index = layers - i - 1
          return (
            <Segment
              key={`segment-${index}-${i}`}
              index={i}
              color={color}
              rotation={rotation}
              height={layerHeight / layers}
              onClick={() => onSegmentClick?.(i)}
              {...(data?.segments?.[index] || {})}
            />
          )
        })}
      </div>
      {data?.floatingContent && (
        <div
          className={twMerge(
            'absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 translate-y-full items-center justify-center',
            data?.floatingContentClassName,
          )}
        >
          {data?.floatingContent}
        </div>
      )}
      {data?.hasFloatingLayer && <FloatingLayer {...floatingLayerProps} />}
    </div>
  )
}

export interface WedgeProps {
  index: number
  color?: string
  /**
   * The number of segments in the wedge.
   */
  layers?: number
  /**
   * The data for each segment.
   */
  data?: WedgeData
  center: Point
  point: Point
  nextPoint: Point
  coreSize: number
  parentRef: React.RefObject<HTMLElement>
  onSegmentClick?: (index: number) => void
  classNames?: SlotClasses<'floatingLayer'>
}

export default Wedge
