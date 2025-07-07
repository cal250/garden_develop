import { OverlayContainer } from '@react-aria/overlays'
import { AnimatePresence, LazyMotion, m } from 'framer-motion'
import { TRANSITION_VARIANTS } from '@nextui-org/framer-utils'
import { warn } from '@nextui-org/shared-utils'
import { Children, cloneElement, isValidElement } from 'react'
import { getTransformOrigins } from '@nextui-org/aria-utils'
import { mergeProps } from '@react-aria/utils'

import { useTooltip, UseTooltipProps } from './use-tooltip'
import { withPolygon } from '@/components/utils/react/polymorphism'

export interface TooltipProps extends Omit<UseTooltipProps, 'disableTriggerFocus' | 'backdrop'> {}

const domAnimation = () => import('@nextui-org/dom-animation').then((res) => res.default)

const Tooltip = withPolygon<TooltipProps>((Polygon, props, ref) => {
  const {
    children,
    content,
    isOpen,
    portalContainer,
    placement,
    disableAnimation,
    motionProps,
    getTriggerProps,
    getTooltipProps,
    getTooltipContentProps,
  } = useTooltip({
    ...props,
    ref,
  })

  let trigger: React.ReactElement

  try {
    /**
     * Ensure tooltip has only one child node
     */
    const childrenNum = Children.count(children)

    if (childrenNum !== 1) throw new Error()

    if (!isValidElement(children)) {
      trigger = <p {...getTriggerProps()}>{children}</p>
    } else {
      const child: any = children as React.ReactElement & {
        ref?: React.Ref<any>
      }

      trigger = cloneElement(child, getTriggerProps(child.props, child.ref))
    }
  } catch (error) {
    trigger = <span />
    warn('Tooltip must have only one child node. Please, check your code.')
  }

  const { ref: tooltipRef, id, style, ...otherTooltipProps } = getTooltipProps()

  const animatedContent = (
    <div ref={tooltipRef} id={id} style={style}>
      <LazyMotion features={domAnimation}>
        <m.div
          animate="enter"
          exit="exit"
          initial="exit"
          variants={TRANSITION_VARIANTS.scaleSpring}
          {...mergeProps(motionProps, otherTooltipProps)}
          style={{
            ...(getTransformOrigins(placement) as any),
          }}
        >
          <Polygon {...getTooltipContentProps()}>
            {typeof content === 'string' ? <span>{content}</span> : content}
          </Polygon>
        </m.div>
      </LazyMotion>
    </div>
  )

  return (
    <>
      {trigger}
      {disableAnimation && isOpen ? (
        <OverlayContainer portalContainer={portalContainer}>
          <div ref={tooltipRef} id={id} style={style} {...otherTooltipProps}>
            <Polygon {...getTooltipContentProps()}>
              {typeof content === 'string' ? <span>{content}</span> : content}
            </Polygon>
          </div>
        </OverlayContainer>
      ) : (
        <AnimatePresence>
          {isOpen ? (
            <OverlayContainer portalContainer={portalContainer}>{animatedContent}</OverlayContainer>
          ) : null}
        </AnimatePresence>
      )}
    </>
  )
})

Tooltip.displayName = 'NextUI.Tooltip'

export default Tooltip
