import BuilderCompletedClientPage from './_components/builder-completed-client-page'

const BuilderCompletedPage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''

  return <BuilderCompletedClientPage specialEco={specialEco} />
}

export default BuilderCompletedPage
