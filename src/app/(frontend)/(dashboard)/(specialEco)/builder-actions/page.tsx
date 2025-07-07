import getSpecialEcosystems from '@/actions/get-special-ecosystems'
import BuilderActionClientPage from './builder-action-client'

const BuilderActionPage = async () => {
  const specialEcosystems = await getSpecialEcosystems()

  return <BuilderActionClientPage specialEcosystems={specialEcosystems} />
}

export default BuilderActionPage
