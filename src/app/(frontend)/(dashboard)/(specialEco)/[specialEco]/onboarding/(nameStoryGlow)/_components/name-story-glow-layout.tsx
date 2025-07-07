'use client'

import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { useEffect, useState } from 'react'
import { useAuth } from '@/features/providers/auth'
import { NameStoryGlowOctagon } from './name-story-glow-octagon'

interface props {
  selectedZones: string[] | undefined
  specialEcosystem: any
}

const NameStoryGlowClientLayout = ({ selectedZones, specialEcosystem }: props) => {
  const { user } = useAuth()

  const octagonSize = useResponsiveValue({
    base: 350,
    sm: 450,
    md: 528,
  })

  const [ecoIcon, setEcoIcon] = useState<string | null>(null)

  useEffect(() => {
    if (specialEcosystem?.icon?.url) {
      setEcoIcon(specialEcosystem.icon.url)
    } else {
      setEcoIcon(null)
    }
  }, [specialEcosystem])

  return (
    <div
      style={{ width: octagonSize, height: octagonSize }}
      className="relative mt-[-65px] md:mt-[-60px] z-20 flex flex-col items-center justify-center"
    >
      <NameStoryGlowOctagon
        octagonData={selectedZones as any[]}
        userAvatar={user?.avatar?.url ?? ''}
        ecoIcon={ecoIcon}
      />
    </div>
  )
}

export default NameStoryGlowClientLayout
