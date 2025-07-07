import getCocoon from '@/actions/get-cocoon'
import OuterBoundaries from './outer-boundaries'
import getTags from '@/actions/get-tags'

export default async function OuterBoundariesPage({
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

  return <OuterBoundaries cocoon={cocoon} tags={tags} />
}
