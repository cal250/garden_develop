import React from 'react'
import { Avatar } from '@/components/atoms/avatar'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'

export const AiWakeningCard: React.FC<AiWakeningCardProps> = ({ creator }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar
        polygon={RegularPolygon}
        sides={6}
        rotation={30}
        className="h-[302px] w-[262px]"
        src={creator?.avatar?.url ? creator.avatar.url : '/assets/home/persona.png'}
      />
      <div className="flex flex-col gap-2.5 items-center">
        <p className="text-[28px] font-extrabold text-[#371B7A]">
          {creator?.username ? creator?.username : ' '}
        </p>
        <span className="text-base font-bold text-[#1A0A37]">{`${creator?.gardensCount ? creator?.gardensCount : 0} Garden(s)`}</span>
      </div>
    </div>
  )
}

interface AiWakeningCardProps {
  creator: any
}
