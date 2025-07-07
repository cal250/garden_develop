'use client'
import BracketedText from '@/components/molecules/bracketed-text/bracketed-text'
import React from 'react'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { Button } from '@/components/atoms/button'
import { IntegralIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/navigation'

const WordPage: React.FC<Props> = (props) => {
  const router = useRouter()

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
          <BracketedText outerText="Words" className="font-black text-[36px]">
            inner
          </BracketedText>
        </div>
      </Rexagon>
      <div className="flex flex-col gap-8 items-center text-center">
        <p className="font-bold text-[16px]">
          capture your energy in a word, or fuse two words - <br /> inner feeling meets outer
          reality.
        </p>
        <div className="flex gap-10">
          <div className="relative">
            <Button
              polygon={Rexagon}
              onPress={() => {
                router.push('/templates/create/word/single')
              }}
              className="w-[307px] h-[64px] text-[22px] text-color-2 font-bold justify-around px-8"
              style={{
                background:
                  'radial-gradient(57.12% 82.08% at 55.45% 47.94%, #825FA3 3.4%, #100E1A 99.68%)',
              }}
            >
              <span>single</span>
              <span>word</span>
            </Button>
            <IntegralIcon className="scale-[4] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-color-2 pointer-events-none" />
          </div>
          <div className="relative">
            <Button
              polygon={Rexagon}
              onPress={() => {
                router.push('/templates/create/word/double')
              }}
              className="w-[307px] h-[64px] text-[22px] text-color-2 font-bold justify-around px-8"
              style={{
                background:
                  'radial-gradient(57.12% 82.08% at 55.45% 47.94%, #825FA3 3.4%, #100E1A 99.68%)',
              }}
            >
              <span>double</span>
              <span>word</span>
            </Button>
            <IntegralIcon className="scale-[4] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-color-2 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}

interface Props {}

export default WordPage
