import React, { useMemo } from 'react'
import { Image } from '@/components/atoms/image'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'

export const OctagonCarousel: React.FC<GreenLanguageGalleryProps> = ({
  strokeWidth = 8,
  stroke = '#CFE0B8',
  hueRotate = 96,
  images,
  height = 491,
}) => {
  const firstFive = useMemo(() => {
    const [first, second, third, fourth, fifth] = [...images.splice(0, 5)]
    return [
      {
        src: first,
        left: '-55%',
        top: '22%',
        size: height * 0.71,
      },
      {
        src: second,
        left: '-25%',
        top: '22%',
        size: height * 0.64,
      },
      {
        src: fifth,
        right: '-62%',
        top: '22%',
        size: height * 0.71,
      },
      {
        src: fourth,
        right: '-32%',
        top: '23%',
        size: height * 0.67,
      },
      { src: third, size: height },
    ]
  }, [images, height])

  return (
    <div className="relative flex items-center">
      {firstFive.map(({ src, right, left, size }, index) => (
        <div
          style={{
            left,
            right,
            position: index === 4 ? undefined : 'absolute',
          }}
          key={src}
        >
          <Image
            src={src}
            polygon={RegularPolygon}
            classNames={{ img: 'object-cover' }}
            style={{
              filter: index === 4 ? undefined : `sepia(1) hue-rotate(${hueRotate}deg)`,
            }}
            isZoomed={index === 4}
            sides={8}
            height={size}
            width={size}
            strokeWidth={strokeWidth}
            stroke={stroke}
          />
        </div>
      ))}
    </div>
  )
}

interface GreenLanguageGalleryProps {
  strokeWidth?: number
  stroke?: string
  hueRotate?: number
  images: Array<string>
  height?: number
}
