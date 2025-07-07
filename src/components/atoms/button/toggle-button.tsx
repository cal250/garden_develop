'use client'

import React from 'react'
import {
  ButtonContext,
  ToggleButtonProps as AriaToggleButtonProps,
  useContextProps,
} from 'react-aria-components'
import { PropsOf, withPolygon } from '@/components/utils/react/polymorphism'
import { useFocusRing, useHover, useToggleButton } from 'react-aria'
import { dataAttr } from '@/components/utils/assertion'
import { useToggleState } from '@react-stately/toggle'

interface Props extends AriaToggleButtonProps {
  children?: React.ReactNode
}

const ToggleButton = withPolygon<Props, 'button'>(
  (Polygon, { children, autoFocus, ...props }, ref) => {
    ;[props, ref] = useContextProps(props, ref, ButtonContext)

    const state = useToggleState(props)

    const { buttonProps, isPressed } = useToggleButton(props as any, state, ref)
    const { isFocusVisible, focusProps } = useFocusRing({ autoFocus })
    const { isHovered, hoverProps } = useHover({})

    return (
      <Polygon
        ref={ref}
        data-focus-visible={dataAttr(isFocusVisible)}
        data-selected={dataAttr(state.isSelected)}
        data-hover={dataAttr(isHovered)}
        data-pressed={dataAttr(isPressed)}
        {...buttonProps}
        {...(focusProps as any)}
        {...hoverProps}
        {...props}
        className="group scale-100 whitespace-nowrap px-8 py-2 outline-offset-4 data-[pressed=true]:scale-95"
      >
        {children}
      </Polygon>
    )
  },
  'button',
)

ToggleButton.displayName = 'ToggleButton'

export type ToggleButtonProps = PropsOf<typeof ToggleButton>

export default ToggleButton
