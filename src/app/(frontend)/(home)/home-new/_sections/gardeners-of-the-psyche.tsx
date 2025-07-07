'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { GardenerCard } from '../components/gardener-card'
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
import { Link } from '@/components/atoms/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/atoms/icons'
import useWindowWidth from '@/hooks/use-window-width'
import FlowerIcon from '@/features/icons/flower-icon'
import LeaveIcon from '@/features/icons/leave-icon'
import MushroomIcon from '@/features/icons/mushroom-icon'
import BullshitIcon from '@/features/icons/bullshit-icon'
import { twMerge } from 'tailwind-merge'

export const GardenersOfThePsyche: React.FC<GardenersOfThePsycheProps> = () => {
  const width = useWindowWidth()

  const [isLoading, setIsLoading] = useState(false)
  const [sproutWellgorithm, setSproutWellgorithm] = useState<any[]>([])
  const [currentSprouts, setCurrentSprouts] = useState<any[]>([])
  const [ecosystems, setEcosystems] = useState<string[]>([])
  const [currentEcosystem, setCurrentEcosystem] = useState('flowers')
  const [ecosystemErr, setEcosystemErr] = useState('')
  const [wellgorithmErr, setWellgorithmErr] = useState('')

  const wellIcon: Record<string, ReactNode> = {
    flowers: <FlowerIcon />,
    compost: <LeaveIcon />,
    mycelium: <MushroomIcon />,
    bullshit: <BullshitIcon />,
  }

  const getHomeSproutWellgorithmTags = async () => {
    const ecosystemRes = await fetch('/api/ecosystem?limit=200', {
      method: 'GET',
    })

    const res = await fetch('/api/sproutWellgorithm?limit=200', {
      method: 'GET',
    })

    const ecosystemResult = await ecosystemRes.json()
    if (ecosystemResult.docs && ecosystemResult.docs.length > 0) {
      setEcosystemErr('')
      // console.log(ecosystemResult)
      const ecoDocs: any[] = ecosystemResult.docs

      // console.log(ecoDocs, 'This is ecosystem')

      const ecosystemsFiltered = ecoDocs.sort((a, b) => a.rank - b.rank).map((doc) => doc.name)

      // console.log(ecosystemsFiltered, 'ecosystemsFiltered')
      setEcosystems(ecosystemsFiltered)

      setCurrentEcosystem(ecosystemsFiltered[0])

      const result = await res.json()
      if (result.docs && result.docs.length > 0) {
        const docs: any[] = result.docs

        // console.log(docs, 'This is sprout wellgorithm')

        if (docs && docs.length > 0) {
          setSproutWellgorithm(docs)
          const current: any[] = docs.filter(
            (doc) => doc.seedWelgorithm?.ecosystem?.name === ecosystemsFiltered[0],
          )

          // console.log(current, 'This is sproutgorithm flowers', ecosystemsFiltered[0])

          if (current && current.length > 0) {
            const sprouts = current.map((tag: any) => {
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
        }
        setIsLoading(false)
      }
    } else {
      setEcosystemErr('Error fetching ecosystem')
    }
  }

  function handleCurrent(tag: string) {
    const current: any[] = sproutWellgorithm.filter(
      (doc) => doc.seedWelgorithm?.ecosystem?.name === tag,
    )
    setCurrentEcosystem(tag)
    if (current && current.length > 0) {
      setWellgorithmErr('')
      const seeds = current.map((tag: any) => {
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
      setCurrentSprouts(seeds)
    } else {
      setWellgorithmErr('Empty wellgorithm')
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getHomeSproutWellgorithmTags()
  }, [])

  return (
    <DesignContextProvider stroke="#90BE6B" strokeWidth={4}>
      <BodyCard
        stroke="#709A4E"
        title="gardeners of the psyche"
        className="flex flex-col gap-[52px] bg-unset mt-[-500px] min-h-[1278px] w-full max-w-[1440px] items-center justify-start bg-cover z-0"
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
        <p className="max-w-[544px] pt-20 md:pt-32 px-3 text-center text-[18px] sm:text-[20px] md:text-[22px] font-bold">
          A new kind of hero is blossoming — the master of the world within. The friend who lights a
          lantern in the darkness. The neighbor who plucks the weeds of worry. The partner who
          plants the seeds of joy and peace.
        </p>

        {isLoading ? (
          ''
        ) : ecosystemErr ? (
          <p className="text-center text-sm sm:text-base md:text-lg font-bold text-[#FF3B30]">
            {ecosystemErr}
          </p>
        ) : (
          <>
            <div className="flex w-full items-center justify-center gap-[50px] px-1">
              {ecosystems &&
                ecosystems.length > 0 &&
                ecosystems.map((ecosystem) => (
                  <button
                    key={ecosystem}
                    onClick={() => handleCurrent(ecosystem)}
                    className={twMerge(
                      `w-[28px] md:w-[43px] hover:text-color-1`,
                      currentEcosystem === ecosystem ? 'text-color-2' : 'text-[#FFFFFF70]',
                    )}
                  >
                    {wellIcon[ecosystem]}
                  </button>
                ))}

              {ecosystems && ecosystems.length > 4 && (
                <Link className="flex items-center gap-[1.5px] text-[#FFFFFF70] hover:text-color-1 mt-2">
                  <p className="text-sm !leading-[26px] font-black">more</p>

                  <ChevronRightIcon className="w-[11px] h-[20px]" />
                </Link>
              )}
            </div>

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
                  className="aspect-auto h-[60px] !min-w-[30px] bg-transparent text-[#F2EB2E] px-0 -mt-5"
                >
                  <ChevronLeftIcon className="h-[60px] w-[30px]" />
                </CarouselPrevious>

                <CarouselNext
                  polygon={RegularPolygon}
                  sides={3}
                  gap={width > 1024 ? 33 : width > 640 ? 15 : 5}
                  hideIcon
                  strokeWidth={0}
                  className="aspect-auto h-[60px] !min-w-[30px] bg-transparent text-[#F2EB2E] px-0 -mt-5"
                >
                  <ChevronRightIcon className="h-[60px] w-[30px]" />
                </CarouselNext>
              </Carousel>
            )}
          </>
        )}

        {/* <div className="flex w-full items-center justify-center gap-[50px] px-1">
          <Link className="w-[28px] md:w-[43px] flex items-center gap-[1px] text-[#FFFFFF70] hover:text-color-1">
            <FlowerIcon />
          </Link>
          <Link className="w-[28px] md:w-[33px] flex items-center gap-[1px] text-[#FFFFFF70] hover:text-color-1">
            <LeaveIcon />
          </Link>
          <Link className="w-[28px] md:w-[31px] flex items-center gap-[1px] text-[#FFFFFF70] hover:text-color-1">
            <MushroomIcon />
          </Link>
          <Link className="w-[28px] md:w-[30px] flex items-center gap-[1px] text-[#FFFFFF70] hover:text-color-1">
            <BullshitIcon />
          </Link>

          <Link className="flex items-center gap-[1.5px] text-[#FFFFFF70] hover:text-color-1 mt-2">
            <p className="text-sm !leading-[26px] font-black">more</p>

            <ChevronRightIcon className="w-[11px] h-[20px]" />
          </Link>
        </div> */}
      </BodyCard>
    </DesignContextProvider>
  )
}

interface GardenersOfThePsycheProps {}
