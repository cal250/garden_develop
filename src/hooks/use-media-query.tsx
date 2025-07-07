'use client'

import { useEffect, useState } from 'react'
import { useEventListener } from '@/hooks/use-event-listener'

export function useMediaQuery(mediaQuery: string): boolean {
  const [isMatch, setIsMatch] = useState(false)

  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(null)

  useEffect(() => {
    const list = window.matchMedia(mediaQuery)
    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery])

  useEventListener('change', (e) => setIsMatch(e.matches), mediaQueryList)

  return isMatch
}
