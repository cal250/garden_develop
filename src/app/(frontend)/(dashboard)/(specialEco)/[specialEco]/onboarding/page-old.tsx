import getSpecialEcosystems from '@/actions/get-special-ecosystems'
import OnboardingSeasonClientPage from './season-client-page'
import getCocoon from '@/actions/get-cocoon'

const OnboardingAvatarPage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''
  const specialEcosystems = await getSpecialEcosystems()
 const cocoon = await getCocoon(specialEco)

  return (
    <OnboardingSeasonClientPage
      specialEco={specialEco}
      specialEcosystems={specialEcosystems}
      cocoon={cocoon}
    />
  )
}

export default OnboardingAvatarPage
