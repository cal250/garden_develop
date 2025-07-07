'use client'
import React, { PropsWithChildren } from 'react'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { useWordsContext } from '@/app/(frontend)/_templates/_context/words'
import { useDesignContext } from '@/hooks/use-design-context'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { IntegralIcon } from '@/components/atoms/icons'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'
import { Trapezoid } from '@/components/atoms/polygon/trapezoid'
import { Button } from '@/components/atoms/button'
import { useRouter } from 'next/navigation'
import BracketedText from '@/components/molecules/bracketed-text/bracketed-text'
import { StormyIcon } from '@/app/(frontend)/_templates/_icons/stormy-icon'
import { SunnyIcon } from '@/app/(frontend)/_templates/_icons/sunny-icon'
import { CloudyIcon } from '@/app/(frontend)/_templates/_icons/cloudy-icon'
import { PartlyCloudyIcon } from '@/app/(frontend)/_templates/_icons/partly-cloudy-icon'
import { RainbowIcon } from '@/app/(frontend)/_templates/_icons/rainbow-icon'

const Page: React.FC<Props> = (props) => {
  const { words: selectedWords } = useWordsContext()
  const router = useRouter()

  const { designAngle, stroke } = useDesignContext({})

  return (
    <section className="mt-[-44px] flex flex-col items-center gap-[30px]">
      <Rexagon
        className="h-[88px] w-[607px] text-[36px] font-black z-10"
        style={{
          background:
            'radial-gradient(39.95% 82.08% at 56.81% 47.94%, #825FA3 3.4%, #100E1A 99.68%)',
        }}
      >
        <div
          className="grid items-center w-full gap-[40px]"
          style={{
            gridTemplateColumns: `repeat(${selectedWords.length}, 1fr)`,
          }}
        >
          <span className="justify-self-end">{selectedWords[0]}</span>
          {selectedWords.length === 2 && (
            <>
              <IntegralIcon className="absolute h-full text-color-2 scale-[2] left-1/2 -translate-x-1/2" />
              <span className="justify-self-start">{selectedWords[1]}</span>
            </>
          )}
        </div>
      </Rexagon>

      <HouseHexagon
        className="absolute w-full h-[258px] bg-[#5A2761] top-0 z-0 items-start"
        roofWidth={0.65}
        roofAngle={designAngle}
        stroke={stroke}
        overflow
      >
        <p className="text-[24px] font-bold text-[#F5C1D8] max-w-[500px] text-center mt-[80px]">
          Let your spirit run free, blooming in every direction
        </p>
      </HouseHexagon>
      <div className="mt-[130px] flex flex-col gap-20 items-center z-10">
        <Rectagon
          className="flex justify-start items-start gap-4 w-[1032px] h-[700px]"
          chamferLength={100}
          strokeWidth={4}
          stroke="#F5C1D8"
          style={{
            background: 'radial-gradient(60.99% 70.83% at 50% 80.7%, #8858B5 0%, #4E336A 90.13%)',
          }}
        >
          <div className="w-[250px] flex items-center h-full bg-[#00000030]">
            <div className="flex flex-col w-full">
              <button className="w-full h-[80px] bg-[#8858B5] flex pl-10 justify-start items-center">
                <BracketedText outerText="Weather" className="text-[20px] font-black">
                  inner
                </BracketedText>
              </button>
              <button className="w-full h-[80px] bg-[#FFFFFF14] flex pl-10 justify-start items-center">
                <BracketedText outerText="Stacks" className="text-[20px] font-black">
                  inner
                </BracketedText>
              </button>
              <button className="w-full h-[80px] pl-10 justify-start items-center flex">
                <BracketedText outerText="Tags" className="text-[20px] font-black">
                  inner
                </BracketedText>
              </button>
              <button className="w-full h-[80px] bg-[#FFFFFF14] flex pl-10 justify-start items-center">
                <BracketedText outerText="Privacy" className="text-[20px] font-black">
                  inner
                </BracketedText>
              </button>
              <button className="w-full h-[80px] flex pl-10 justify-start items-center">
                <BracketedText outerText="Petals" className="text-[20px] font-black">
                  inner
                </BracketedText>
              </button>
              <button className="w-full h-[80px] bg-[#FFFFFF14] flex pl-10 items-center justify-start">
                <BracketedText outerText="XR" className="text-[20px] font-black">
                  inner
                </BracketedText>
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-start gap-20">
            <Trapezoid
              className="w-[372px] h-[54px] bg-color-2 text-[24px] text-[#564A8D] font-bold"
              inverted
              strokeWidth={0}
            >
              <span>fertilize</span>
            </Trapezoid>
            <p className="font-bold text-[24px] text-center max-w-[395px]">
              What is the climate of your emotions at the moment?
            </p>
            <div className="grid grid-rows-2">
              <div className="grid grid-cols-5 gap-6">
                <div className="flex flex-col items-center gap-4">
                  <span className="size-[76px] flex items-center justify-center">
                    <StormyIcon />
                  </span>
                  <span className="text-white text-[16px] font-medium">stormy</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="size-[76px] flex items-center justify-center">
                    <SunnyIcon />
                  </span>
                  <span className="text-white text-[16px] font-medium">sunny</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="size-[76px] flex items-center justify-center">
                    <CloudyIcon />
                  </span>
                  <span className="text-color-2 text-[16px] font-bold">cloudy</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="size-[76px] flex items-center justify-center">
                    <PartlyCloudyIcon />
                  </span>
                  <span className="text-white text-[16px] font-bold">partly cloudy</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="size-[76px] flex items-center justify-center">
                    <RainbowIcon />
                  </span>
                  <span className="text-white text-[16px] font-bold">rainbow</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-6">
                <div className="flex flex-col items-center gap-4">
                  <span className="size-[76px] flex items-center justify-center">
                    <StormyIcon />
                  </span>
                  <span className="text-white text-[16px] font-medium">stormy</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="size-[76px] flex items-center justify-center">
                    <SunnyIcon />
                  </span>
                  <span className="text-white text-[16px] font-medium">sunny</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="size-[76px] flex items-center justify-center">
                    <CloudyIcon />
                  </span>
                  <span className="text-color-2 text-[16px] font-bold">cloudy</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="size-[76px] flex items-center justify-center">
                    <PartlyCloudyIcon />
                  </span>
                  <span className="text-white text-[16px] font-bold">partly cloudy</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="size-[76px] flex items-center justify-center">
                    <RainbowIcon />
                  </span>
                  <span className="text-white text-[16px] font-bold">rainbow</span>
                </div>
              </div>
            </div>
          </div>
        </Rectagon>
        <Button
          polygon={Rexagon}
          onPress={() => {
            router.push('/templates/create/sprout/harvest')
          }}
          overflow
          strokeWidth={0}
          className="text-[#564A8D] bg-color-2 font-bold text-[24px] w-[383px] h-[61px] relative"
        >
          <img
            src="/assets/create/share-sprout.png"
            alt=""
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
          />
          share your sprout
        </Button>
      </div>
    </section>
  )
}

interface Props {}

export default Page
