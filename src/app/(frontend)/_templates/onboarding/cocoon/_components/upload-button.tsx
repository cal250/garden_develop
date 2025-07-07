import { Button } from '@/components/atoms/button'
import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import UpArrowIcon from '@/features/icons/up-arrow-icon'
import { ChangeEvent, useCallback } from 'react'
import { forwardRef } from '@/components/utils/react/polymorphism'
import { useDOMRef } from '@/components/utils/react/dom'

interface UploadButtonProps {
  text: string
  onFileSelect: (file: File, previewUrl: string) => void
}

export const UploadButton = forwardRef<UploadButtonProps>(({ text, onFileSelect }, ref) => {
  const domRef = useDOMRef(ref)

  const addFile = useCallback(() => {
    domRef.current?.click()
  }, [])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      const file = e.target.files[0]
      if (file instanceof File) {
        const reader = new FileReader()
        reader.onloadend = () => {
          onFileSelect(file, reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Button
        onPress={addFile}
        polygon={RegularOctagon}
        strokeWidth={5}
        stroke="#F2EB2E"
        variant="solid"
        className="h-[85px] w-[88px] bg-[#8858B5] text-[#F2EB2E] flex flex-col items-center justify-center"
      >
        <UpArrowIcon />
      </Button>

      <p className="w-[99px] text-center text-xl font-bold text-[#FFF450]">{text}</p>
      <input ref={domRef} onChange={handleChange} id="file" type="file" className="hidden" />
    </div>
  )
})
