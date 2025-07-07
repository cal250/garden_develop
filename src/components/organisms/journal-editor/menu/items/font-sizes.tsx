import React from 'react'
import { useCurrentEditor } from '@tiptap/react'
import { DropdownIcon } from '@/components/organisms/journal-editor/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'

export const fontSizes = [10, 11, 12, 13, 14, 16, 20, 24, 32, 36, 40, 48, 64, 96, 128]

export const FontSizeMenu: React.FC<FontSizeMenuProps> = (props) => {
  const [selectedFontSize, setSelectedFontSize] = React.useState(10) // Regular as default
  const [open, setOpen] = React.useState(false)
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const handleFontSizeSelect = (fontSize: any) => {
    setSelectedFontSize(fontSize)
    editor
      .chain()
      .focus()
      .setMark('textStyle', { fontSize: `${fontSize}px` })
      .run()
    setOpen(false)
  }

  return (
    <Popover
      isOpen={open}
      onOpenChange={setOpen}
      placement="bottom"
      classNames={{
        content:
          'rounded-none pb-8 bg-gradient-to-b from-color-8 via-color-3/30 to-color-3 px-0 w-[60px]',
      }}
    >
      <PopoverTrigger asChild>
        <button className="group flex h-8 cursor-pointer items-center justify-between gap-2 px-1">
          <span className="text-sm font-bold group-aria-expanded:text-color-2">
            {selectedFontSize}
          </span>
          <DropdownIcon className="transition-all group-aria-expanded:rotate-180" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        polygon={HouseHexagon}
        inverted
        stroke="rgb(var(--color-4))"
        roofHeight={30}
        roofWidth={0.7}
      >
        <div className="flex flex-col space-y-1">
          {fontSizes.map((fontSize) => (
            <button
              key={fontSize}
              onClick={() => handleFontSizeSelect(fontSize)}
              className="focus:ring-ring w-full font-bold rounded-none px-4 py-1.5 text-left hover:text-color-1 hover:bg-color-7 focus:outline-none focus:ring-2 focus:ring-offset-2 text-color-2"
            >
              <span className="block font-bold">{fontSize}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface FontSizeMenuProps {}
