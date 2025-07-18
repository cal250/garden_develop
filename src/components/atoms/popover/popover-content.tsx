import type { AriaDialogProps } from '@react-aria/dialog'
import { useDialog } from '@react-aria/dialog'
import type { HTMLMotionProps } from 'framer-motion'
import { LazyMotion, m } from 'framer-motion'

import { DOMAttributes, ReactNode, useMemo, useRef } from 'react'
import { DismissButton } from '@react-aria/overlays'
import { TRANSITION_VARIANTS } from '@nextui-org/framer-utils'
import { HTMLNextUIProps } from '@nextui-org/system'
import { getTransformOrigins } from '@nextui-org/aria-utils'

import { usePopoverContext } from './popover-context'
import { withPolygon } from '@/components/utils/react/polymorphism'

export interface PopoverContentProps
  extends AriaDialogProps,
    Omit<HTMLNextUIProps, 'children' | 'role'> {
  children: ReactNode | ((titleProps: DOMAttributes<HTMLElement>) => ReactNode)
}

const domAnimation = () => import('@nextui-org/dom-animation').then((res) => res.default)

const PopoverContent = withPolygon<PopoverContentProps>((PolygonComponent, props) => {
  const { as, children, className, ...otherProps } = props

  const {
    placement,
    backdrop,
    motionProps,
    disableAnimation,
    getPopoverProps,
    getDialogProps,
    getBackdropProps,
    getContentProps,
    isNonModal,
    onClose,
  } = usePopoverContext()

  const dialogRef = useRef(null)
  const { dialogProps: ariaDialogProps, titleProps } = useDialog({}, dialogRef)
  const dialogProps = getDialogProps({
    ref: dialogRef,
    ...ariaDialogProps,
    ...otherProps,
  })


  const content = (
    <>
      {!isNonModal && <DismissButton onDismiss={onClose} />}
      <PolygonComponent {...dialogProps}>
        <div {...getContentProps({ className })}>
          {typeof children === 'function' ? children(titleProps) : children}
        </div>
      </PolygonComponent>
      <DismissButton onDismiss={onClose} />
    </>
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

  const contents = (
    <>
      {disableAnimation ? (
        content
      ) : (
        <LazyMotion features={domAnimation}>
          <m.div
            animate="enter"
            exit="exit"
            initial="initial"
            style={{
              ...getTransformOrigins(placement === 'center' ? 'top' : placement),
            }}
            variants={TRANSITION_VARIANTS.scaleSpringOpacity}
            {...motionProps}
          >
            {content}
          </m.div>
        </LazyMotion>
      )}
    </>
  )

  return (
    <div {...getPopoverProps()}>
      {backdropContent}
      {contents}
    </div>
  )
})

PopoverContent.displayName = 'NextUI.PopoverContent'

export default PopoverContent
