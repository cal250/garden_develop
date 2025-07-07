'use client'

import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { useAuth } from '@/features/providers/auth'

export default function BuilderCommonOctagon({
  children,
  className,
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) {
  const { user } = useAuth()

  const octagonSize = useResponsiveValue({
    base: 350,
    sm: 450,
    md: 510,
  })
  const innerOctagonSize = useResponsiveValue<string | number>({
    base: 80,
    sm: 100,
    md: 122,
  })

  return (
    <section
      className={`relative mt-[-65px] md:mt-[-60px] z-20 flex flex-col items-center justify-center`}
    >
      <RegularOctagon
        strokeWidth={5}
        stroke="rgb(var(--color-4))"
        className={`flex items-center justify-center relative`}
        style={{
          width: octagonSize,
          height: octagonSize,
          background:
            'conic-gradient(from 89.99deg at 50% 50%, rgb(var(--color-8)) 0deg, rgb(var(--color-8)) 212.4deg, rgb(var(--color-9)) 313.2deg, rgb(var(--color-8)) 360deg)',
        }}
      >
        <RegularOctagon
          strokeWidth={5}
          stroke="rgb(var(--color-4))"
          className="flex absolute top-6 sm:top-8 md:top-10"
          style={{
            width: innerOctagonSize,
          }}
        >
          <img
            alt="banner"
            src={user?.avatar?.url ? user?.avatar?.url : '/assets/onboarding/bee.png'}
            className="h-full object-cover object-center"
            style={{
              width: innerOctagonSize,
            }}
          />
        </RegularOctagon>

        {children}
      </RegularOctagon>
    </section>
  )
}
