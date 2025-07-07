import { useDOMRef } from '@/components/utils/react/dom'
import { useComponentBounds } from '@/hooks/use-component-bounds'
import React, { useEffect, useMemo } from 'react'
import { createBorderStyle, extractBackgroundStyles, Point } from '@/components/atoms/polygon/utils'
import { usePolygonGeometry } from '@/components/atoms/polygon/hooks/use-polygon-geometry'
import { usePolygonBorder } from '@/components/atoms/polygon/hooks/use-polygon-border'
import { As, PolymorphicProps } from '@/components/utils/react/polymorphism'
import { css } from '@emotion/css'
import { twMerge } from 'tailwind-merge'
import { useDesignContext } from '@/hooks/use-design-context'
import { useUniqueId } from '@/hooks/use-unique-id'
import { usePolygonBackground } from '@/components/atoms/polygon/hooks/use-polygon-background'

export interface UsePolygonProps {
  /**
   * The points of the polygon
   */
  points: Array<Point> | ((width: number, height: number) => Array<Point>)

  /**
   * The stroke color of the polygon
   */
  stroke?: string

  /**
   * The children of the polygon. This will be inside the polygon
   */
  children?: React.ReactNode | React.ReactNode[]

  /**
   * The stroke width of the polygon border
   */
  strokeWidth?: number

  /**
   * The rotation of the polygon points in degrees. Note that this will not rotate the content inside the polygon
   * @default 0
   */
  rotation?: number

  /**
   * Whether the content should overflow the polygon
   */
  overflow?: boolean

  /**
   *  The border stroke colors
   */
  borderColors?: Array<string | 'default'>

  /**
   * The border stroke widths for the polygon
   */
  borderWidths?: Array<number | 'default'>

  /**
   * The colors for the segments of the polygon
   */
  segmentColors?: string[]

  /**
   * Whether the content should be inscribed within the polygon
   * @default false
   */
  inscribedContent?: boolean

  /**
   * Whether the content should be centered within the polygon. This adds the `flex items-center justify-center` class to the polygon
   * @default true
   */
  centerContent?: boolean
}

export function usePolygon<T extends As>({
  points: pointsDef,
  stroke: strokeProp,
  children,
  strokeWidth: strokeWidthProp,
  className,
  rotation,
  overflow = false,
  borderColors = [],
  borderWidths = [],
  inscribedContent = false,
  centerContent = true,
  as: Component,
  ref,
  ...otherProps
}: PolymorphicProps<T, UsePolygonProps>) {
  const domRef = useDOMRef(ref)
  const polygonId = useUniqueId()
  const bounds = useComponentBounds(domRef, [children, otherProps.style, className])

  const { stroke, strokeWidth } = useDesignContext({
    stroke: strokeProp,
    strokeWidth: strokeWidthProp,
  })

  const points = React.useMemo(() => {
    if (Array.isArray(pointsDef)) {
      return pointsDef
    }

    if (!bounds) return []

    return pointsDef(bounds.width, bounds.height)
  }, [bounds, pointsDef])

  const borders = useMemo(() => {
    const borderStyle = Array.from({ length: points.length }, (_, i) => ({
      stroke: borderColors[i] === 'default' ? stroke : (borderColors[i] ?? stroke),
      strokeWidth: borderWidths[i] === 'default' ? strokeWidth : (borderWidths[i] ?? strokeWidth),
    }))
    return createBorderStyle(borderStyle, points.length, stroke, strokeWidth)
  }, [borderColors, borderWidths, points, stroke, strokeWidth])

  const { paths, segments, viewBox, clipPath, aspectRatio, boundingBox } = usePolygonGeometry(
    points,
    borders.map((style) => style.strokeWidth * 2),
    rotation,
    inscribedContent,
    bounds?.width,
    bounds?.height,
  )

  const [backgroundStyles, otherStyles] = extractBackgroundStyles(otherProps.style ?? {})

  const background = usePolygonBackground(domRef, polygonId)

  const border = usePolygonBorder(
    domRef,
    boundingBox,
    Boolean(overflow),
    {
      viewBox,
      paths,
      segments,
      borders,
      stroke,
    },
    bounds,
    polygonId,
  )

  useEffect(() => {
    // We apply the styles directly to the node that represents the polygon.
    if (domRef.current && bounds) {
      const color = 'transparent'
      domRef.current.style.borderTop = `${boundingBox.y}px solid ${color}`
      domRef.current.style.borderBottom = `${Math.abs(bounds?.height - boundingBox.height - boundingBox.y).toFixed(1)}px solid ${color}`
      domRef.current.style.borderLeft = `${boundingBox.x}px solid ${color}`
      domRef.current.style.borderRight = `${Math.abs(bounds?.width - boundingBox.width - boundingBox.x).toFixed(1)}px solid ${color}`
      domRef.current.style.backgroundClip = 'padding-box'
      if (!overflow) {
        domRef.current.style.clipPath = clipPath
      }
    }
  }, [boundingBox, domRef.current, clipPath, aspectRatio, bounds, overflow])

  const backgroundClass = useMemo(() => {
    return css`
      ${!bounds ? 'visibility: hidden' : ''} div#polygon-background-${polygonId} {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        clip-path: ${clipPath};
        ${css(backgroundStyles as any)}
      }

      > * {
        z-index: 2;
      }
    `
  }, [bounds, clipPath, backgroundStyles])

  const classes = useMemo(() => {
    return [
      'group relative',
      bounds && 'polygon-component',
      centerContent && 'flex items-center justify-center',
      className,
      'overflow-visible',
    ]
  }, [bounds, centerContent, className, overflow])

  const getBaseProps = () => {
    return {
      ...otherProps,
      style: otherStyles,
      'data-polygon': true,
      className: twMerge(classes, backgroundClass),
      ref: domRef,
    }
  }

  return { getBaseProps, border, children, Component, background }
}
