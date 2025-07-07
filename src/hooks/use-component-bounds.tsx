'use client'

import React from 'react'
import { useResizeObserver } from '@react-aria/utils'

/**
 * Hook to get the bounds of a component. It will update the bounds when the component is resized.
 * @param ref
 * @param deps Additional dependencies to trigger an update
 */
export function useComponentBounds(
  ref: React.RefObject<HTMLElement | null>,
  deps: Array<any> = [],
) {
  const [bounds, setBounds] = React.useState<DOMRect | null>(null)

  useResizeObserver({
    ref,
    onResize: () => {
      if (ref.current) {
        const newBounds = ref.current.getBoundingClientRect()

        if (!bounds || newBounds.width !== bounds.width || newBounds.height !== bounds.height) {
          setBounds(newBounds)
        }
      }
    },
  })

  React.useEffect(() => {
    if (ref.current) {
      setBounds(ref.current.getBoundingClientRect())
    }
  }, deps)

  return bounds
}
