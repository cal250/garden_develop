import BuilderIntentionClientPage from './_components/builder-intention-client-page'

const BuilderIntentionPage = async ({ params }: ServerProps) => {
  const specialEco = ((await params)?.specialEco as string) || ''

  return <BuilderIntentionClientPage specialEco={specialEco} />
}

export default BuilderIntentionPage
