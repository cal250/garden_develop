'use client'

import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { PlatformIcon } from '@/payload-types'
import CommonBodyCard from '@/components/common-body-card'
import { useAuth } from '@/features/providers/auth'

export interface IconPickerProps {
  icons: PlatformIcon[]
  onIconChange: (icon: PlatformIcon) => void
}

export default function IconPicker({ icons, onIconChange }: IconPickerProps) {
  const { user } = useAuth()
  const headerCardHeight = useResponsiveValue({
    base: 51.42,
    sm: 70,
    md: 88.5,
  })

  return (
    <CommonBodyCard
      title={user?.username ?? ''}
      style={{
        zIndex: 20,
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
        <div className="pt-12">
          <p className="text-base font-bold text-white text-center px-3 md:px-0 mb-7">
            which flowers express your aspirations?
          </p>
          <div className="grid grid-cols-5 gap-[30px]">
            {icons?.map((icon, index) => (
              <div
                key={icon.id}
                onClick={() => onIconChange(icon)}
                style={{
                  color: index === 0 ? 'rgb(var(--color-6))' : 'rgb(var(--color-14))',
                }}
                className="w-full h-full hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <img src={icon.url ?? ''} alt={icon?.filename ?? ''} className="size-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommonBodyCard>
  )
}
