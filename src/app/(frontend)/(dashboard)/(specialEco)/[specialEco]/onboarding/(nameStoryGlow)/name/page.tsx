import getCocoon from '@/actions/get-cocoon'
import OnboardingNameClientPage from './_components/name-client-page'

const OnboardingNamePage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''
  const cocoon = await getCocoon(specialEco)

  if (!cocoon) {
    throw new Error('No cocoon found')
  }

  return <OnboardingNameClientPage specialEco={specialEco} cocoon={cocoon} />
}

export default OnboardingNamePage
