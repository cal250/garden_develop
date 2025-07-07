'use client'

import React, { useEffect, useState } from 'react'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { BodyCard } from '@/components/organisms/body-card/body-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/atoms/carousel'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/atoms/icons'
import useWindowWidth from '@/hooks/use-window-width'
import { GardenerCard } from '../../(home)/home-new/components/gardener-card'
import { useResponsiveValue } from '@/hooks/use-responsive-value'

export const InnerAI: React.FC<InnerAIProps> = () => {
  const width = useWindowWidth()

  const [isLoading, setIsLoading] = useState(false)
  const [currentSprouts, setCurrentSprouts] = useState<any[]>([])
  const [wellgorithmErr, setWellgorithmErr] = useState('')

  const roofWidth = useResponsiveValue({ base: 0.85, sm: 0.8, md: 850 })

  const getInnertWellgorithm = async () => {
    const res = await fetch('/api/sproutWellgorithm?limit=200', {
      method: 'GET',
    })

    const result = await res.json()
    if (result.docs && result.docs.length > 0) {
      const docs: any[] = result.docs

      if (docs && docs.length > 0) {
        const sprouts = docs.map((tag: any) => {
          return {
            title:
              tag.seedWelgorithm.wellgorithmType.name.toLowerCase() === 'double'
                ? [tag.seedWelgorithm.titles[0], tag.seedWelgorithm.titles[1]]
                : `${tag.seedWelgorithm.titles[0]}`,
            image: tag?.image?.url || tag?.seedWelgorithm?.ecosystem?.image?.url,
            avatar: tag?.creator?.avatar?.url,
            intention: tag?.intention || tag.seedWelgorithm.intention,
          }
        })
        setCurrentSprouts(sprouts)
      } else {
        setWellgorithmErr('Empty wellgorithm')
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getInnertWellgorithm()
  }, [])

  return (
    <DesignContextProvider stroke="#90BE6B" strokeWidth={4}>
      <BodyCard
        stroke="#709A4E"
        title="innerAI"
        className="flex flex-col gap-[52px] bg-unset mt-[550px] min-h-[1000px] md:min-h-[1100px] w-full max-w-[1440px] items-center justify-start bg-cover z-0"
        roofWidth={roofWidth}
        roofAngle={38}
        headerCardProps={{
          tipAngle: 75,
          className:
            'text-[22px] bg-gradient-to-t from-[#2F5330] to-[#6DAD6E] h-[65px] md:h-[88px] min-w-[90%] max-w-[300px] sm:min-w-[500px] md:min-w-[554.63px] md:max-w-[554.63px]',
          classNames: {
            name: 'h-full w-full flex justify-center items-center',
            outerTitle:
              'text-[22px] leading-[44.6px] sm:text-[28px] sm:leading-[54.6px] md:text-[36px] md:leading-[76.07px] font-black',
          },
        }}
        style={{
          backgroundImage: `url(/assets/home/gardeners-bg.png)`,
        }}
      >
        <p className="max-w-[544px] pt-14 md:pt-20 px-3 text-center text-[18px] sm:text-[20px] md:text-[22px] font-bold">
          A new way to find the people and the exercises that will help you evolve your emotional,
          psychological and spiritual wellbeing, in a supportive community of fellow “gardeners.”
        </p>

        {isLoading ? (
          ''
        ) : (
          <>
            {wellgorithmErr ? (
              <p className="text-center text-sm sm:text-base md:text-lg font-bold text-[#FF3B30]">
                {wellgorithmErr}
              </p>
            ) : (
              <Carousel
                className={`h-[380px] w-[300px] sm:w-[400px] md:w-[900px] lg:w-[1280px] mt-4`}
              >
                <CarouselContent
                  className={currentSprouts.length === 1 ? 'justify-center ' : 'justify-start'}
                >
                  {currentSprouts.map((sprout, i) => (
                    <CarouselItem
                      key={i}
                      className="min-w-fit flex-initial pl-[30px] sm:pl-[48px] md:pl-[60px]"
                    >
                      <GardenerCard index={i} sprout={sprout} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious
                  polygon={RegularPolygon}
                  sides={3}
                  hideIcon
                  strokeWidth={0}
                  rotation={180}
                  gap={width > 1024 ? 33 : width > 640 ? 15 : 5}
                  className="aspect-auto h-[60px] !min-w-[30px] bg-transparent text-color-2 px-0 -mt-5"
                >
                  <ChevronLeftIcon className="h-[60px] w-[30px]" />
                </CarouselPrevious>

                <CarouselNext
                  polygon={RegularPolygon}
                  sides={3}
                  gap={width > 1024 ? 33 : width > 640 ? 15 : 5}
                  hideIcon
                  strokeWidth={0}
                  className="aspect-auto h-[60px] !min-w-[30px] bg-transparent text-color-2 px-0 -mt-5"
                >
                  <ChevronRightIcon className="h-[60px] w-[30px]" />
                </CarouselNext>
              </Carousel>
            )}
          </>
        )}
      </BodyCard>
    </DesignContextProvider>
  )
}

interface InnerAIProps {}
