'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { BodyCard } from '@/components/organisms/body-card/body-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/atoms/carousel'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { NewWellgorithmCard } from '../components/new-wellgorithm-card'
import { Link } from '@/components/atoms/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/atoms/icons'
import useWindowWidth from '@/hooks/use-window-width'
import FlowerIcon from '@/features/icons/flower-icon'
import LeaveIcon from '@/features/icons/leave-icon'
import MushroomIcon from '@/features/icons/mushroom-icon'
import BullshitIcon from '@/features/icons/bullshit-icon'
import { twMerge } from 'tailwind-merge'

export const WellgorithmsFeed: React.FC<WellgorithmsFeedProps> = () => {
  const width = useWindowWidth()

  const [isLoading, setIsLoading] = useState(false)
  const [seedWellgorithm, setSeedWellgorithm] = useState<any[]>([])
  const [currentSeeds, setCurrentSeeds] = useState<any[]>([])
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

  const getHomeSeedWellgorithmTags = async () => {
    const ecosystemRes = await fetch('/api/ecosystem?limit=200', {
      method: 'GET',
    })

    const res = await fetch('/api/seedWellgorithm?limit=200', {
      method: 'GET',
    })

    const ecosystemResult = await ecosystemRes.json()
    if (ecosystemResult.docs && ecosystemResult.docs.length > 0) {
      setEcosystemErr('')
      // console.log(ecosystemResult)
      const ecoDocs: any[] = ecosystemResult.docs

      // console.log(ecoDocs, 'This is wellgorithm ecosystem')

      const ecosystemsFiltered = ecoDocs.sort((a, b) => a.rank - b.rank).map((doc) => doc.name)

      // console.log(ecosystemsFiltered, 'ecosystemsFiltered')
      setEcosystems(ecosystemsFiltered)

      setCurrentEcosystem(ecosystemsFiltered[0])

      const result = await res.json()
      if (result.docs && result.docs.length > 0) {
        const docs: any[] = result.docs

        // console.log(docs, 'This is wellgorithm')

        if (docs && docs.length > 0) {
          setSeedWellgorithm(docs)
          const current: any[] = docs.filter(
            (doc) => doc?.ecosystem?.name === ecosystemsFiltered[0],
          )

          // console.log(current, 'This is wellgorithm flowers', ecosystemsFiltered[0])

          if (current && current.length > 0) {
            const seeds = current.map((tag: any) => {
              return {
                title:
                  tag?.wellgorithmType?.name.toLowerCase() === 'double'
                    ? [tag?.titles[0], tag.titles[1]]
                    : `${tag?.titles[0]}`,
                image: tag?.image?.url,
                intention: tag?.intention,
              }
            })
            setCurrentSeeds(seeds)
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
    const current: any[] = seedWellgorithm.filter((doc) => doc?.ecosystem?.name === tag)
    setCurrentEcosystem(tag)
    if (current && current.length > 0) {
      setWellgorithmErr('')
      const seeds = current.map((tag: any) => {
        return {
          title:
            tag?.wellgorithmType?.name.toLowerCase() === 'double'
              ? [tag?.titles[0], tag?.titles[1]]
              : `${tag?.titles[0]}`,
          image: tag?.image?.url,
          intention: tag?.intention,
        }
      })
      setCurrentSeeds(seeds)
    } else {
      setWellgorithmErr('Empty wellgorithm')
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getHomeSeedWellgorithmTags()
  }, [])

  return (
    <DesignContextProvider stroke="#C6AED4" strokeWidth={4}>
      <BodyCard
        stroke="#9D79B2"
        title="Wellgorithms"
        className="bg-unset mt-[-300px] min-h-[1278px] w-full justify-start bg-cover flex flex-col gap-[52px] max-w-[1440px] items-center z-0"
        roofAngle={38}
        headerCardProps={{
          tipAngle: 75,
          className:
            'bg-gradient-to-t from-[#352E62] to-[#585090] h-[65px] md:h-[88px] min-w-[90%] max-w-[300px] sm:min-w-[420px] md:min-w-[554.63px] md:max-w-[554.63px]',
          classNames: {
            name: 'h-full w-full flex justify-center items-center',
            outerTitle:
              'text-[22px] leading-[44.6px] sm:text-[28px] sm:leading-[54.6px] md:text-[36px] md:leading-[76.07px] font-black',
          },
        }}
        style={{
          backgroundImage: `url(/assets/home/wellgorithms-bg.png)`,
        }}
      >
        <p className="max-w-[544px] pt-16 md:pt-[93px] px-3 text-center text-[18px] sm:text-[20px] md:text-[22px] leading-[30px] text-[#F9F9FB] font-bold">
          Wellgorithms are like open-source software for the soul — nature-inspired practices that
          can be branched, forked, debugged and compiled in a shared repository of spiritual and
          emotional wisdom.
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
                    {/* <FlowerIcon /> */}
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
              <Carousel className="h-[380px] w-[300px] sm:w-[420px] md:w-[950px] lg:w-[1300px] mt-4">
                <CarouselContent
                  className={currentSeeds.length === 1 ? 'justify-center ' : 'justify-start'}
                >
                  {currentSeeds.map((seed, i) => (
                    <CarouselItem key={i} className="min-w-fit h-full flex-initial sm:pl-[45px]">
                      <NewWellgorithmCard index={i} feed={seed} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious
                  hideIcon
                  strokeWidth={0}
                  rotation={180}
                  gap={width > 1024 ? 33 : width > 640 ? 15 : 5}
                  className="aspect-auto h-[60px] !min-w-[30px] bg-transparent text-[#F2EB2E] px-0 -mt-5"
                >
                  <ChevronLeftIcon className="h-[60px] w-[30px]" />
                </CarouselPrevious>

                <CarouselNext
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
      </BodyCard>
    </DesignContextProvider>
  )
}

interface WellgorithmsFeedProps {}
