import React, { useEffect } from 'react'

export function usePolygonBackground(ref: React.RefObject<any>, polygonId: string) {
  const [background, setBackground] = React.useState<HTMLDivElement | null>(null)
  useEffect(() => {
    const directChildren = Array.from((ref.current?.children as HTMLCollection) || [])

    const background: HTMLDivElement =
      (directChildren?.find((child) =>
        child.id?.startsWith('polygon-background-'),
      ) as HTMLDivElement) || document.createElement('div')

    if (ref.current && background) {
      background.style.position = 'absolute'
      background.style.pointerEvents = 'none'
      background.role = 'polygon-background'
      background.style.zIndex = '-1'
      background.id = `polygon-background-${polygonId}`
      ref.current.appendChild(background)

      setBackground(background)
    }
  }, [ref.current, polygonId])

  return background
}
