import BuilderDoubleWordClientPage from '../_components/double-word'

const BuilderDoubleWordPage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''

  return <BuilderDoubleWordClientPage specialEco={specialEco} />
}

export default BuilderDoubleWordPage
