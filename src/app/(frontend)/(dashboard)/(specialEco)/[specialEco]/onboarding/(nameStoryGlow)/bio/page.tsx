import getCocoon from '@/actions/get-cocoon'
import OnboardingBioClientPage from './_component/bio-client-page'

const OnboardingWelcomePage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''
  const cocoon = await getCocoon(specialEco)

  if (!cocoon) {
    throw new Error('No cocoon found')
  }

  return <OnboardingBioClientPage specialEco={specialEco} cocoon={cocoon} />
}

export default OnboardingWelcomePage
