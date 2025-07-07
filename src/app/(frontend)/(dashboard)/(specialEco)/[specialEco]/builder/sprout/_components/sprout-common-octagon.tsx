'use client'

import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { useAuth } from '@/features/providers/auth'
import RadialPolygon from '@/components/molecules/radial-polygon/radial-polygon'

const SproutCommonOctagon = () => {
  const { user } = useAuth()

  const octagonSize = useResponsiveValue({
    base: 350,
    sm: 450,
    md: 528,
  })
  const innerOctagonSize = useResponsiveValue<string | number>({
    base: 180,
    sm: 200,
    md: 225,
  })

  return (
    <RadialPolygon
      sides={8}
      rotation={45}
      numLayers={2}
      coreSize={0.43}
      boundary={{
        radii: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
        chord: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
        inner: { stroke: 'rgb(var(--color-4))', strokeWidth: 4 },
        outer: { stroke: 'rgb(var(--color-4))', strokeWidth: 5 },
      }}
      style={{
        width: octagonSize,
        height: octagonSize,
        background:
          'conic-gradient(from 89.99deg at 50% 50%, rgb(var(--color-8)) 0deg, rgb(var(--color-8)) 212.4deg, rgb(var(--color-9)) 313.2deg, rgb(var(--color-8)) 360deg)',
      }}
    >
      <img
        alt="user-avatar"
        src={user?.avatar?.url ? user?.avatar?.url : '/assets/onboarding/bee.png'}
        className="h-full object-cover object-center"
        style={{
          width: innerOctagonSize,
        }}
      />
    </RadialPolygon>
  )
}

export default SproutCommonOctagon
