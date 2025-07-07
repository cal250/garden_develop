import ColorTemplatePicker from './color-template-picker'
import ColorsOctagon from './colors-octagon'
import getColorTemplates from '@/actions/get-color-templates'
import getCocoon from '@/actions/get-cocoon'

export default async function ColorsPage({ params }: ServerProps) {
  const specialEco = ((await params)?.specialEco as string) || ''
  const colorTemplates = await getColorTemplates()
  const cocoon = await getCocoon(specialEco)

  if (!cocoon) {
    throw new Error('Cocoon not found')
  }

  return (
    <div className="flex size-full flex-col items-center">
      <ColorsOctagon cocoon={cocoon} />
      <ColorTemplatePicker colorTemplate={colorTemplates} cocoon={cocoon} />
    </div>
  )
}
