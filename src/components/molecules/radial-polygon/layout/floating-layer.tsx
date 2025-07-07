import React from 'react'
import ReactDOM from 'react-dom'
import { Point } from '@/components/atoms/polygon/utils'

export const FloatingLayer: React.FC<FloatingLayerProps> = ({
  container,
  center,
  rotation,
  angle,
  className,
  wedgeId,
}) => {
  const size = 1000

  if (!container) return

  const theta = (90 - angle) / 2
  const b = size * Math.tan((theta * Math.PI) / 180)

  // console.log(angle);

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'absolute',
        top: center[1],
        left: center[0],
        width: size,
        height: size,
        transformOrigin: '0% 0%',
        clipPath: `polygon(0 0, ${b}px 100%, 100% ${b}px)`,
        transform: `rotate(${rotation + angle}deg)`,
        boxShadow: `0px 0px 20px 5px rgba(255, 242, 0, 0.5), 0px 0px 40px 15px rgba(255, 242, 0, 0.4), 0px 0px 60px 30px rgba(255, 242, 0, 0.3), 0px 0px 100px 50px rgba(255, 242, 0, 0.2)`,
      }}
      className={className}
    />,
    container,
    wedgeId,
  )
}

interface FloatingLayerProps {
  container?: HTMLElement | null
  center: Point
  rotation: number
  angle: number
  className?: string
  wedgeId: string
}
