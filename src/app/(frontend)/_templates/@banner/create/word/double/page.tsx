'use client'

import OctagonBannerLayout from '@/app/(frontend)/_templates/@banner/_components/OctagonBannerLayout'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { Input } from '@/components/atoms/input'
import { SearchIcon } from '@/components/atoms/icons'
import React from 'react'
import BracketedText from '@/components/molecules/bracketed-text/bracketed-text'
import { useWordsContext } from '@/app/(frontend)/_templates/_context/words'

const Page: React.FC<PageProps> = () => {
  const { words: selectedWords } = useWordsContext()
  return (
    <OctagonBannerLayout>
      <RegularPolygon
        sides={8}
        className="w-full h-full items-start"
        style={{
          background:
            'conic-gradient(from 89.99deg at 50% 50%, #100E1A 0deg, #100E1A 212.4deg, #825FA3 313.2deg, #100E1A 360deg)',
        }}
      >
        <div className="flex flex-col gap-4  items-center py-10">
          <RegularPolygon sides={8} className="size-[122px]">
            <img src="/assets/home/avatar.png" alt="" className="w-full h-full" />
          </RegularPolygon>
          <div className="flex flex-col items-center">
            <span className="text-white text-[20px]">choose your</span>
            <div className="">
              {selectedWords.length === 0 ? (
                <BracketedText className="text-[46px] font-black gap-2 flex">inner</BracketedText>
              ) : (
                <span className="text-[46px] font-black">outer</span>
              )}
            </div>
            {selectedWords.length < 2 && <span className="text-[16px] font-bold">word</span>}
            <div className="flex flex-col w-[262px] pt-4 ">
              <Input
                className="text-white text-center"
                variant="underlined"
                startContent={<SearchIcon />}
                placeholder="search"
                color="primary"
                classNames={{
                  innerWrapper: 'justify-center',
                  input: 'w-auto text-center',
                }}
              />
              <span className="w-full h-[2px] bg-[#cccccc]"></span>
            </div>
          </div>
        </div>
      </RegularPolygon>
    </OctagonBannerLayout>
  )
}

interface PageProps {}

export default Page
