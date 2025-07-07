'use client'

import React, { useEffect, useState } from 'react'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { BodyCard } from '@/components/organisms/body-card/body-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/atoms/carousel'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { AiWakeningCard } from '../components/ai-wakening-card'
import useWindowWidth from '@/hooks/use-window-width'

export const AiWakening: React.FC<AiWakeningProps> = () => {
  const roofWidth = useResponsiveValue({ base: 0.9, sm: 0.8, md: 755 })
  const width = useWindowWidth()

  const [isLoading, setIsLoading] = useState(false)
  const [creators, setCreators] = useState<any[]>([])
  const [creatorErr, setCreatorErr] = useState('')

  const getHomeCreators = async () => {
    const res = await fetch('/api/creator/gardens-count?creatorTypeKey=personas', {
      method: 'GET',
    })

    const result = await res.json()

    // console.log(result, 'This is a creator')

    if (result && result.length > 0) {
      setCreators(result)

      // console.log(docs, 'This is wellgorithm')
    } else {
      setCreatorErr('Error fetching creator!')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getHomeCreators()
  }, [])
  return (
    <DesignContextProvider stroke="#F2EB2E" strokeWidth={4}>
      <BodyCard
        title={['ai', 'wakening']}
        headerCardType="separated"
        roofWidth={roofWidth}
        roofAngle={38}
        className="bg-unset mt-[-340px] min-h-[1278px] w-full justify-start bg-cover flex flex-col max-w-[1440px] items-center z-0"
        headerCardProps={{
          separatorStroke: 0,
          separatorFill: '#FFFFFF',
          tipAngle: 75,
          className:
            'text-[22px] bg-gradient-to-b from-[#170A34] to-[#45249A] h-[65px] md:h-[88px] min-w-[90%] max-w-[300px] sm:min-w-[420px] md:min-w-[554.63px] md:max-w-[554.63px]',
          classNames: {
            name: 'h-full w-full flex justify-center items-center',
            leftTitle:
              'text-[22px] leading-[44.6px] sm:text-[28px] sm:leading-[54.6px] md:text-[36px] md:leading-[76.07px] font-black',
            rightTitle:
              'text-[22px] leading-[44.6px] sm:text-[28px] sm:leading-[54.6px] md:text-[36px] md:leading-[76.07px] font-black',
          },
        }}
        style={{
          backgroundImage: `url(/assets/home/ai-wakening-bg.png)`,
        }}
      >
        <p className="max-w-[544px] pt-20 md:pt-32 px-3 text-center text-[18px] sm:text-[20px] md:text-[22px] font-bold text-[#1A0A37]">
          We’re in the midst of our first ai-wakening — collaborations of humans and AI — creating
          journals, art, and &#34;flowers of the spirit&#34; that are alive with wonder, beauty and
          love.
        </p>
        {isLoading ? (
          ''
        ) : creatorErr ? (
          <p className="text-center text-sm sm:text-base md:text-lg font-bold text-[#FF3B30]">
            {creatorErr}
          </p>
        ) : (
          <Carousel className="w-[300px] sm:w-[600px] md:w-[850px] lg:w-[1170px] mx-5 pt-20">
            <CarouselContent
              className={creators.length === 1 ? 'justify-center ' : 'justify-start'}
            >
              {creators.map((creator, i) => (
                <CarouselItem key={i} className="min-w-fit flex-initial pl-[33px]">
                  <AiWakeningCard creator={creator} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              hideIcon
              strokeWidth={0}
              rotation={180}
              gap={width > 1024 ? 33 : width > 640 ? 10 : 0}
              className="aspect-auto h-[50px] md:h-[84px] !min-w-[50px] md:!min-w-[84px] bg-transparent px-0 rotate-180 "
            >
              <RegularPolygon
                sides={3}
                className="bg-[#371B7A] h-[50px] md:h-[84px] w-[50px] md:w-[84px]"
                strokeWidth={0}
              />
            </CarouselPrevious>
            <CarouselNext
              polygon={RegularPolygon}
              sides={3}
              gap={width > 1024 ? 33 : width > 640 ? 10 : 0}
              hideIcon
              strokeWidth={0}
              className="aspect-auto h-[50px] md:h-[84px] !min-w-[50px] md:!min-w-[84px] bg-transparent px-0"
            >
              <RegularPolygon
                sides={3}
                className="bg-[#371B7A] h-[50px] md:h-[84px] w-[50px] md:w-[84px]"
                strokeWidth={0}
              />
            </CarouselNext>
          </Carousel>
        )}
      </BodyCard>
    </DesignContextProvider>
  )
}

interface AiWakeningProps {}
