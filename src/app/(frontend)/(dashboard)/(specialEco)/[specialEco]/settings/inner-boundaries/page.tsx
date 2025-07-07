import getCocoon from '@/actions/get-cocoon'
import InnerBoundaries from './inner-boundaries'
import getTags from '@/actions/get-tags'

export default async function InnerBoundariesPage({
  params,
}: {
  params: Promise<{
    specialEco: string
  }>
}) {
  const { specialEco } = await params

  const cocoon = await getCocoon(specialEco)

  const tags = await getTags()

  if (!cocoon) {
    throw new Error('Cocoon not found')
  }

  return <InnerBoundaries cocoon={cocoon} tags={tags} />
}
