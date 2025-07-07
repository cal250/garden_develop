import { getSpecialEcosystem } from '@/actions/get-special-ecosystem'
import BuilderWordClientPage from './_components/builder-word-client-page'

const BuilderWordPage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''
  const specialEcosystem = await getSpecialEcosystem(specialEco)

  return <BuilderWordClientPage specialEco={specialEco} specialEcosystem={specialEcosystem} />
}

export default BuilderWordPage
