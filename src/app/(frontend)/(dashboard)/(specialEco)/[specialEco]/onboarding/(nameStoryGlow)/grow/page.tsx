import OnboardingGrowClientPage from './_components/grow-client-page'

const OnboardingGrowPage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''

  return <OnboardingGrowClientPage specialEco={specialEco} />
}

export default OnboardingGrowPage
