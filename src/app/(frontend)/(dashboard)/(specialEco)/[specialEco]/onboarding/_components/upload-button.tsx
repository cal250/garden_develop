import { Button } from '@/components/atoms/button'
import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import CloudUploadIcon from '@/features/icons/cloud-upload-icon'
import UpArrowIcon from '@/features/icons/up-arrow-icon'
import type { ChangeEvent } from 'react'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'

export default function UploadButton({
  text,
  onFileSelect,
  disable = false,
}: {
  text: string
  onFileSelect: (file: File, previewUrl: string) => void
  disable?: boolean
}) {
  const uploadFileRef = useRef<HTMLInputElement | null>(null)

  function addFile() {
    uploadFileRef.current?.click()
  }

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
      {/* <Button
        as="button"
        disable={disable}
        onPress={addFile}
        polygon={RegularOctagon}
        strokeWidth={5}
        stroke="rgb(var(--color-4))"
        variant="solid"
        className="h-[75px] md:h-[85px] w-[75px] md:w-[85px] flex flex-col items-center justify-center bg-color-7 text-color-2 disabled:opacity-30"
      >
        <UpArrowIcon />
      </Button> */}

      <button
        type="button"
        disabled={disable}
        onClick={addFile}
        className="flex flex-col items-center justify-center text-color-10 hover:text-color-1 focus:text-color-1 md:focus:text-color-10 disabled:opacity-30 bg-transparent"
      >
        <CloudUploadIcon />
      </button>

      <p
        className={twMerge(
          'w-[99px] text-center text-base font-extrabold text-color-13',
          disable && 'opacity-30',
        )}
      >
        {text}
      </p>

      <input
        disabled={disable}
        ref={uploadFileRef}
        onChange={handleChange}
        // accept="file"
        id="file"
        type="file"
        className="hidden"
      />
    </div>
  )
}
