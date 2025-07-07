import React from 'react'
import BracketedText from '@/components/molecules/bracketed-text/bracketed-text'
import { Rexagon, RexagonProps } from '@/components/atoms/polygon/rexagon'
import { twMerge } from 'tailwind-merge'
import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import { SlotClasses } from '@/components/utils/react/types'
import { withPolygon } from '@/components/utils/react/polymorphism'
import { IntegralIcon } from '@/components/atoms/icons'
import { useDesignContext } from '@/hooks/use-design-context'

/**
 * A header card displays a title inside a hexagon. It displays a `BracketedText` component.
 * It can also display octagon nodes at the tips.
 */
export const HeaderCard = withPolygon<HeaderCardProps>(
  (
    Polygon,
    {
      text,
      as = 'h1',
      withNodes = false,
      nodeStroke,
      nodeStrokeWidth,
      leftNodeContent,
      rightNodeContent,
      textType = 'bracketed',
      separatorFill = 'rgb(var(--color-3))',
      separatorStroke,
      bracketFill,
      classNames,
      ...props
    },
  ) => {
    const { stroke } = useDesignContext({ stroke: props.stroke })
    return (
      <Polygon
        {...props}
        as={as}
        overflow={props.overflow || withNodes || textType === 'separated'}
        className={twMerge('bg-color-3 text-center', classNames?.base, props.className)}
      >
        {textType === 'bracketed' || typeof text === 'string' ? (
          <BracketedText
            className={twMerge('text-[36px] font-extrabold', classNames?.title)}
            classNames={{
              outerText: classNames?.outerTitle,
            }}
            bracketFill={bracketFill}
            outerText={typeof text === 'string' ? text : text[1]}
          >
            {typeof text === 'string' ? null : text[0]}
          </BracketedText>
        ) : (
          <div
            className={twMerge(
              'flex items-center text-[36px] font-extrabold text-[#F2EB2E]',
              classNames?.name,
            )}
          >
            <span className={classNames?.leftTitle}>{text[0]}</span>
            <IntegralIcon
              fill={separatorFill}
              stroke={separatorStroke ?? stroke}
              className={twMerge('left-1/2 top-1/2 w-[40px] scale-[700%]', classNames?.separator)}
            />
            <span className={classNames?.rightTitle}>{text[1]}</span>
          </div>
        )}

        {withNodes && (
          <React.Fragment>
            <RegularOctagon
              strokeWidth={nodeStrokeWidth ? nodeStrokeWidth : undefined}
              stroke={nodeStroke ? nodeStroke : stroke}
              className={twMerge(
                'absolute left-0 top-[50%] h-1/2 -translate-x-1/2 -translate-y-1/2 bg-color-3',
                classNames?.nodes,
                classNames?.leftNode,
              )}
            >
              {leftNodeContent}
            </RegularOctagon>
            <RegularOctagon
              strokeWidth={nodeStrokeWidth ? nodeStrokeWidth : undefined}
              stroke={nodeStroke ? nodeStroke : stroke}
              className={twMerge(
                'absolute right-0 top-[50%] h-1/2 -translate-y-1/2 translate-x-1/2 bg-color-3',
                classNames?.nodes,
                classNames?.rightNode,
              )}
            >
              {rightNodeContent}
            </RegularOctagon>
          </React.Fragment>
        )}
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
  text: [string, string] | string

  textType?: 'bracketed' | 'separated'

  separatorFill?: string
  separatorStroke?: string

  classNames?: SlotClasses<
    | 'leftTitle'
    | 'rightTitle'
    | 'title'
    | 'outerTitle'
    | 'leftNode'
    | 'rightNode'
    | 'nodes'
    | 'separator'
  >

  /**
   * Whether to show the octagon nodes at the tips.
   */
  withNodes?: boolean

  /**
   * The color of the node stroke at the tips.
   */
  nodeStroke?: string

  /**
   * The width of the node stroke at the tips.
   */
  nodeStrokeWidth?: number

  /**
   * The content to display on the left node.
   */
  leftNodeContent?: React.ReactNode

  /**
   * The content to display on the right node.
   */
  rightNodeContent?: React.ReactNode

  bracketFill?: string
}
