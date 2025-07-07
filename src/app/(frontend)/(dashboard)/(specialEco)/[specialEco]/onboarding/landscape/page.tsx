
import getCocoon from '@/actions/get-cocoon'
import { getSpecialEcosystem } from '@/actions/get-special-ecosystem'
import OnboardingLandscapeClientPage from './_components/landscape-client-page'

const OnboardingAvatarPage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''
  const specialEcosystem = await getSpecialEcosystem(specialEco)
  const cocoon = await getCocoon(specialEco)

  return (
    <OnboardingLandscapeClientPage
      specialEco={specialEco}
      specialEcosystem={specialEcosystem}
      cocoon={cocoon}
    />
  )
}

export default OnboardingAvatarPage
