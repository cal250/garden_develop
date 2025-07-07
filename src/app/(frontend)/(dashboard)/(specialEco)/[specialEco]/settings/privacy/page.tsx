import PrivacyOctagon from './privacy-octagon'
import PrivacyInput from './privacy-input'
import getCocoon from '@/actions/get-cocoon';

export default async function IconsPage({
  params,
}: {
  params: Promise<{ specialEco: string }>
}) {
  const { specialEco } = await params
  const cocoon = await getCocoon(specialEco)

  if (!cocoon) {
    throw new Error('Cocoon not found')
  }

  return (
    <div className="flex size-full flex-col items-center">
      <PrivacyOctagon cocoon={cocoon} />
      <PrivacyInput />
    </div>
  )
}
