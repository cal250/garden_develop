'use client'

import React from 'react'
import { Textarea } from '@/components/atoms/input'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { HeaderCard } from '@/components/molecules/header-card/header-card'
import { Link } from '@/components/atoms/link'

const WelcomeSignPage: React.FC<WelcomeSignPageProps> = (props) => {
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
        <Link className="text-color-2 font-bold text-[22px]" href="">
          welcome
        </Link>
        <Link className="font-bold text-[22px] text-white" href="">
          wellgorithms
        </Link>
        <Link className="font-bold text-[22px] text-white" href="">
          gardens
        </Link>
        <Link className="font-bold text-[22px] text-white" href="">
          points
        </Link>
      </div>
      <Textarea
        placeholder={`| write a short bio
                a welcome sign, or a guiding intention`}
        classNames={{
          input:
            'text-[#475836] text-[15px] md:text-[20px] leading-[18.16px] md:leading-[24.38px] text-center font-bold placeholder:text-white',
          inputWrapper:
            'w-[623px] h-[118px] py-8 flex justify-center before:bg-[radial-gradient(107.86%_128.39%_at_88.14%_47.94%,_#825FA3_3.4%,_#5A2761_99.68%)]',
        }}
        stroke="#825FA3"
        polygon={Rexagon}
      />
    </section>
  )
}

interface WelcomeSignPageProps {}

export default WelcomeSignPage
