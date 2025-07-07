import React, { useState } from 'react'
import { HeaderCard } from '@/components/molecules/header-card/header-card'
import { Trapezoid } from '@/components/atoms/polygon/trapezoid'
import { useDesignContext } from '@/hooks/use-design-context'
import HeadWithVrGlassesIcon from '@/features/icons/head-with-vr-glasses-icon'
import HandWithFlowerIcon from '@/features/icons/hand-with-flower-icon'
import useWindowWidth from '@/hooks/use-window-width'
import PlantIcon from '@/features/icons/plant-icon'
import { twMerge } from 'tailwind-merge'

export const NewWellgorithmCard: React.FC<NewWellgorithmCardProps> = ({ index, feed }) => {
  const { stroke, strokeWidth } = useDesignContext()
  const width = useWindowWidth()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full sm:w-[380px] max-w-[380px] px-5 h-full sm:px-6 md:px-2 py-4 flex-col"
    >
      <HeaderCard
        text={feed.title}
        textType={typeof feed.title === 'string' ? undefined : 'separated'}
        // className="h-[48px] sm:h-[60px] md:h-[70px] bg-[#3C396E]"
        className={twMerge(
          'h-[48px] sm:h-[60px] md:h-[70px] ',
          hovered
            ? 'bg-gradient-to-t from-[#562B63] to-[#8F579F]'
            : 'bg-gradient-to-t from-[#352E62] to-[#675EA6]',
        )}
        style={{
          width: width < 640 ? `calc(100% + 50px)` : `calc(100% + 68px)`,
          left: width < 640 ? -24 : -34,
        }}
        withNodes={width < 1024 ? false : true}
        classNames={{
          name: 'h-full w-full flex justify-center items-center',
          title: 'text-[28px]',
          leftTitle: 'text-[20px] md:text-[28px] font-black',
          rightTitle: 'text-[20px] md:text-[28px] font-black',
          outerTitle: 'text-[20px] md:text-[28px] font-black',
          leftNode: `bg-[#7B5FA3] ${index === 0 ? 'opacity-0' : 'opacity-100'}`,
          rightNode: 'bg-[#7B5FA3] opacity-0',
          separator: 'h-[10px] md:h-[12px]',
        }}
        separatorStroke={0}
        separatorFill="#FFFFFF"
      />

      <div className="w-full h-[128px] bg-[#3C396E]">
        <img
          alt="banner"
          src={feed.image ?? '/assets/home/wellgorithm-card-banner.png'}
          className="h-[128px] w-full object-cover mix-blend-luminosity  opacity-50"
          style={{
            border: `${strokeWidth}px solid ${stroke}`,
            borderTop: 'none',
            borderBottom: 'none',
          }}
        />
      </div>
      <p
        className="min-h-[105px] bg-white px-4 sm:px-6 md:px-8 py-4 md:py-6 text-center text-[16px] md:text-[18px] font-bold text-[#3E3576]"
        style={{
          border: `${strokeWidth}px solid ${stroke}`,
          borderBottom: 'none',
        }}
      >
        {feed.intention}
      </p>
      <Trapezoid className="grid h-[59px] grid-cols-3" inverted centerContent={false}>
        <div className="flex items-center justify-center bg-[#3C396E] pl-6 text-[#D6D1E8]">
          <HandWithFlowerIcon />
        </div>
        <div className="flex items-center justify-center bg-[#5E5B88] text-[#D6D1E8]">
          <PlantIcon />
        </div>
        <div className="flex items-center justify-center bg-[#7B5FA3] pr-6 text-[#D6D1E8]">
          <HeadWithVrGlassesIcon />
        </div>
      </Trapezoid>
    </div>
  )
}

interface NewWellgorithmCardProps {
  index: number
  feed: {
    title: string | string[]
    image: string
    intention: string
  }
}
