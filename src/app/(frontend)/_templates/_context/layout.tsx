'use client'

import { createContext } from '@/components/utils/react/context'

export interface Layout {
  background: string
  floatingBanner: boolean
}

const [Provider, useLayoutContext] = createContext<{
  layout: Layout
  updateLayout: (value: Partial<Layout>) => void
}>({
  name: 'OnboardingLayout',
  errorMessage: 'useLayout must be used within a LayoutProvider',
})

export { Provider as LayoutProvider, useLayoutContext }
