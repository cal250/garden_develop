'use client'

import React, { ReactElement } from 'react'
import { BodyCard } from '@/components/organisms/body-card/body-card'
import { Trapezoid } from '@/components/atoms/polygon/trapezoid'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { Button } from '@/components/atoms/button'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { Link } from '@/components/atoms/link'
import { NewInviteForm } from '@/app/(frontend)/(home)/home-new/components/new-invite-form'
import { CustomHeaderCard } from './custom-header-card'
import { Logo } from '@/components/atoms/logo/logo'
// import { LeftBracketIcon, RightBracketIcon } from '@/components/atoms/icons'
import { twMerge } from 'tailwind-merge'
import useWindowWidth from '@/hooks/use-window-width'
import DonateHeartIcon from '@/features/icons/donate-heart-icon'
import UserButton from '../header/user-button'

export const Footer: React.FC<FooterProps> = ({ innerComponent }) => {
  const width = useWindowWidth()
  return (
    <footer className="flex w-full flex-col gap-0 items-center justify-center bg-transparent">
      <DesignContextProvider stroke="rgb(var(--color-14))" strokeWidth={4}>
        <BodyCard
          stroke="rgb(var(--color-11))"
          className="mt-[-300px] min-h-[300px] w-full justify-start flex flex-col max-w-[1440px] overflow-hidden items-center z-0"
          style={{
            backgroundImage: `url(/assets/home/footer-bg.webp)`,
            backgroundSize: 'cover',
          }}
          roofAngle={38}
        >
          {innerComponent ? (
            innerComponent
          ) : (
            <>
              <CustomHeaderCard
                tipAngle={75}
                style={{
                  background:
                    'radial-gradient(46.44% 82.08% at 49.97% 47.94%, #82B440 3.4%, #82B440 99.68%)',
                }}
                className="mt-[-27px] md:mt-[-47px] min-w-[90%] max-w-[284px] sm:min-w-[300px] md:min-w-[540px] md:max-w-[540px] h-[52px] md:h-[89px]"
              >
                <div className="flex items-center gap-2">
                  <h1 className="text-[22px] leading-[44.6px] sm:text-[28px] sm:leading-[54.6px] md:text-[36px] md:leading-[76.07px] lg:text-[40px] font-black text-white">
                    enter the
                  </h1>
                  <div className="flex items-center gap-0">
                    <h1 className="text-[22px] leading-[44.6px] sm:text-[28px] sm:leading-[54.6px] md:text-[36px] md:leading-[76.07px] lg:text-[40px] font-black text-color-1/90">
                      Garden
                    </h1>
                    <sup className="font-normal text-xs text-white">®</sup>
                  </div>
                </div>
              </CustomHeaderCard>

              <p className="max-w-[591px] px-3 pt-10 md:pt-20 text-center text-[14px] md:text-[22px] leading-[150%] font-bold">
                Step into the garden of your psyche. Create your own wellgorithms, unlock the hidden
                language of your emotions, and join a movement transforming how we grow, feel, and
                connect.
              </p>
            </>
          )}
          <div className="mt-[75px] flex flex-col w-full max-w-[713px]">
            <NewInviteForm />
          </div>

          <div className="mt-[31px] flex flex-col items-center gap-0">
            <p className="text-[14px] text-center font-bold text-white">our mission:</p>
            <p className="text-[14px] text-center font-extrabold text-color-1/90">
              to open-source personal and planetary wellbeing
            </p>
          </div>

          <div className="!z-50 flex justify-center mt-[48.55px]">
            <Button
              type="button"
              polygon={Rexagon}
              strokeWidth={0}
              variant="solid"
              className="!z-50 h-[60px] w-[192px] bg-color-6"
            >
              <div className="flex items-center justify-center gap-[6.54px]">
                <p className="text-[22px] font-extrabold text-white">donate</p>
                <DonateHeartIcon />
              </div>
            </Button>
          </div>

          <div className="!z-0 mt-[-30px] w-full max-w-[830px]">
            <Trapezoid
              className="!z-0 h-[112px] w-full max-w-[830px] bg-color-12"
              borderWidths={[0]}
              strokeWidth={2}
              stroke="rgb(var(--color-14))"
              slopeAngle={width < 830 ? 0 : 45}
            >
              <div className="flex gap-3 sm:gap-[18px] md:gap-[62px] text-sm md:text-[15px] font-bold">
                <Link className="text-color-1 hover:text-color-1">about</Link>
                <Link className="text-color-1 hover:text-color-1">contact</Link>
                <Link className="text-color-1 hover:text-color-1">faq</Link>
                <Link className="text-color-1 hover:text-color-1">policies</Link>
                <Link className="text-color-1 hover:text-color-1">privacy</Link>
              </div>
            </Trapezoid>
          </div>
        </BodyCard>
      </DesignContextProvider>

      <nav className="w-full h-[80px] overflow-hidden flex items-center justify-between gap-3 bg-color-8 border-t-[1px] border-t-color-2 px-4 md:hidden">
        <Link href={'/'} className="block md:hidden">
          <Logo className="z-50 h-auto w-[130px] text-color-10" />
        </Link>
        {/* <Link href={'/login'} className=" items-center gap-0.5 flex md:hidden">
          <p className="text-center text-[20px] font-bold text-color-2">log</p>
          <LeftBracketIcon className="h-6 w-2" fill="rgb(var(--color-2))" strokeWidth={2} />
          <p className="text-center text-[20px] font-bold text-color-1">in</p>
          <RightBracketIcon className="h-6 w-2" fill="rgb(var(--color-2))" strokeWidth={2} />
        </Link> */}

        <UserButton />
      </nav>
    </footer>
  )
}

interface FooterProps {
  innerComponent?: ReactElement
}
