'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Link } from '@/components/atoms/link'
import { YoutubeIcon } from '@/components/atoms/icons'

const SubHeader: React.FC<SubHeaderProps> = ({ endContent, startContent }) => {
  const pathname = usePathname()

  if (pathname?.endsWith('/login')) return null

  return (
    <div className="z-10 left-0 flex w-full text-white bg-[#825FA3AB] h-[60px]">
      <div className="w-full flex justify-between items-center px-20">
        <div className="flex items-center gap-8">
          {startContent}
          <div className="relative">
            <Link>
              <YoutubeIcon className="h-8 w-8" />
            </Link>
            <span className="font-bold absolute left-1/2 bottom-[-40px] -translate-x-1/2 whitespace-nowrap">
              what&#39;s a seed?
            </span>
          </div>
        </div>
        {endContent}
      </div>
    </div>
  )
}

interface SubHeaderProps {
  startContent?: React.ReactNode
  endContent?: React.ReactNode
}

export default SubHeader
