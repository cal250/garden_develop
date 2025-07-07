import getCocoon from '@/actions/get-cocoon'
import OnboardingZoneClientPage from './_components/zone-client-page'
import { getZonesBySpecialEcosystem } from '@/actions/get-zones-by-special-eco'
import { getSpecialEcosystem } from '@/actions/get-special-ecosystem'

const OnboardingZonePage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''
  // const type = ((await searchParams)?.type as string) || 'Seed'
  const cocoon = await getCocoon(specialEco)
  const specialEcosystem = await getSpecialEcosystem(specialEco)
  const zones = await getZonesBySpecialEcosystem({ specialEcoId: specialEco })

  // console.log(zones, 'This is zones using special eco')
  return (
    <OnboardingZoneClientPage
      // type={type}
      specialEco={specialEco}
      cocoon={cocoon}
      initialZones={zones}
      specialEcosystem={specialEcosystem}
    />
  )
}

export default OnboardingZonePage
