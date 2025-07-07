'use client'
import React, { useState } from 'react'
import { Navbar, NavbarContent, NavbarItem } from '@/components/atoms/navbar'
import { Link } from '@/components/atoms/link'
import { Logo } from '@/components/atoms/logo/logo'
import { twMerge } from 'tailwind-merge'
import { LeftBracketIcon, RightBracketIcon, SunIcon } from '@/components/atoms/icons'
import clsx from 'clsx'
import { Trapezoid } from '@/components/atoms/polygon/trapezoid'
import FlowerIcon from '@/features/icons/flower-icon'
import LeaveIcon from '@/features/icons/leave-icon'
import BullshitIcon from '@/features/icons/bullshit-icon'
import { DoubleSearchIcon } from '@/features/icons/double-search-icon'
import {
  Wellgorithm,
  WellgorithmsMenu,
} from '@/app/(frontend)/_templates/_components/wellgorithms-menu'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { DetoxIcon } from '@/app/(frontend)/_templates/_icons/detox-icon'

const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const [wellgorithm, setWellgorithm] = useState<Wellgorithm>()

  return (
    <div className="z-50 flex h-[60px] w-full items-center justify-center bg-transparent">
      <Navbar
        className={`relative h-[60px] w-full max-w-[1440px] grid-cols-3 justify-between bg-black/50`}
        isBlurred={false}
        classNames={{ wrapper: 'max-w-[unset] bg-transparent' }}
      >
        <NavbarContent className="flex items-center gap-20" justify="start">
          <Link>
            <Logo className="h-[60px] w-[130px] text-color-1" />
          </Link>

          <WellgorithmsMenu wellgorithm={wellgorithm} onChange={setWellgorithm} />
        </NavbarContent>

        <DesignContextProvider stroke={wellgorithm === 'create' ? 'rgb(var(--color-2))' : '#825FA3'}>
          <div
            className={clsx(
              'hidden h-[75px] w-[460px] md:relative md:flex md:items-center md:gap-14 lg:w-[560px]',
            )}
          >
            <NavbarContent
              justify="center"
              polygon={Trapezoid}
              inverted
              slopeAngle={48}
              className={clsx(
                'hidden h-[75px] w-[460px] px-20 text-white md:flex md:items-center md:justify-between md:gap-14 lg:w-[560px]',
              )}
              style={{
                background: 'linear-gradient(337.13deg, #100E1A 38.26%, #825FA3 126.7%)',
              }}
              borderWidths={[0]}
              strokeWidth={4}
            >
              <div className="flex w-full items-center gap-14 justify-around px-8">
                <Link className="w-[28px] md:w-[23px] text-color-1/70 hover:text-color-1">
                  <FlowerIcon />
                </Link>
                <Link className="w-[28px] md:w-[23px] text-color-1/70 hover:text-color-1">
                  <SunIcon className="w-full h-full" />
                </Link>
                <Link className="w-[28px] md:w-[23px] text-color-1/70 hover:text-color-1">
                  <LeaveIcon />
                </Link>
                <Link className="w-[28px] md:w-[23px] text-color-1/70 hover:text-color-1">
                  <BullshitIcon />
                </Link>
              </div>
            </NavbarContent>
            <div className="absolute bottom-[-63px] left-1/2 mb-[50px] flex h-[30px] w-[70%] -translate-x-1/2 transform items-center">
              <div className="ggp-0 flex items-center justify-around w-full">
                <RegularPolygon sides={8} className="w-8 h-8 bg-[#382B4A]" />
                <RegularPolygon sides={8} className="w-8 h-8 bg-[#382B4A]" />
                <RegularPolygon sides={8} className="w-8 h-8 bg-[#382B4A]" />
              </div>
            </div>
          </div>
        </DesignContextProvider>

        <NavbarContent
          className="flex w-full items-center justify-between gap-[60px]"
          justify="end"
        >
          <NavbarItem>
            <Link
              href={'/public'}
              className="group flex items-center gap-1.5 text-color-1/70 hover:text-color-1"
            >
              <DetoxIcon className="w-8 h-8" />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href={'/public'}
              className="group flex items-center gap-1.5 text-color-1/70 hover:text-color-1"
            >
              <DoubleSearchIcon className="w-8 h-8" />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={'/login'} className="flex items-center gap-0.5">
              <p className="text-center text-[20px] font-bold text-color-2">log</p>
              <LeftBracketIcon className="h-6 w-2" fill="rgb(var(--color-2))" strokeWidth={2} />
              <p className="text-center text-[20px] font-bold text-color-1">in</p>
              <RightBracketIcon className="h-6 w-2" fill="rgb(var(--color-2))" strokeWidth={2} />
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  )
}

interface MainHeaderProps {}

export default MainHeader
