'use client'

import { Avatar } from '@/components/atoms/avatar'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { Tooltip } from '@/components/atoms/tooltip'
import { HeaderCard } from '@/components/molecules/header-card/header-card'
import { useDesignContext } from '@/hooks/use-design-context'
import useWindowWidth from '@/hooks/use-window-width'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const GardenerCard: React.FC<GardenerCardProps> = ({ index, sprout }) => {
  const { strokeWidth } = useDesignContext()
  const width = useWindowWidth()

  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full max-w-[358px] flex-col items-center px-3 md:px-0"
    >
      <HouseHexagon
        strokeWidth={strokeWidth}
        roofWidth={0.55}
        borderWidths={['default', 'default', 'default', 'default', 0, 'default']}
      >
        <img
          alt="banner"
          src={sprout.image ?? '/assets/home/journal-card-banner.png'}
          className="h-[140px] w-full object-cover"
        />
      </HouseHexagon>

      <HeaderCard
        text={sprout.title}
        textType={typeof sprout?.title === 'string' ? undefined : 'separated'}
        className={twMerge(
          'h-[48px] sm:h-[60px] md:h-[70px]',
          hovered
            ? 'bg-gradient-to-t from-[#562B63] to-[#8F579F]'
            : 'bg-gradient-to-t from-[#2F5330] to-[#6DAD6E]',
        )}
        style={{
          width: width < 640 ? `calc(100% + 48px)` : `calc(100% + 68px)`,
          left: width < 640 ? -24 : -34,
        }}
        withNodes={width < 1024 ? false : true}
        classNames={{
          name: 'h-full w-full flex justify-center items-center',
          title: 'text-[20px] md:text-[28px] font-black',
          leftTitle: 'text-[20px] md:text-[28px] font-black',
          rightTitle: 'text-[20px] md:text-[28px] font-black',
          outerTitle: 'text-[20px] md:text-[28px] font-black',
          leftNode: `bg-[#C2EF9E] ${index === 0 ? 'opacity-0' : 'opacity-100'}`,
          rightNode: 'bg-[#C2EF9E] opacity-0',
          separator: 'h-[10px] md:h-[11px]',
        }}
        stroke={hovered ? '#FFFFFF63' : '#90BE6B'}
        separatorStroke={0}
        separatorFill="#C2EF9E"
        nodeStroke="#90BE6B"
      />
      <HouseHexagon
        strokeWidth={strokeWidth}
        roofWidth={0.7}
        inverted
        className="h-[140px] items-start bg-white"
        borderWidths={['default', 'default', 'default', 'default', 0, 'default']}
      >
        <p className="px-1.5 sm:px-2.5 md:px-4 py-4 md:py-6 text-[14px] text-center font-bold text-[#1A3B32]">
          {sprout.intention}
        </p>
      </HouseHexagon>
      <div className="w-full grid place-items-center relative">
        <Tooltip
          content="Moses Gitaus"
          polygon={Rexagon}
          className="h-[55px] w-[200px] bg-color-2 text-[13px] font-bold text-color-8"
          tipAngle={120}
          classNames={{
            base: 'before:w-[40px] before:h-[40px] before:bg-color-2',
          }}
          strokeWidth={0}
          showArrow
          placement="top"
          // isOpen={true}
        >
          <Avatar
            src={sprout.avatar ?? '/assets/home/avatar.png'}
            polygon={Rexagon}
            tipAngle={75}
            stroke="#90BE6B"
            strokeWidth={4}
            className="mt-[-30px] md:mt-[-40px] h-[53px] md:h-[76px] w-[102px] md:w-[147px] justify-self-center relative"
          />
        </Tooltip>
      </div>
    </div>
  )
}

interface GardenerCardProps {
  index: number
  sprout: {
    title: string | string[]
    image: string
    avatar: string
    intention: string
  }
}
