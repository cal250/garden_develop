import getCocoon from '@/actions/get-cocoon'
import getIcons from '@/actions/get-icons'
import Icons from './icons'

export default async function IconsPage({
  params,
}: {
  params: Promise<{
    specialEco: string
  }>
}) {
  const { specialEco } = await params

  const cocoon = await getCocoon(specialEco)

  if (!cocoon) {
    throw new Error('Cocoon not found')
  }

  const icons = await getIcons()

  return <Icons icons={icons} cocoon={cocoon} />
}
