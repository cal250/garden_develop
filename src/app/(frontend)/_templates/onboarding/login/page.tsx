'use client'

import React from 'react'
import { Input } from '@/components/atoms/input'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { Link } from '@/components/atoms/link'
import Button from '@/components/atoms/button/button'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { YoutubeIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/navigation'

const LoginPage: React.FC<PageProps> = (props) => {
  const router = useRouter()
  return (
    <div
      className={`w-[80%] mt-[-25px] sm:mt-[-30px] md:mt-[-36px] flex flex-col items-center gap-8 md:gap-[47px] transition-all ease-in-out`}
    >
      <div className="flex items-center gap-8">
        <Input
          placeholder="| email"
          classNames={{
            input:
              'text-[#475836] text-[15px] md:text-[20px] leading-[18.16px] md:leading-[24.38px] text-center font-bold placeholder:text-[#FEF200]',
            inputWrapper:
              'w-[349px] h-[52px] sm:h-[60px] md:h-[69px] flex justify-center before:absolute before:inset-0 before:bg-[radial-gradient(107.86%_128.39%_at_88.14%_47.94%,_#825FA3_3.4%,_#100E1A_99.68%)] before:z-0 after:absolute after:inset-0 after:bg-[#1E2C27] after:opacity-50 after:z-0 ',
          }}
          stroke="#825FA3"
          polygon={Rexagon}
        />

        <div className="flex flex-col items-center gap-1 relative">
          <Input
            placeholder="| password"
            type="password"
            classNames={{
              input:
                'text-[#475836] text-[15px] md:text-[20px] leading-[18.16px] md:leading-[24.38px] text-center font-bold placeholder:text-[#FEF200]',
              inputWrapper:
                'w-[349px] h-[52px] sm:h-[60px] md:h-[69px] flex justify-center before:absolute before:inset-0 before:bg-[radial-gradient(107.86%_128.39%_at_88.14%_47.94%,_#825FA3_3.4%,_#100E1A_99.68%)] before:z-0 after:absolute after:inset-0 after:bg-[#1E2C27] after:opacity-50 after:z-0 ',
            }}
            stroke="#825FA3"
            polygon={Rexagon}
          />

          <Link
            href="/forgot-password"
            className=" absolute text-center text-sm md:text-base font-bold text-white bottom-[-28px]"
          >
            forgot password
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-12">
        <Button
          polygon={Rexagon}
          strokeWidth={0}
          variant="solid"
          className="h-[52px] px-20 mt-20 sm:h-[61.26px] bg-[#F4EB22]"
          onPress={() => {
            router.push('/templates/onboarding/cocoon')
          }}
        >
          <p className="text-xl sm:text-2xl font-bold text-[#100E1A]">configure your cocoon</p>
        </Button>
        <p className="text-md sm:text-lg font-bold">how it works</p>

        <Rectagon
          className="relative"
          chamferLength={{ x: 50, y: 50 }}
          style={{ width: 717, height: 387 }}
          overflow={false}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#54156A]">
            <img
              src="/assets/onboarding/how-it-works.webp"
              width={717}
              height={387}
              className="mix-blend-luminosity  opacity-50"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex py-24 flex-col items-center gap-4">
            <p className="text-color-2 font-bold text-[20px] max-w-[500px] text-center">
              from words to worlds: <br /> how your &lt;inner&gt;Garden grows
            </p>
            <div className="w-20 h-20">
              <YoutubeIcon className="w-20 h-20" />
            </div>
          </div>
        </Rectagon>
      </div>
    </div>
  )
}

interface PageProps {}

export default LoginPage
