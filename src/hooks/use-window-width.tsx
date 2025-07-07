'use client'

import { useEffect, useState } from 'react'

/**
 * Custom hook to track window width
 * @returns {number} Current window width
 */
const useWindowWidth = (): number => {
  // Initialize with window width or default to 0 if window is not available (SSR)
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty array ensures effect is only run on mount and unmount

  return width
}

export default useWindowWidth
