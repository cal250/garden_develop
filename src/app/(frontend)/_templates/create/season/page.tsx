'use client'
import React from 'react'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import BracketedText from '@/components/molecules/bracketed-text/bracketed-text'
import { Input } from '@/components/atoms/input'
import { SearchIcon } from '@/components/atoms/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/atoms/button'

const Page: React.FC<PageProps> = (props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentSeason = searchParams?.get('season')

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
          <BracketedText
            outerText={currentSeason ? 'Cultivation' : 'Season'}
            className="font-black text-[36px]"
          >
            inner
          </BracketedText>
        </div>
      </Rexagon>

      {currentSeason ? (
        <div className="flex flex-col gap-16 items-center">
          <p className="font-bold">Would you like to plant a seed or pluck a weed?</p>
          <div className="flex gap-12">
            <div className="relative">
              <Button
                onPress={() => {
                  router.push('/templates/create/energy')
                }}
                polygon={Rexagon}
                className="bg-color-2 w-[254px] h-[61px] text-black font-[24px]"
                strokeWidth={0}
              >
                seed
              </Button>
              <img
                src="/assets/create/seed.png"
                alt=""
                className="size-[40px] absolute top-0 left-1/2 -translate-y-3/4 -translate-x-1/2"
              />
            </div>
            <div className="relative">
              <Button
                onPress={() => {
                  router.push('/templates/create/energy')
                }}
                polygon={Rexagon}
                className="bg-color-2 w-[254px] h-[61px] text-black font-[24px]"
                strokeWidth={0}
              >
                weed
              </Button>
              <img
                src="/assets/create/weed.png"
                alt=""
                className="size-[40px] absolute top-0 left-1/2 -translate-y-3/4 -translate-x-1/2"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <p className="font-bold max-w-[545px] text-center">
            Here, seasons don’t follow time—they follow transformation. Change yours whenever you
            feel the call.
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
          <p className="font-bold text-[12px] opacity-50 text-center">
            what are you in the mood for? <br />
            enter a keyword, and we&#39;ll recommend a season
          </p>
        </div>
      )}
    </section>
  )
}

interface PageProps {}

export default Page
