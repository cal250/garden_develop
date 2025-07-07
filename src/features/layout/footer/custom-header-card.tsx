'use client'

import React, { ReactElement } from 'react'
import { Rexagon, RexagonProps } from '@/components/atoms/polygon/rexagon'
import { twMerge } from 'tailwind-merge'
import { withPolygon } from '@/components/utils/react/polymorphism'
import { useDesignContext } from '@/hooks/use-design-context'

/**
 * A header card displays a title inside a hexagon. It displays a `BracketedText` component.
 * It can also display octagon nodes at the tips.
 */
export const CustomHeaderCard = withPolygon<HeaderCardProps>(
  (
    Polygon,
    {
      text,

      children,
      ...props
    },
  ) => {
    const { stroke } = useDesignContext({ stroke: props.stroke })
    return (
      <Polygon {...props} className={twMerge('bg-color-3 text-center', props.className)}>
        {children}
      </Polygon>
    )
  },
  'div',
  Rexagon,
)

export type HeaderCardProps = RexagonProps & {
  /**
   * The main title of the card
   */
  children: ReactElement
}
