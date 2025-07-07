'use client'

import React from 'react'
import { Input } from '@/components/atoms/input'
import { Rexagon } from '@/components/atoms/polygon/rexagon'

const NamePage: React.FC<NamePageProps> = (props) => {
  return (
    <section className="mt-[145px] flex flex-col items-center gap-[30px]">
      <Input
        placeholder="| how would you like to be known"
        classNames={{
          input:
            'text-[#475836] text-[15px] md:text-[20px] leading-[18.16px] md:leading-[24.38px] text-center font-bold placeholder:text-[#FEF200]',
          inputWrapper:
            'w-[546px] h-[69px] sm:h-[60px] md:h-[69px] flex justify-center before:absolute before:inset-0 before:bg-[radial-gradient(107.86%_128.39%_at_88.14%_47.94%,_#825FA3_3.4%,_#100E1A_99.68%)] before:z-0 after:absolute after:inset-0 after:bg-[#1E2C27] after:opacity-50 after:z-0 ',
        }}
        stroke="#825FA3"
        polygon={Rexagon}
      />
      <p className="font-bold text-center text-[20px]">
        Choose a name that reflects your &lt;inner&gt;Journey, <br /> like &apos;grateful
        gardener&apos; or &apos;blooming heart&apos;
      </p>
    </section>
  )
}

interface NamePageProps {}

export default NamePage
