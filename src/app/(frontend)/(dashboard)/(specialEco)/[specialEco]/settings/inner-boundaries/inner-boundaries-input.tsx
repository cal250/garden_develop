'use client'

import { DesignContextProvider } from '@/hooks/use-design-context'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import TagsInput from '../tags-input'
import CommonBodyCard from '@/components/common-body-card'
import { useAuth } from '@/features/providers/auth'

export interface InnerBoundariesInputProps {
  innerBoundary: string | null
  onSelectBoundary: (boundary: string) => void
}

export default function InnerBoundariesInput({
  innerBoundary,
  onSelectBoundary,
}: InnerBoundariesInputProps) {
  const { user } = useAuth()
  const headerCardHeight = useResponsiveValue({
    base: 51.42,
    sm: 70,
    md: 88.5,
  })

  return (
    <CommonBodyCard
      title={user?.username ?? ''}
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
            what ⟨inner⟩ boundaries are protecting you?
          </p>
          <TagsInput
            selectedTag={innerBoundary ? [innerBoundary] : []}
            onSelectionChange={([key]) => {
              if (!key) return

              console.log({ key })

              onSelectBoundary(`${key}`)
            }}
          />
        </div>
      </div>
    </CommonBodyCard>
  )
}
