import React from 'react'
import { HouseHexagon, HouseHexagonProps } from '@/components/atoms/polygon/house-hexagon'
import { twMerge } from 'tailwind-merge'
import { HeaderCard, HeaderCardProps } from '@/components/molecules/header-card/header-card'
import { PropsOf, withPolygon } from '@/components/utils/react/polymorphism'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { useDesignContext } from '@/hooks/use-design-context'

type Props = {
  /**
   * The title displayed inside the brackets
   */
  bracketTitle?: string
  /**
   * The main title of the card
   */
  title?: string | [string, string]

  headerCardProps?: Omit<HeaderCardProps, 'text' | 'bracketText'>

  headerCardType?: 'bracketed' | 'separated'
}

export const BodyCard = withPolygon<Props, 'div', HouseHexagonProps>(
  (
    PolygonComponent,
    {
      title,
      bracketTitle,
      className,
      roofWidth: roofWidthProp,
      roofAngle: roofAngleProp,
      headerCardProps = {},
      headerCardType = 'default',
      ...props
    },
  ) => {
    const { designAngle } = useDesignContext({
      strokeWidth: props.strokeWidth,
    })
    const roofWidthDefault = useResponsiveValue({
      base: 0.9,
      sm: 0.8,
      md: 755,
    })

    const roofAngle = roofAngleProp || designAngle
    const roofWidth = roofWidthProp || roofWidthDefault

    return (
      <PolygonComponent
        roofWidth={roofWidth}
        roofAngle={roofAngle}
        borderWidths={['default', 'default', 'default', 0, 0, 0]}
        overflow
        {...props}
        className={twMerge('from relative flex flex-1 flex-col items-center bg-color-3', className)}
      >
        {title && (
          <HeaderCard
            text={title}
            bracketText={bracketTitle}
            tipAngle={100}
            {...headerCardProps}
            className={twMerge(
              'absolute top-0 z-20 min-w-[407px] -translate-y-1/2 self-center px-[20px] md:min-w-[480px] md:px-[60px]',
              headerCardProps?.className,
            )}
            textType={headerCardType}
            style={{
              maxWidth: `calc(${roofWidth <= 1 ? `${roofWidth * 85}%` : `${roofWidth * 0.85}px`})`,
              ...headerCardProps?.style,
            }}
          />
        )}
        {props.children}
      </PolygonComponent>
    )
  },
  'div',
  HouseHexagon,
)

export type BodyCardProps = PropsOf<typeof BodyCard>
