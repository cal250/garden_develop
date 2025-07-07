'use client'

import React, { Ref, RefObject, useImperativeHandle, useRef } from 'react'
import { filterDOMProps } from '@nextui-org/react-utils'

export type ReactRef<T> = React.RefObject<T> | React.MutableRefObject<T> | React.Ref<T>

/**
 * @param ref
 */
export function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref?: RefObject<T | null> | Ref<T | null>,
): React.MutableRefObject<T | null> {
  const domRef = useRef<T>(null)

  useImperativeHandle(ref, () => domRef.current as T)

  return domRef
}

/**
 * Filters out all props that aren't valid DOM props
 * @param props
 * @param options  - Props to determine the DOM props to filter out
 */
export function filterNonDOMProps(
  props: Record<string, any>,
  options?: Parameters<typeof filterDOMProps>[1],
) {
  const domProps: Record<string, any> = filterDOMProps(props, {
    enabled: true,
    ...options,
  })

  return Object.keys(props).reduce(
    (acc, key) => {
      if (!domProps[key]) {
        acc[key] = props[key]
      }
      return acc
    },
    {} as Record<string, any>,
  )
}
