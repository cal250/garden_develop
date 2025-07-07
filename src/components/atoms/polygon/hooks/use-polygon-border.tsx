import React, { useEffect } from 'react'
import { PolygonBorder, PolygonBorderProps } from '@/components/atoms/polygon/polygon-border'
import ReactDOM from 'react-dom'
import { Rectangle } from '@/components/atoms/polygon/utils'

export function usePolygonBorder(
  ref: React.RefObject<any>,
  boundingBox: Rectangle,
  overflow: boolean,
  props: PolygonBorderProps,
  bounds: DOMRect | null,
  polygonId: string,
) {
  const [border, setBorder] = React.useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const directChildren = Array.from((ref.current?.children as HTMLCollection) || [])
    const border: HTMLDivElement =
      (directChildren?.find((child) =>
        child.id?.startsWith('polygon-border-'),
      ) as HTMLDivElement) || document.createElement('div')

    if (ref.current && border) {
      border.style.position = 'absolute'
      border.style.pointerEvents = 'none'
      border.role = 'polygon-border'
      border.id = `polygon-border-${polygonId}`
      ref.current.appendChild(border)
      setBorder(border)
    }
  }, [ref.current, border, polygonId])

  useEffect(() => {
    if (border && bounds) {
      border.style.zIndex = overflow ? '0' : '20'
      border.style.left = `-${boundingBox.x.toFixed(2)}px`
      border.style.top = `-${boundingBox.y.toFixed(2)}px`
      border.style.right = `-${Math.abs(bounds?.width - boundingBox.width - boundingBox.x).toFixed(2)}px`
      border.style.bottom = `-${Math.abs(bounds?.height - boundingBox.height - boundingBox.y).toFixed(2)}px`
    }
  }, [boundingBox, overflow, border, bounds])

  return border ? ReactDOM.createPortal(<PolygonBorder {...props} />, border) : null
}
