import { forwardRef } from '@nextui-org/system'
import React, { cloneElement, ReactElement } from 'react'

import { useCheckbox, UseCheckboxProps } from './use-checkbox'
import { CheckboxIcon } from './checkbox-icon'

export interface CheckboxProps extends UseCheckboxProps {}

const Checkbox = forwardRef<'input', CheckboxProps>((props, ref) => {
  const {
    Component,
    children,
    icon = <CheckboxIcon />,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getIconProps,
    getLabelProps,
    wrapperComponent,
  } = useCheckbox({ ...props, ref })

  const clonedIcon =
    typeof icon === 'function'
      ? icon(getIconProps())
      : cloneElement(icon as ReactElement, getIconProps())

  const Wrapper = wrapperComponent ?? 'span'

  return (
    <Component {...getBaseProps()}>
      <input {...getInputProps()} />
      <Wrapper {...getWrapperProps()}>{clonedIcon}</Wrapper>
      {children && <span {...getLabelProps()}>{children}</span>}
    </Component>
  )
})

Checkbox.displayName = 'NextUI.Checkbox'

export default Checkbox
