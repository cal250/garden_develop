import type { AriaDialogProps } from '@react-aria/dialog'
import { useDialog } from '@react-aria/dialog'
import type { HTMLMotionProps } from 'framer-motion'
import { LazyMotion, m } from 'framer-motion'

import { cloneElement, isValidElement, KeyboardEvent, ReactNode, useCallback, useMemo } from 'react'
import { DismissButton } from '@react-aria/overlays'
import { TRANSITION_VARIANTS } from '@nextui-org/framer-utils'
import { CloseIcon } from '@nextui-org/shared-icons'
import { chain, mergeProps, useViewportSize } from '@react-aria/utils'
import { HTMLNextUIProps } from '@nextui-org/system'

import { useModalContext } from './modal-context'
import { scaleInOut } from './modal-transition'
import { withPolygon } from '@/components/utils/react/polymorphism'

type KeysToOmit = 'children' | 'role'

export interface ModalContentProps extends AriaDialogProps, HTMLNextUIProps<'div', KeysToOmit> {
  children: ReactNode | ((onClose: () => void) => ReactNode)
}

const domAnimation = () => import('@nextui-org/dom-animation').then((res) => res.default)

const ModalContent = withPolygon<ModalContentProps>((PolygonComponent, props) => {
  const { as, children, role = 'dialog', ...otherProps } = props

  const {
    domRef,
    slots,
    classNames,
    motionProps,
    backdrop,
    closeButton,
    hideCloseButton,
    disableAnimation,
    getDialogProps,
    getBackdropProps,
    getCloseButtonProps,
    onClose,
  } = useModalContext()

  const Component = PolygonComponent

  const viewport = useViewportSize()

  const { dialogProps } = useDialog(
    {
      role,
    },
    domRef,
  )

  const closeButtonContent = isValidElement(closeButton) ? (
    cloneElement(closeButton, getCloseButtonProps())
  ) : (
    <button {...getCloseButtonProps()}>
      <CloseIcon />
    </button>
  )

  // Handle Tab key during IME composition to prevent input carryover
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab' && e.nativeEvent.isComposing) {
      e.stopPropagation()
      e.preventDefault()
    }
  }, [])

  const contentProps = getDialogProps(mergeProps(dialogProps, otherProps))
  const content = (
    <Component {...contentProps} onKeyDown={chain(contentProps.onKeyDown, onKeyDown)}>
      <DismissButton onDismiss={onClose} />
      {!hideCloseButton && closeButtonContent}
      {typeof children === 'function' ? children(onClose) : children}
      <DismissButton onDismiss={onClose} />
    </Component>
  )

  const backdropContent = useMemo(() => {
    if (backdrop === 'transparent') {
      return null
    }

    if (disableAnimation) {
      return <div {...getBackdropProps()} />
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          animate="enter"
          exit="exit"
          initial="exit"
          variants={TRANSITION_VARIANTS.fade}
          {...(getBackdropProps() as HTMLMotionProps<'div'>)}
        />
      </LazyMotion>
    )
  }, [backdrop, disableAnimation, getBackdropProps])

  // set the height dynamically to avoid keyboard covering the bottom modal
  const viewportStyle = {
    '--visual-viewport-height': viewport.height + 'px',
  }

  const contents = disableAnimation ? (
    <div
      className={slots.wrapper({ class: classNames?.wrapper })}
      data-slot="wrapper"
      // @ts-ignore
      style={viewportStyle}
    >
      {content}
    </div>
  ) : (
    <LazyMotion features={domAnimation}>
      <m.div
        animate="enter"
        className={slots.wrapper({ class: classNames?.wrapper })}
        data-slot="wrapper"
        exit="exit"
        initial="exit"
        variants={scaleInOut}
        {...motionProps}
        // @ts-ignore
        style={viewportStyle}
      >
        {content}
      </m.div>
    </LazyMotion>
  )

  return (
    <div tabIndex={-1}>
      {backdropContent}
      {contents}
    </div>
  )
})

ModalContent.displayName = 'NextUI.ModalContent'

export default ModalContent
