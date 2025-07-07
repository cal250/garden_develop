'use client'

import { useButton, UseButtonProps } from './use-button'
import { Spinner } from '@/components/atoms/spinner'
import { Ripple } from '@/components/atoms/ripple'
import { withPolygon } from '@/components/utils/react/polymorphism'

export interface ButtonProps extends UseButtonProps {}

const Button = withPolygon<ButtonProps, 'button'>((Polygon, props, ref) => {
  const {
    domRef,
    children,
    styles,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
    isIconOnly,
  } = useButton({ ...props, ref })

  return (
    <Polygon ref={domRef} className={styles} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === 'start' && spinner}
      {isLoading && isIconOnly ? null : children}
      {isLoading && spinnerPlacement === 'end' && spinner}
      {endContent}
      {!disableRipple && <Ripple {...getRippleProps()} />}
    </Polygon>
  )
}, 'button')

Button.displayName = 'NextUI.Button'

export default Button
