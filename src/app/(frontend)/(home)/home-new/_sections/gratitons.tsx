'use client'

import React from 'react'
import { BodyCard } from '@/components/organisms/body-card/body-card'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/atoms/icons'
import { Trapezoid } from '@/components/atoms/polygon/trapezoid'
import { SmoothCounter } from '@/components/atoms/smooth-counter'
import { DesignContextProvider, useDesignContext } from '@/hooks/use-design-context'
import { NewVideoCard } from '../components/new-video-card'

export const Gratitons: React.FC<GratitonsProps> = ({
  gratitonsData,
  isLoading,
  handleNext,
  handlePrev,
}) => {
  const { designAngle } = useDesignContext()
  return (
    <DesignContextProvider stroke="#88A376" strokeWidth={4}>
      <BodyCard
        title={isLoading ? '...' : gratitonsData.title}
        className="bg-unset via-unset mt-[-505px] min-h-[1568px] w-full justify-start from-[#475836] to-[#799957] flex flex-col max-w-[1440px] items-center z-0"
        style={{
          background:
            'radial-gradient(46.91% 52.06% at 49.97% 47.94%, #618E7F 42.61%, #264038 99.68%)',
        }}
        roofAngle={38}
        headerCardProps={{
          tipAngle: 75,
          className:
            'text-[22px] font-black text-white h-[65px] md:h-[88px] min-w-[90%] max-w-[300px] sm:min-w-[420px] md:min-w-[554.63px] md:max-w-[554.63px]',

          withNodes: true,
          classNames: {
            name: 'h-full w-full flex justify-center items-center',
            nodes: 'bg-[#EFAF42] h-[42.5px] md:h-[83px]',
            outerTitle:
              'text-[22px] leading-[44.6px] sm:text-[28px] sm:leading-[54.6px] md:text-[36px] md:leading-[76.07px] font-black text-white',
          },
          style: {
            background:
              'radial-gradient(46.44% 82.08% at 49.97% 47.94%, #618E7F 3.4%, #264038 99.68%)',
          },
          leftNodeContent: (
            <button onClick={handlePrev} className="h-[42.5px] md:h-[83px] w-full">
              <ChevronLeftIcon className="h-4 md:h-10" />
            </button>
          ),
          rightNodeContent: (
            <button onClick={handleNext} className="h-[42.5px] md:h-[83px] w-full">
              <ChevronRightIcon className="h-4 md:h-10" />
            </button>
          ),
        }}
      >
        {/* <p className="max-w-[591px] pt-[50px] md:pt-[68px] px-3 text-center text-[18px] sm:text-[20px] md:text-[22px] font-bold">
          &#34;Gratitons&#34; by Sophia — Particles of gratitude that ripple through your emotional
          system, bringing joy and warmth.
        </p> */}
        <p className="max-w-[591px] mt-[50px] md:mt-[68px] px-3 text-center text-[18px] sm:text-[20px] md:text-[22px] font-bold">
          {isLoading ? '' : gratitonsData.description}
        </p>
        <div className="mt-[82px] flex w-full max-w-[823px] gap-4 md:gap-9 px-3">
          <div className="flex flex-1 flex-col gap-[10px] text-center">
            <SmoothCounter
              value={712}
              polygon={Trapezoid}
              strokeWidth={6}
              duration={4000}
              slopeAngle={{ left: 90 - designAngle }}
              className="h-[57px] md:h-[119px] bg-[#F8771B] pl-10 md:pl-20 text-[28px] md:text-[60px] font-extrabold"
            />
            <span className="pl-5 md:pl-20 text-[14px] md:text-[20px] font-bold text-color-2">
              new words this week
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-[10px] text-center">
            <SmoothCounter
              value={8712}
              polygon={Trapezoid}
              strokeWidth={6}
              frequency={10}
              duration={4000}
              slopeAngle={{ right: 90 - designAngle }}
              className="h-[57px] md:h-[119px] bg-[#F8771B] pr-10 md:pr-20 text-[28px] md:text-[60px] font-extrabold"
            />
            <span className="pr-10 md:pr-20 text-[14px] md:text-[20px] font-bold text-color-2">
              new words all time
            </span>
          </div>
        </div>
        <NewVideoCard />
      </BodyCard>
    </DesignContextProvider>
  )
}

interface GratitonsProps {
  gratitonsData: { title: string; description: string }
  isLoading: boolean
  handlePrev: () => void
  handleNext: () => void
}
