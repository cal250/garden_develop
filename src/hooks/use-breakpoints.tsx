'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import config from '../../tailwind.config'

export type Breakpoints = 'sm' | 'md' | 'lg' | 'xl'

export const breakpoints = Object.entries(config.theme!.screens || {}).reduce(
  (acc, [key, value]) => {
    return { ...acc, [key]: Number(value.replace('px', '')) }
  },
  {},
) as Record<Breakpoints, number>

export const useBreakpoints = (): Record<`is${Capitalize<Breakpoints>}`, boolean> => {
  const isSm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`)
  const isMd = useMediaQuery(`(min-width: ${breakpoints.md}px)`)
  const isLg = useMediaQuery(`(min-width: ${breakpoints.lg}px)`)
  const isXl = useMediaQuery(`(min-width: ${breakpoints.xl}px)`)

  return {
    isSm,
    isMd,
    isLg,
    isXl,
  }
}
