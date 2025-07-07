import {
  useRadialPolygon,
  UseRadialPolygonProps,
} from '@/components/molecules/radial-polygon/hooks/useRadialPolygon'
import { Layout } from '@/components/molecules/radial-polygon/layout/layout'
import React, { PropsWithChildren } from 'react'
import { Polygon } from '@/components/atoms/polygon/polygon'
import {
  BoundaryProps,
  createBoundary,
  RadialPolygonBoundary,
  WedgeData,
} from '@/components/atoms/polygon/utils'
import Wedge from './layout/wedge'
import { useComponentBounds } from '@/hooks/use-component-bounds'
import { SlotClasses } from '@/components/utils/react/types'
import { forwardRef } from '@/components/utils/react/polymorphism'
import { useDOMRef } from '@/components/utils/react/dom'
import { twMerge } from 'tailwind-merge'

type Props = {
  /**
   * Number of layers in the radial polygon.
   */
  numLayers?: number
  /**
   * Configuration for the wedges and segments of the polygon
   */
  data?: Array<WedgeData>
  /**
   * Classname for the wrapper
   */
  className?: string

  /**
   * The background color of the radial polygon
   */
  backgroundColor?: string

  /**
   * The text color
   */
  color?: string

  /**
   * Configuration for the boundary of the polygon
   */
  boundary?: RadialPolygonBoundary | BoundaryProps

  /**
   * Classnames for the slots in the radial polygon
   */
  classNames?: SlotClasses<'floatingLayer'>

  /**
   * Capture the click event on a segment
   * @param index the index of the segment in the wedge
   * @param wedgeIndex the index of the wedge
   */
  onSegmentClick?: (index: number, wedgeIndex: number) => void
}

export type RadialPolygonProps = PropsWithChildren<
  Props & Omit<UseRadialPolygonProps, 'width' | 'height'>
> & {
  width?: number
  height?: number
}

const RadialPolygon = forwardRef<RadialPolygonProps>(
  (
    {
      data,
      numLayers = 1,
      color = 'black',
      backgroundColor = 'transparent',
      boundary,
      children,
      rotation = 0,
      width,
      classNames,
      height,
      ...props
    },
    ref,
  ) => {
    boundary = createBoundary(boundary || {}, true, 'black', 2)

    const domRef = useDOMRef(ref)

    const bounds = useComponentBounds(domRef)

    const {
      points,
      center,
      coreSize,
      border,
      contentWidth,
      contentHeight,
      coreStrokeWidth,
      coreProps,
    } = useRadialPolygon({
      ...props,
      boundary,
      rotation,
      width: bounds?.width || 0,
      height: bounds?.height || 0,
    })

    return (
      <Polygon
        className={twMerge(props.className)}
        ref={domRef}
        points={points}
        stroke="none"
        strokeWidth={border}
        overflow
        {...props}
        style={{
          width: width || '100%',
          height: height || '100%',
          ...props.style,
        }}
      >
        {points.map(([x, y], index) => {
          return (
            <Wedge
              key={index}
              index={index}
              point={[x, y]}
              nextPoint={points[(index + 1) % points.length]}
              coreSize={coreSize}
              center={center}
              layers={numLayers}
              color={color}
              data={data?.[index]}
              parentRef={domRef}
              classNames={classNames}
              onSegmentClick={(i) => props.onSegmentClick?.(i, index)}
            />
          )
        })}
        <Layout
          points={points}
          width={contentWidth}
          height={contentHeight}
          center={center}
          coreSize={coreSize}
          backgroundColor={backgroundColor}
          coreStrokeWidth={coreStrokeWidth}
          boundary={boundary}
          numLayers={numLayers}
          data={data}
        />
        {coreSize > 0 && <Polygon {...coreProps}>{children}</Polygon>}
      </Polygon>
    )
  },
)

export default RadialPolygon
