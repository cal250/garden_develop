import * as React from 'react'
import { useCarousel } from './use-carousel'
import { twMerge } from 'tailwind-merge'

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={twMerge('flex', orientation === 'vertical' && '-mt-4 flex-col', className)}
          {...props}
        />
      </div>
    )
  },
)
CarouselContent.displayName = 'CarouselContent'

export default CarouselContent
