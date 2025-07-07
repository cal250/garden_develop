'use client'

import { DesignContextProvider } from '@/hooks/use-design-context'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import TagsInput from '../tags-input'
import CommonBodyCard from '@/components/common-body-card'
import { useEffect, useState } from 'react'
import { useAuth } from '@/features/providers/auth'

export interface NorthStarsInputProps {
  northStar: string | null
  onSelectNorthStar: (star: string) => void
  currentWedgeIndex?: number
}

export default function NorthStarsInput({
  northStar,
  onSelectNorthStar,
  currentWedgeIndex = 0,
}: NorthStarsInputProps) {
  const [zIndex, setZIndex] = useState(20)
  const { user } = useAuth()

  const headerCardHeight = useResponsiveValue({
    base: 51.42,
    sm: 70,
    md: 88.5,
  })

  useEffect(() => {
    if (currentWedgeIndex === 4 || currentWedgeIndex === 5) {
      setZIndex(60)
    } else {
      setZIndex(10)
    }
  }, [currentWedgeIndex])

  return (
    <CommonBodyCard
      title={user?.username ?? ''}
      style={{
        zIndex,
      }}
      headerCardProps={{
        classNames: {
          outerTitle:
            'text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black text-color-1',
        },
      }}
      className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 h-full flex-grow w-full justify-start"
    >
      <div
        style={{
          position: 'relative',
          top: `-${headerCardHeight / 2}px`,
        }}
        className={`mt-[55px] sm:mt-[70px] md:mt-[80px] w-full flex flex-col items-center relative top-[-${headerCardHeight / 2}px]`}
      >
        <div className="flex flex-col items-center gap-6 pt-8">
          <p className="text-base font-bold text-white text-center px-3 md:px-0">
            what north stars are guiding you?
          </p>
          <TagsInput
            selectedTag={northStar ? [northStar] : []}
            onSelectionChange={([key]) => {
              if (!key) return

              onSelectNorthStar(`${key}`)
            }}
          />
        </div>
      </div>
    </CommonBodyCard>
  )
}
