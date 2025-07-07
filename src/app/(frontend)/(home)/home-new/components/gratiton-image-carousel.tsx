import React, { useMemo } from 'react'
import { Image } from '@/components/atoms/image'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'

export const GratitonImageCarousel: React.FC<GreenLanguageGalleryProps> = ({
  strokeWidth = 8,
  stroke = '#CFE0B8',
  hueRotate = 96,
  images,
  height = 491,
  currentIndex = 0,
}) => {
  const visibleSlides = useMemo(() => {
    const visible = []
    for (let i = -2; i <= 2; i++) {
      visible.push(images[(currentIndex + i + images.length) % images.length])
    }

    const visibleData = [
      {
        src: visible[0],
        left: '-55%',
        top: '22%',
        size: height * 0.71,
      },
      {
        src: visible[1],
        left: '-25%',
        top: '22%',
        size: height * 0.64,
      },

      {
        src: visible[4],
        right: '-62%',
        top: '22%',
        size: height * 0.71,
      },
      {
        src: visible[3],
        right: '-32%',
        top: '23%',
        size: height * 0.67,
      },
      { src: visible[2], size: height },
    ]
    return visibleData
  }, [images, height, currentIndex])

  return (
    <div className="relative flex items-center">
      {visibleSlides.map(({ src, right, left, size }, index) => (
        <div
          style={{
            left,
            right,
            position: index === 4 ? undefined : 'absolute',
            opacity: index === 4 ? '1' : '0.33',
          }}
          key={`${src}-${index}`}
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
  currentIndex: number
}
