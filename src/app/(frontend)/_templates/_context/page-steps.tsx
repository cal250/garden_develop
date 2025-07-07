import { createContext } from '@/components/utils/react/context'
import React, { PropsWithChildren, useState } from 'react'
import { usePathname } from 'next/navigation'

export type PageInfo = { path: string; title: string }

export interface PageStepsData {
  steps: Array<PageInfo>
  pageIndex: number
  updateSteps: (steps: Array<PageInfo>) => void
}

const [Provider, useContext] = createContext<PageStepsData>({
  name: 'PageStepsProvider',
  strict: true,
})

export const PageStepsProvider: React.FC<PropsWithChildren<PageStepsProviderProps>> = (props) => {
  const [steps, setSteps] = useState<Array<PageInfo>>([])
  const pathname = usePathname()
  return (
    <Provider
      value={{
        steps,
        updateSteps: setSteps,
        pageIndex: steps.findIndex((page) => pathname && pathname.startsWith(page.path)),
      }}
    >
      {props.children}
    </Provider>
  )
}

interface PageStepsProviderProps {}

export { useContext as usePageStepsContext }
