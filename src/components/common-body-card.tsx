import React from 'react'
import { BodyCard, BodyCardProps } from '@/components/organisms/body-card/body-card'
import { twMerge } from 'tailwind-merge'
import { useResponsiveValue } from '@/hooks/use-responsive-value'

type CommonBodyCardProps = BodyCardProps

export const CommonBodyCard: React.FC<CommonBodyCardProps> = ({
  children,
  className,
  style,
  headerCardProps = {},
  ...props
}) => {
  const roofWidth = useResponsiveValue({ base: 0.85, sm: 0.8, md: 832 })

  return (
    <BodyCard
      roofAngle={42}
      roofWidth={roofWidth}
      {...props}
      className={twMerge('bg-color-8', className)}
      stroke="rgb(var(--color-4))"
      style={{
        background: `radial-gradient(101.89% 1356.63% at 50.76% 1248.92%, rgb(var(--color-9)) 42.61%, rgb(var(--color-8)) 99.68%)`,
        zIndex: 20,
        ...style,
      }}
      headerCardProps={{
        tipAngle: 90,
        strokeWidth: 5,
        className:
          '!min-w-[340px] !w-[80%] sm:!w-[450px] md:!w-[480px] min-h-[52px] sm:min-h-[70px] md:min-h-[88.5px] py-1 pointer-events-none mt-[-2px]',
        classNames: {
          name: 'h-full w-full flex justify-center items-center',
          title: 'text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black',
          outerTitle:
            'text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black text-color-13',
        },
        stroke: 'rgb(var(--color-4))',
        ...headerCardProps,

        style: {
          // background: `radial-gradient(100.08% 49.99% at 66.81% 47.94%, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.68%)`,
          background: 'radial-gradient(circle, rgb(var(--color-9)) 10%, rgb(var(--color-8)) 80%)',
          ...headerCardProps.style,
        },
      }}
    >
      {children}
    </BodyCard>
  )
}

export default CommonBodyCard
