import BuilderImageClientPage from './_components/builder-image-client-page'

const BuilderImagePage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''

  return <BuilderImageClientPage specialEco={specialEco} />
}

export default BuilderImagePage
