'use client'
import React, { PropsWithChildren } from 'react'
import { IntegralIcon } from '@/components/atoms/icons'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { useWordsContext } from '@/app/(frontend)/_templates/_context/words'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'
import { useDesignContext } from '@/hooks/use-design-context'
import Textarea from '@/components/atoms/input/textarea'

const Page: React.FC<Props> = (props) => {
  const { words: selectedWords } = useWordsContext()

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
        className="absolute w-full h-[228px] bg-[#5A2761] top-0 z-0"
        roofWidth={0.65}
        roofAngle={designAngle}
        stroke={stroke}
        door={{ width: 0.5, height: 50 }}
        borderWidths={[0, 0, 0, 0, 'default', 'default', 'default', 'default', 'default', 0]}
      >
        <div className="flex flex-col w-[262px] ">
          <Textarea
            className="text-center font-black"
            variant="underlined"
            placeholder="| my challenge is ..."
            color="primary"
            classNames={{
              innerWrapper: 'justify-center',
              input: 'w-auto font-black',
            }}
          />
        </div>
      </HouseHexagon>
    </section>
  )
}

interface Props {}

export default Page
