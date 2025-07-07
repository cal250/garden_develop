'use client'

import React from 'react'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { useWordsContext } from '@/app/(frontend)/_templates/_context/words'

const Page: React.FC<PageProps> = (props) => {
  const { words } = useWordsContext()
  return (
    <section className="mt-[-44px] flex flex-col items-center gap-[30px]">
      <Rexagon
        className="h-[88px] w-[607px] text-[36px] font-black"
        style={{
          background:
            'radial-gradient(39.95% 82.08% at 56.81% 47.94%, #825FA3 3.4%, #100E1A 99.68%)',
        }}
      >
        <span>{words[0]}</span>
      </Rexagon>
    </section>
  )
}

interface PageProps {}

export default Page
