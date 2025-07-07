'use client'
import BracketedText from '@/components/molecules/bracketed-text/bracketed-text'
import React from 'react'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { Input } from '@/components/atoms/input'
import { SearchIcon } from '@/components/atoms/icons'

const EnergyPage: React.FC<EnergyPageProps> = (props) => {
  return (
    <section className="mt-[-44px] flex flex-col items-center gap-[30px]">
      <Rexagon
        className="h-[88px] w-[607px]"
        style={{
          background:
            'radial-gradient(39.95% 82.08% at 56.81% 47.94%, #825FA3 3.4%, #100E1A 99.68%)',
        }}
      >
        <div className="flex flex-col items-center">
          <div className="mb-[-10px]">
            <span className="text-[15px] mt-[10px] font-bold">choose your</span>
          </div>
          <BracketedText outerText="Soil" className="font-black text-[36px]">
            inner
          </BracketedText>
        </div>
      </Rexagon>
      <div className="flex flex-col gap-8 items-center text-center">
        <p className="font-bold text-[16px]">Awesome! Spring is the season of ...</p>
        <p className="font-bold text-[16px]">
          In this season, where do you want to focus your energy?
        </p>
        <div className="flex flex-col w-[262px] ">
          <Input
            className="text-[#825FA3] text-center"
            variant="underlined"
            startContent={<SearchIcon />}
            placeholder="search"
            color="primary"
            classNames={{
              innerWrapper: 'justify-center',
              input: 'w-auto',
            }}
          />
          <span className="w-full h-[2px] bg-[#825FA3]"></span>
        </div>
      </div>
    </section>
  )
}

interface EnergyPageProps {
}

export default EnergyPage
