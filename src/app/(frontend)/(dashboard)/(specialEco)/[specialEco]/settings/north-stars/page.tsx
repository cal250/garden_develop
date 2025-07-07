import getCocoon from '@/actions/get-cocoon'
import NorthStars from './north-stars'
import getTags from '@/actions/get-tags'

export default async function NorthStarsPage({
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

  return <NorthStars cocoon={cocoon} tags={tags} />
}
