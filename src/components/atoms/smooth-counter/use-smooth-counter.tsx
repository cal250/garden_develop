import { HTMLNextUIProps, PropGetter } from '@nextui-org/system'
import React, { useCallback, useEffect } from 'react'
import { useIntersectionObserver } from '@nextui-org/use-intersection-observer'

export interface UseSmoothCounterProps extends HTMLNextUIProps<'span'> {
  value: number
  duration?: number
  frequency?: number
}

export function useSmoothCounter(props: UseSmoothCounterProps, ref: React.RefObject<HTMLElement>) {
  const [displayValue, setDisplayValue] = React.useState(0)
  const [setRef, isVisible] = useIntersectionObserver()

  useEffect(() => {
    if (ref.current) {
      setRef(ref.current)
    }
  }, [ref.current])

  const { value, duration = 1000, frequency = 5, ...otherProps } = props

  useEffect(() => {
    const start = 0
    const interval = 1000 / frequency // Time per update in milliseconds
    let lastUpdate = performance.now()

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      if (!isVisible) return
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)

      if (currentTime - lastUpdate >= interval) {
        const currentValue = Math.floor(start + (value - start) * progress)
        setDisplayValue(currentValue)
        lastUpdate = currentTime
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    if (isVisible) {
      requestAnimationFrame(animate)
    }
  }, [value, duration, frequency, isVisible])

  const getCounterProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...otherProps,
        style: {
          ...otherProps.style,
          display: 'inline-flex',
        },
      }
    },
    [otherProps],
  )

  return {
    getCounterProps,
    value: displayValue,
    duration,
  }
}
