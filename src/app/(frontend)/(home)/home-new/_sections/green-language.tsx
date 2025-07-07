'use client'

import React, { useEffect, useState } from 'react'
import { BodyCard } from '@/components/organisms/body-card/body-card'
// import { Link } from '@/components/atoms/link'
import { DesignContextProvider } from '@/hooks/use-design-context'
// import { OctagonCarousel } from '@/components/organisms/octagon-carousel/octagon-carousel'
import FlowerIcon from '@/features/icons/flower-icon'
import LeaveIcon from '@/features/icons/leave-icon'
import MushroomIcon from '@/features/icons/mushroom-icon'
import BullshitIcon from '@/features/icons/bullshit-icon'
import { Gratitons } from './gratitons'
import { twMerge } from 'tailwind-merge'
import { GratitonImageCarousel } from '../components/gratiton-image-carousel'

export const GreenLanguage: React.FC<GreenLanguageProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [homeGreenLanguage, setHomeGreenLanguage] = useState<any[]>([])
  const [currentImages, setCurrentImages] = useState<any[]>([])
  const [currentGreenLanguage, setCurrentGreenLanguage] = useState('flowers')
  const [gratitonsData, setGratitonsData] = useState<
    {
      title: string
      description: string
    }[]
  >([])
  const [currentGratitonsData, setCurrentGratitonsData] = useState({
    title: 'Gratitons',
    description:
      '"Gratitons" by Sophia — Particles of gratitude that ripple through your emotional system, bringing joy and warmth.',
  })
  const [currentIndex, setCurrentIndex] = useState(0)

  const getHomeGreenLanguageTags = async () => {
    const res = await fetch('/api/dimension?limit=200', {
      method: 'GET',
    })

    const result = await res.json()
    if (result.docs && result.docs.length > 0) {
      const docs: any[] = result.docs
      if (docs && docs.length > 0) {
        setHomeGreenLanguage(docs)
        const current: any[] = docs.filter((doc) => doc.name === 'flowers')

        if (current && current.length > 0) {
          const images = current[0].collectionOfTags.map((tag: any) => {
            return `${tag.image.url}`
          })
          const allData = current[0].collectionOfTags.map((tag: any) => {
            return { title: tag.name, description: tag.description }
          })

          setCurrentImages(images)
          setGratitonsData(allData)
          setCurrentGratitonsData(allData[0])
          setCurrentGreenLanguage('flowers')
        }
      }

      setIsLoading(false)
    }
  }

  function handleCurrent(tag: string) {
    const current: any[] = homeGreenLanguage.filter((doc) => doc.name === tag)

    if (current && current.length > 0) {
      const images = current[0].collectionOfTags.map((tag: any) => {
        return tag.image.url
      })

      const allData = current[0].collectionOfTags.map((tag: any) => {
        return { title: tag.name, description: tag.description }
      })

      setCurrentImages(images)
      setGratitonsData(allData)
      setCurrentGratitonsData(allData[0])
      setCurrentIndex(0)

      setCurrentGreenLanguage(tag)
    }
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    setIsLoading(true)
    getHomeGreenLanguageTags()
  }, [])

  // useEffect(() => {
  //   console.log(currentImages, 'Current Images')
  //   console.log(currentImages.slice(0, 5), 'Sliced Images')
  // }, [currentImages])

  useEffect(() => {
    setCurrentGratitonsData(gratitonsData[currentIndex])
  }, [currentIndex])

  return (
    <>
      <DesignContextProvider stroke="#FFF200" strokeWidth={4}>
        <BodyCard
          title={['green', 'language']}
          className="bg-unset mt-[-400px] min-h-[1278px] w-full justify-start bg-cover flex flex-col gap-10 max-w-[1440px] items-center z-0"
          headerCardType="separated"
          roofAngle={38}
          headerCardProps={{
            tipAngle: 75,
            className:
              'text-[22px] bg-gradient-to-r from-[#5EA08A] to-[#223A32] h-[65px] md:h-[88px] min-w-[90%] max-w-[300px] sm:min-w-[420px] md:min-w-[554.63px] md:max-w-[554.63px]',
            classNames: {
              name: 'h-full w-full flex justify-center items-center',
              leftTitle:
                'text-[22px] leading-[44.6px] sm:text-[28px] sm:leading-[54.6px] md:text-[36px] md:leading-[76.07px] font-black',
              rightTitle:
                'text-[22px] leading-[44.6px] sm:text-[28px] sm:leading-[54.6px] md:text-[36px] md:leading-[76.07px] font-black',
            },
            separatorFill: '#C2EF9E',
            separatorStroke: 0,
          }}
          style={{
            backgroundImage: `url(/assets/home/green-language-bg.png)`,
          }}
        >
          <p className="max-w-[544px] pt-20 md:pt-32 px-3 text-center text-[18px] sm:text-[20px] md:text-[22px] text-[#F9F9FB] font-bold">
            We’re learning to speak a new green language —  feelings we once described with single
            words are now blooming into thousands of subatomic emotions, giving us a new shared
            vocabulary of the psyche.
          </p>

          <div className="flex w-full items-center justify-center gap-[50px] px-1">
            <button
              onClick={() => handleCurrent('flowers')}
              className={twMerge(
                `w-[28px] md:w-[43px] hover:text-color-1`,
                currentGreenLanguage === 'flowers' ? 'text-color-2' : 'text-[#FFFFFF70]',
              )}
            >
              <FlowerIcon />
            </button>
            <button
              onClick={() => handleCurrent('compost')}
              className={twMerge(
                `w-[28px] md:w-[33px] hover:text-color-1`,
                currentGreenLanguage === 'compost' ? 'text-color-2' : 'text-[#FFFFFF70]',
              )}
            >
              <LeaveIcon />
            </button>
            <button
              onClick={() => handleCurrent('mycelium')}
              className={twMerge(
                `w-[28px] md:w-[31px] hover:text-color-1`,
                currentGreenLanguage === 'mycelium' ? 'text-color-2' : 'text-[#FFFFFF70]',
              )}
            >
              <MushroomIcon />
            </button>
            <button
              onClick={() => handleCurrent('bullshit')}
              className={twMerge(
                `w-[28px] hover:text-color-1`,
                currentGreenLanguage === 'bullshit' ? 'text-color-2' : 'text-[#FFFFFF70]',
              )}
            >
              <BullshitIcon />
            </button>
          </div>
          {/* <OctagonCarousel
            // images={
            //   isLoading
            //     ? [
            //         '/assets/home/green-language/1.png',
            //         '/assets/home/green-language/2.png',
            //         '/assets/home/green-language/3.png',
            //         '/assets/home/green-language/4.png',
            //         '/assets/home/green-language/5.png',
            //       ]
            //     : currentImages.slice(0, 5)
            // }
            images={currentImages.slice(0, 5)}

            // images={[
            //   '/assets/home/green-language/1.png',
            //   '/assets/home/green-language/2.png',
            //   '/assets/home/green-language/3.png',
            //   '/assets/home/green-language/4.png',
            //   '/assets/home/green-language/5.png',
            // ]}
          /> */}

          <GratitonImageCarousel currentIndex={currentIndex} images={currentImages} />
        </BodyCard>
      </DesignContextProvider>

      <Gratitons
        gratitonsData={currentGratitonsData}
        isLoading={isLoading}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </>
  )
}

interface GreenLanguageProps {}
