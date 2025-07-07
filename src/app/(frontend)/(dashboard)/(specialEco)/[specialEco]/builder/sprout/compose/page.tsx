import ComposeClientPage from './_components/compose-client-page'

const BuilderIntentionPage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''

  return <ComposeClientPage specialEco={specialEco} />
}

export default BuilderIntentionPage
