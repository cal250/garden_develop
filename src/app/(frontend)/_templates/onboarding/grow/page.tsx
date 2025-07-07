'use client'

import React from 'react'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { HeaderCard } from '@/components/molecules/header-card/header-card'
import { Button } from '@/components/atoms/button'

const GrowPage: React.FC<GrowPageProps> = (props) => {
  return (
    <section className="mt-[-44px] flex flex-col items-center gap-[30px]">
      <HeaderCard
        text="grateful gardener"
        classNames={{
          title: 'text-[32px] text-color-1 font-black',
          outerTitle: 'text-white',
          base: 'w-[523px] h-[88.5px] before:bg-[radial-gradient(46.44%_82.08%_at_49.97%_47.94%,_#825FA3_3.4%,_#100E1A_99.68%)]',
        }}
      />
      <div className="flex gap-8">
        <p className="text-white font-black text-[24px]">ready to grow?</p>
      </div>
      <div className="flex gap-10 items-center py-10">
        <Button
          polygon={Rexagon}
          overflow
          className="bg-color-2 text-black w-[260px] h-[73px] flex flex-col gap-0 relative"
          strokeWidth={0}
        >
          <span className="text-[20px] font-bold">explore</span>
          <span className="text-[22px] font-black">wellgorithms</span>
          <img
            src="/assets/onboarding/gold-telescope.png"
            className="w-10 h-10 absolute -top-6 left-1/2 -translate-x-1/2"
          />
        </Button>
        <Button
          polygon={Rexagon}
          overflow
          className="bg-color-2 text-black w-[260px] h-[73px] flex flex-col gap-0 relative"
          strokeWidth={0}
        >
          <span className="text-[20px] font-bold">seed a </span>
          <span className="text-[22px] font-black">wellgorithm</span>
          <img
            src="/assets/onboarding/seedling.png"
            className="w-10 h-10 absolute -top-6 left-1/2 -translate-x-1/2"
          />
        </Button>
      </div>
    </section>
  )
}

interface GrowPageProps {}

export default GrowPage
