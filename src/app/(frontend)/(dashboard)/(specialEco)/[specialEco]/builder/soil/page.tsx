import getCocoon from '@/actions/get-cocoon'
import { getSpecialEcosystem } from '@/actions/get-special-ecosystem'
import BuilderSoilClientPage from './_components/builder-soil-client-page'

const BuilderSoilPage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''
  const cocoon = await getCocoon(specialEco)
  const specialEcosystem = await getSpecialEcosystem(specialEco)

  // console.log(cocoon, 'This is cocoon from server')
  return (
    <BuilderSoilClientPage
      specialEco={specialEco}
      cocoon={cocoon}
      specialEcosystem={specialEcosystem}
    />
  )
}

export default BuilderSoilPage
