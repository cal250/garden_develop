import NameStoryGlowClientLayout from './_components/name-story-glow-layout'
import getCocoon from '@/actions/get-cocoon'
import { getSpecialEcosystem } from '@/actions/get-special-ecosystem'

export default async function SpecialEcoLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ specialEco: string }>
}>) {
  const { specialEco } = await params
  const cocoon = await getCocoon(specialEco)
  const specialEcosystem = await getSpecialEcosystem(specialEco)
  const filteredData = cocoon?.zones?.sort((a: any, b: any) => a.position - b.position)

  const selectedZones = filteredData?.map((zone: any) => {
    return zone.zone.name
  })

  return (
    <section className="flex size-full flex-col items-center">
      <NameStoryGlowClientLayout
        selectedZones={selectedZones}
        specialEcosystem={specialEcosystem}
      />

      {children}
    </section>
  )
}
