import BuilderSingleWordClientPage from '../_components/single-word'

const BuilderSingleWordPage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''

  return <BuilderSingleWordClientPage specialEco={specialEco} />
}

export default BuilderSingleWordPage
