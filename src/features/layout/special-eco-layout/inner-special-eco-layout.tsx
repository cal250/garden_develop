'use client'

import getCocoon from '@/actions/get-cocoon'
import { getSpecialEcosystem } from '@/actions/get-special-ecosystem'
import { Ecosystem } from '@/payload-types'
import useLandscapeStore from '@/stores/landscape-store'
import { useQuery } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { useParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function InnerSpecialEcoLayout({
  children,
  ecosystem,
}: Readonly<{
  children: React.ReactNode
  ecosystem: Ecosystem
}>) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const specialEco = useParams()?.specialEco as string

  const { updateUrl, reset } = useLandscapeStore()

  const { data: cocoon } = useQuery({
    queryKey: [`cocoon-${specialEco}`],
    queryFn: () => getCocoon(specialEco),
  })

  const { data: specialEcosystem } = useQuery({
    queryKey: [`specialEcosystem-${specialEco}`],
    queryFn: () => getSpecialEcosystem(specialEco),
  })

  const ecosystemColorTemplateId =
    typeof ecosystem?.colorTemplate === 'string'
      ? ecosystem.colorTemplate
      : ecosystem?.colorTemplate?.id

  const cocoonColorTemplateId =
    typeof cocoon?.colorTemplate === 'string' ? cocoon.colorTemplate : cocoon?.colorTemplate?.id

  useEffect(() => {
    if (
      cocoonColorTemplateId &&
      cocoonColorTemplateId !== theme &&
      pathname === `/${specialEco}/settings/colors`
    ) {
      setTheme(cocoonColorTemplateId)
      return
    }

    if (ecosystemColorTemplateId && ecosystemColorTemplateId !== theme) {
      setTheme(ecosystemColorTemplateId)
    }
  }, [ecosystemColorTemplateId, pathname])

  useEffect(() => {
    if (cocoon) {
      if (typeof cocoon?.landscape === 'object' && cocoon?.landscape?.url) {
        updateUrl(cocoon?.landscape?.url)
      } else if (typeof specialEcosystem?.image === 'object' && specialEcosystem?.image?.url) {
        updateUrl(specialEcosystem.image.url)
      } else {
        reset()
      }
    } else {
      if (typeof specialEcosystem?.image === 'object' && specialEcosystem?.image?.url) {
        updateUrl(specialEcosystem.image.url)
      } else {
        reset()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cocoon, specialEcosystem])

  return <>{children}</>
}
