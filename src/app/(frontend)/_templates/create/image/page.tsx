'use client'
import React, { PropsWithChildren } from 'react'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { IntegralIcon, SearchIcon } from '@/components/atoms/icons'
import { useWordsContext } from '@/app/(frontend)/_templates/_context/words'
import { Input } from '@/components/atoms/input'
import { Rectagon } from '@/components/atoms/polygon/rectagon'

const Page: React.FC<Props> = (props) => {
  const { words: selectedWords } = useWordsContext()

  return (
    <section className="mt-[-44px] flex flex-col items-center gap-[30px]">
      <Rexagon
        className="h-[88px] w-[607px] text-[36px] font-black"
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
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => {
          return (
            <Rectagon chamferLength={30} className="w-[110px] h-[78px]" key={index} as="button">
              <img src="/assets/create/gallery.png" alt="" />
            </Rectagon>
          )
        })}
      </div>
    </section>
  )
}

interface Props {}

export default Page
