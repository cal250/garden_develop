import getSpecialEcosystems from '@/actions/get-special-ecosystems'
import OnboardingActionClientPage from './action-client-page'
import getCocoons from '@/actions/get-cocoons'

const OnboardingAvatarPage = async () => {
  const specialEcosystems = await getSpecialEcosystems()
  const cocoons = await getCocoons()

  // console.log(cocoons, 'This is all cocoons')

  return <OnboardingActionClientPage specialEcosystems={specialEcosystems} cocoons={cocoons} />
}

export default OnboardingAvatarPage
