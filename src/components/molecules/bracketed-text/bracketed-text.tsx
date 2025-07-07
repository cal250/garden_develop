import { withPolygon } from '@/components/utils/react/polymorphism'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { SlotClasses } from '@/components/utils/react/types'
import { LeftBracketIcon, RightBracketIcon } from '@/components/atoms/icons'

interface BracketedTextProps {
  outerText?: string
  bracketFill?: string
  classNames?: SlotClasses<'outerText' | 'brackets'>
}

const BracketedText = withPolygon<BracketedTextProps, 'span'>(
  (Polygon, { children, outerText, classNames, bracketFill, ...props }) => {
    const bracketClass = twMerge('text-color-13', classNames?.brackets)
    const outerTextClass = twMerge('text-color-13', classNames?.outerText)
    return (
      <Polygon {...props} className="flex items-center">
        {children && (
          <div className="flex items-center">
            {/* <span className={bracketClass}>&#10096;</span> */}
            <LeftBracketIcon
              className={`h-6 sm:h-7 md:h-8 w-3 md:w-4 ${bracketClass}`}
              fill={bracketFill ? bracketFill : 'rgb(var(--color-13))'}
              strokeWidth={2}
            />
            {children}
            {/* <span className={bracketClass}>&#10097;</span> */}
            <RightBracketIcon
              className={`h-6 sm:h-7 md:h-8 w-3 md:w-4 ${bracketClass}`}
              fill={bracketFill ? bracketFill : 'rgb(var(--color-13))'}
              strokeWidth={2}
            />
          </div>
        )}
        <span className={outerTextClass}>{outerText}</span>
      </Polygon>
    )
  },
  'span',
)

export default BracketedText
