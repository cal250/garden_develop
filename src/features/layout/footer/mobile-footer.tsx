'use client'

import React from 'react'
import { Link } from '@/components/atoms/link'
// import { LeftBracketIcon, RightBracketIcon } from '@/components/atoms/icons'
// import FeedsIcon from '@/features/icons/feeds-icon'
// import GardensIcon from '@/features/icons/gardens-icon'
import { DoubleSearchIcon } from '@/features/icons/double-search-icon'
import UserButton from '../header/user-button'
// import DropletsIcon from '@/features/icons/droplets-icon'
import SunshineIcon from '@/features/icons/sunshine-icon'
import DetoxBirdIcon from '@/features/icons/detox-bird-icon'

export const MobileFooter: React.FC<MobileFooterProps> = () => {
  return (
    <footer className="z-50 fixed left-0 bottom-0 flex md:hidden w-full items-center justify-center bg-color-8 border-t-[1px] border-t-color-1">
      <nav className="w-full h-[60px] flex items-center justify-between sm:justify-center gap-3 sm:gap-8 px-4">
        {/* <Link href={'/'} className="flex items-center gap-[1px] text-color-2/80 hover:text-color-1">
          <FeedsIcon />
        </Link> */}

        <Link href={'/'} className="text-color-2/80 hover:text-color-1">
          <DetoxBirdIcon />
        </Link>

        <Link href={'/'} className="text-color-2/80 hover:text-color-1">
          <DoubleSearchIcon className="w-8 h-8" />
        </Link>

        <Link
          href={'/'}
          className="group text-color-2/80 hover:text-color-1 flex items-center gap-2"
        >
          {/* <div className="w-8 h-8">
            <DropletsIcon />
          </div> */}
          <span className="text-center text-base sm:text-[20px] font-bold text-color-2/80 group-hover:text-color-1">
            wellgorithms
          </span>
          {/* <div className="w-8 h-8">
            <SunshineIcon />
          </div> */}
        </Link>

        {/* <Link
          href={'/'}
          className="group flex items-center gap-1.5 text-color-2/80 hover:text-color-1"
        >
          <p className="text-center text-base sm:text-[20px] font-bold text-color-2/80 group-hover:text-color-1">
            wellgorithms
          </p>
        </Link> */}

        {/* <Link href={'/login'} className=" items-center gap-0.5 flex md:hidden">
          <p className="text-center text-base sm:text-[20px] font-bold text-color-2">log</p>
          <LeftBracketIcon className="h-4 sm:h-6 w-2" fill="rgb(var(--color-2))" strokeWidth={2} />
          <p className="text-center text-base sm:text-[20px] font-bold text-color-1">in</p>
          <RightBracketIcon className="h-4 sm:h-6 w-2" fill="rgb(var(--color-2))" strokeWidth={2} />
        </Link> */}

        <UserButton />
      </nav>
    </footer>
  )
}

interface MobileFooterProps {}
