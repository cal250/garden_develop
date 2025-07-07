import useWindowWidth from '@/hooks/use-window-width'
import { useMemo } from 'react'

export interface Flower {
  id: string | number
  name: string
}

export type FlowerSection = {
  id: number
  items: Array<Flower>
  page: number
}

export function useFlowerSections(flowers: Array<Flower>) {
  const width = useWindowWidth()
  return useMemo(() => {
    // create alternating groups of 3, 4 flowers
    const sections: Array<FlowerSection> = []
    let i = 0
    let group = 0
    while (i < flowers.length) {
      const count = width < 1024 ? 3 : group % 2 === 0 ? 3 : 4
      sections.push({
        id: group,
        page: Math.floor(group / 2),
        items: flowers.slice(i, i + count),
      })
      i += count
      group++
    }
    return { sections, pages: Math.ceil(group / 2) }
  }, [flowers, width])
}
