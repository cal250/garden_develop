'use client'

import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { CarouselProvider } from '@/components/atoms/carousel/carousel-context'

export type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

export type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  // React.useEffect(() => {
  //   console.log('We are here first!!')
  //   if (!api) return
  //   console.log('We have api')

  //   const scrollToHalfItem = () => {
  //     const items = api.slideNodes() // Get all items
  //     console.log('Getting all items: ', items)

  //     if (items.length > 2) {
  //       const firstItemWidth = items[0].getBoundingClientRect().width // Get the width of one item
  //       const halfItemOffset = firstItemWidth / 2
  //       const scrollTarget = halfItemOffset / api.containerNode().getBoundingClientRect().width // Normalize to Embla's scroll system

  //       console.log('Scrolling to:', scrollTarget)
  //       api.scrollTo(scrollTarget, false) // Scroll to the calculated position
  //     }
  //   }

  //   // Call immediately if API is already initialized
  //   // if (api.canScrollNext()) {
  //   //   scrollToHalfItem()
  //   // }
  //   // scrollToHalfItem()

  //   // Also attach to 'init' event for cases where the API initializes later
  //   // api.on('init', scrollToHalfItem)
  //   api.on('reInit', scrollToHalfItem)
  //   api.on('select', scrollToHalfItem)

  //   return () => {
  //     api.off('init', scrollToHalfItem)
  //   }
  // }, [api])

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselProvider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={twMerge('relative', className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselProvider>
  )
})
Carousel.displayName = 'Carousel'

export default Carousel
