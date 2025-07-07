'use client'

import React, { PropsWithChildren, useEffect } from 'react'
import { usePageStepsContext } from '@/app/(frontend)/_templates/_context/page-steps'
import { usePathname } from 'next/navigation'

const steps = [
  { path: '/templates/create/season', title: 'season' },
  { path: '/templates/create/energy', title: 'energy' },
  { path: '/templates/create/word', title: 'word' },
  { path: '/templates/create/image', title: 'image' },
  { path: '/templates/create/type', title: 'type' },
  { path: '/templates/create/destination', title: 'destination' },
]

const sproutSteps = [
  { path: '/templates/create/sprout/compose', title: 'compose' },
  { path: '/templates/create/sprout/humometer', title: 'AI homometer' },
  { path: '/templates/create/sprout/harvest', title: 'harvest' },
]

const CreateLayout: React.FC<PropsWithChildren<CreateLayoutProps>> = (props) => {
  const { updateSteps } = usePageStepsContext()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname?.startsWith('/templates/create/sprout')) {
      updateSteps(sproutSteps)
    } else {
      updateSteps(steps)
    }

    return () => updateSteps([])
  }, [pathname])

  return props.children
}

interface CreateLayoutProps {}

export default CreateLayout
