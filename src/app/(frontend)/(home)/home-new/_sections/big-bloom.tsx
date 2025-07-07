'use client'

import { DoubleRightIcon } from '@/app/(frontend)/home/_components/double-right-icon'
import { WellgorithmsTable } from '@/app/(frontend)/home/_components/wellgorithms-table'
import { Button } from '@/components/atoms/button'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from '@/components/atoms/icons'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { Trapezoid } from '@/components/atoms/polygon/trapezoid'
import Typography from '@/components/atoms/typography/typography'
import { HeaderCard } from '@/components/molecules/header-card/header-card'
import { BodyCard } from '@/components/organisms/body-card/body-card'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { NewOctagon } from '../components/new-octagon'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import useWindowWidth from '@/hooks/use-window-width'
import { useBreakpoints } from '@/hooks/use-breakpoints'

const BigBloom = () => {
  const [isTableOpen, setIsTableOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [animationActive, setAnimationActive] = useState(true)
  const [currentHeaderIndex, setCurrentHeaderIndex] = useState(3)
  const [homeOctagon, setHomeOctagon] = useState<any[]>([])
  const [slicedHomeOctagon, setSlicedHomeOctagon] = useState<any[][]>([])
  const [currentSlicedIndex, setCurrentSlicedIndex] = useState(0)
  const [octagonData, setOctagonData] = useState<any[]>([])
  const [tableData, setTableData] = useState<any[]>([])

  const octagonSize = useResponsiveValue({
    base: 350,
    sm: 450,
    md: 490,
  })
  const tableWidth = useResponsiveValue<string | number>({
    base: '100vw',
    lg: 978,
  })
  const width = useWindowWidth()

  const { isMd } = useBreakpoints()

  const roofWidth = useResponsiveValue({ base: 0.85, sm: 0.8, md: 850 })

  function chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      const slicedData = arr.slice(i, i + chunkSize)
      result.push(['', '', ...slicedData])
    }
    return result
  }

  function handleNextSlice() {
    setAnimationActive(false)
    if (currentSlicedIndex < slicedHomeOctagon.length - 1) {
      setOctagonData(slicedHomeOctagon[currentSlicedIndex + 1])
      setCurrentSlicedIndex((prev) => prev + 1)
    }
  }

  function handlePreviousSlice() {
    setAnimationActive(false)
    if (currentSlicedIndex > 0) {
      setOctagonData(slicedHomeOctagon[currentSlicedIndex - 1])
      setCurrentSlicedIndex((prev) => prev - 1)
    }
  }

  const getHomeOctagonTags = async () => {
    const res = await fetch('/api/tag/filter-by-type?typeKey=homeoctagon&limit=200', {
      method: 'GET',
    })

    const result = await res.json()
    if (result.docs && result.docs.length > 0) {
      const docs: any[] = result.docs
      setHomeOctagon(docs)

      setSlicedHomeOctagon(chunkArray(docs, 6))
      const slicedData = docs.slice(0, 6)
      const newArray = ['', '', ...slicedData]
      setOctagonData(newArray)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getHomeOctagonTags()
  }, [])

  useEffect(() => {
    if (!animationActive) return // Stop the effect if animationActive is false

    const interval = setInterval(() => {
      setCurrentHeaderIndex((prevIndex) => (prevIndex === 7 ? 2 : prevIndex + 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [animationActive])

  // useEffect(() => {
  //   if (homeOctagon.length > 0) {
  //     const slicedData = homeOctagon.slice(0, 6)
  //     const newArray = [slicedData[0], '', '', ...slicedData.slice(1)]
  //     setOctagonData(newArray)
  //   }
  // }, [homeOctagon])

  useEffect(() => {
    if (homeOctagon.length > 0) {
      setTableData(
        homeOctagon.map((data, index) => {
          return {
            id: index,
            oldSocial: data?.tagTitles[0]?.tagTitle ?? '',
            newSocial: data?.tagTitles[1]?.tagTitle ?? '',
            possibilities: data?.description ?? '',
          }
        }),
      )
    }
  }, [homeOctagon])

  return (
    <div className="relative flex h-full min-h-screen w-full max-w-[1440px] flex-col overflow-hidden">
      <div
        className="absolute left-0 top-0 pointer-events-none  flex h-full w-full flex-col bg-top bg-repeat-x"
        style={{
          backgroundImage: `url("/assets/home/banner.png")`,
        }}
      />

      <BodyCard
        title={'The Big Bloom'}
        strokeWidth={4}
        stroke="#9880A1"
        // className={twMerge(
        //   'z-0 mt-[535px] flex h-full w-full flex-col justify-start bg-gradient-to-t from-[#8657B3] to-[#3E2A55]',
        //   isTableOpen ? 'min-h-[3500px]' : 'min-h-[1727px]',
        // )}
        className={twMerge(
          'z-0 mt-[535px] flex h-full w-full flex-col justify-start before:absolute before:inset-0 before:bg-[radial-gradient(circle,#8858B5_26%,#100E1A_100%)] before:z-0 after:absolute after:inset-0 after:bg-gradient-to-l after:from-[#8C4587] after:to-[#6C1B67] after:z-0 transition-all ease-in-out',
        )}
        roofWidth={roofWidth}
        roofAngle={38}
        headerCardProps={{
          strokeWidth: 4,
          tipAngle: 75,
          stroke: '#C6AED4',
          className:
            'text-[22px] text-[#FFF200] bg-gradient-to-t from-[#38254D] to-[#926BC0] h-[65px] md:h-[88px] min-w-[80%] max-w-[300px] sm:min-w-[420px] md:min-w-[554.63px] md:max-w-[554.63px] !px-0',
          classNames: {
            name: 'h-full w-full flex justify-center items-center',
            outerTitle:
              'text-[22px] leading-[44.6px] sm:text-[28px] sm:leading-[54.6px] md:text-[36px] md:leading-[76.07px] font-black',
          },
        }}
      >
        <div className="w-full flex flex-col items-center">
          <p className="mb-14 mt-[85px] max-w-[544px] text-center text-[18px] sm:text-[20px] md:text-[22px] font-bold text-[#F9F9FB] px-3">
            Amidst all the talk of p⟨doom⟩ — climate anxiety, loneliness, the loss of faith in
            institutions — we’re exploring p⟨bloom⟩. We see a new social ecosystem emerging, with
            minds blooming like gardens, and hearts daring to hope again. 
          </p>
          {/* <div className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[490px] md:h-[490px]"></div> */}

          {isLoading ? (
            <div className="h-[300px]"></div>
          ) : (
            <>
              <div style={{ width: octagonSize, height: octagonSize }}>
                <NewOctagon
                  currentHeaderIndex={currentHeaderIndex}
                  octagonData={octagonData}
                  setCurrentHeaderIndex={setCurrentHeaderIndex}
                  setAnimationActive={setAnimationActive}
                />
              </div>

              <div className="z-20 w-full mt-[-57px] sm:mt-[-72px] md:mt-[-80px]">
                {/* <p className="flex h-[33px] sm:h-[40px] md:h-[48px] items-center justify-center text-[18px] sm:text-[20px] md:text-[22px] font-bold text-[#EBE9F6]">
                beta Q3 2025
              </p> */}
                <div className="flex items-center justify-center gap-6">
                  <DesignContextProvider stroke="#FFF200">
                    <HeaderCard
                      stroke="white"
                      text={octagonData[currentHeaderIndex]?.name ?? ''}
                      classNames={{
                        title: 'text-[30px] font-black',
                        name: 'h-full w-full flex justify-center items-center',
                        outerTitle:
                          'text-[22px] leading-[31.08px] sm:text-[26px] sm:leading-[33.08px] md:text-[30px] md:leading-[36.57px] font-black text-white',
                        base: 'bg-[#f469b5] w-[90%] max-w-[344px] sm:min-w-[400px] md:min-w-[419px] h-[52.14px] sm:h-[68px] md:h-[74px]',
                        nodes: 'h-[38.5px] sm:h-[46px] bg-[#F6AA22] text-[#FFF200]',
                      }}
                      withNodes
                      nodeStrokeWidth={4}
                      nodeStroke="#FFF200"
                      leftNodeContent={
                        <button onClick={handlePreviousSlice} className="h-full w-full">
                          <ChevronLeftIcon />
                        </button>
                      }
                      rightNodeContent={
                        <button onClick={handleNextSlice} className="h-full w-full">
                          <ChevronRightIcon />
                        </button>
                      }
                    />
                  </DesignContextProvider>
                </div>
              </div>

              <Trapezoid
                className="mt-[-37px] sm:mt-[-37px] flex h-[110px] w-[95%] max-w-[634px] items-end bg-[#3D245B]"
                strokeWidth={0}
                slopeAngle={width < 400 ? 30 : undefined}
              >
                <div className="flex w-full items-center justify-center sm:justify-between gap-5 pb-[12px]">
                  <span className="w-[43%] text-right text-[18px] sm:text-[22px] md:text-[26px] font-extrabold text-color-2">
                    {/* profiles */}
                    {octagonData[currentHeaderIndex]?.tagTitles[0]?.tagTitle ?? ''}
                  </span>
                  <DoubleRightIcon />
                  <span className="w-[43%] text-[18px] sm:text-[22px] md:text-[26px] font-extrabold text-color-2">
                    {/* gardens */}
                    {octagonData[currentHeaderIndex]?.tagTitles[1]?.tagTitle ?? ''}
                  </span>
                </div>
              </Trapezoid>

              <div style={{ width: tableWidth, minHeight: 319 }} className="flex flex-col">
                <div className="relative">
                  <Trapezoid
                    strokeWidth={0}
                    as={motion.div}
                    style={{ height: 319, width: 1268 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isTableOpen ? 0 : 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    stroke="white"
                    className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 flex-col justify-start bg-gradient-to-b from-color-7 to-color-7/0"
                  />
                  <Trapezoid
                    strokeWidth={isTableOpen && isMd ? 2 : 0}
                    borderWidths={[0]}
                    style={{
                      height: 172,
                      backgroundColor: isTableOpen && isMd ? 'rgb(var(--color-2))' : 'transparent',
                    }}
                    slopeAngle={isMd ? undefined : 0}
                    stroke="white"
                    className="w-full flex-col justify-start gap-3"
                    overflow
                  >
                    <Typography className="max-w-[582px] min-h-[150px] md:min-h-[140px] py-8 px-3 text-center text-[16px] sm:text-[18px] font-bold">
                      {/* In ⟨inner⟩Garden, growth follows the cycles of nature. You’re not locked into a
                    timeline; instead your garden reflects where you are in your emotional seasons. */}
                      {octagonData[currentHeaderIndex]?.description ?? ''}
                    </Typography>
                    <Button
                      isIconOnly
                      polygon={RegularPolygon}
                      sides={8}
                      strokeWidth={3}
                      stroke="#FFF200"
                      className="z-10 -mt-3 md:-mt-1 self-center bg-[#F6AA22] text-[#FFF200]"
                      onClick={() => setIsTableOpen((prev) => !prev)}
                    >
                      {isTableOpen ? <CloseIcon /> : <ChevronDownIcon />}
                    </Button>
                  </Trapezoid>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isTableOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <WellgorithmsTable tableData={tableData} />
                  </motion.div>
                </div>
              </div>
            </>
          )}

          <div className={twMerge('w-full', isTableOpen ? 'h-[700px]' : 'h-[500px]')}></div>
        </div>
      </BodyCard>
    </div>
  )
}

export default BigBloom
