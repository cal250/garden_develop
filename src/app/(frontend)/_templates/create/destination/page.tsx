'use client'
import React, { PropsWithChildren } from 'react'
import { IntegralIcon } from '@/components/atoms/icons'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { useWordsContext } from '@/app/(frontend)/_templates/_context/words'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'
import { useDesignContext } from '@/hooks/use-design-context'
import { Button } from '@/components/atoms/button'
import { useRouter } from 'next/navigation'

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
        door={{ width: 0.5, height: 50 }}
        borderWidths={[0, 0, 0, 0, 'default', 'default', 'default', 'default', 'default', 0]}
      >
        <p className="text-[24px] font-bold text-[#F5C1D8] max-w-[500px] text-center mt-[60px]">
          Let your spirit run free, blooming in every direction
        </p>

        <div className="flex gap-8 absolute bottom-[20px]">
          <div className="relative">
            <Button
              onPress={() => {
                router.push('/templates/create/sprout')
              }}
              polygon={Rexagon}
              className="bg-color-2 w-[254px] h-[61px] text-[#564A8D] font-bold text-[24px]"
              strokeWidth={0}
            >
              share
            </Button>
            <img
              src="/assets/create/share.png"
              alt=""
              className="size-[40px] absolute top-0 left-1/2 -translate-y-3/4 -translate-x-1/2"
            />
          </div>
          <div className="relative">
            <Button
              onPress={() => {
                router.push('/templates/create/sprout')
              }}
              polygon={Rexagon}
              className="bg-color-2 w-[254px] h-[61px] font-bold text-[#564A8D] text-[24px]"
              strokeWidth={0}
            >
              sprout
            </Button>
            <img
              src="/assets/create/sprout.png"
              alt=""
              className="size-[40px] absolute top-0 left-1/2 -translate-y-3/4 -translate-x-1/2"
            />
          </div>
        </div>
      </HouseHexagon>
    </section>
  )
}

interface Props {}

export default Page
