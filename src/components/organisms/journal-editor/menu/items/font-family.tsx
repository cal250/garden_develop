import { useCurrentEditor } from '@tiptap/react'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { DropdownIcon } from '@/components/organisms/journal-editor/icons'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'

export const fonts = [
  { name: 'Montserrat Alternates', value: '"Montserrat Alternates", cursive' },
  { name: 'QuickSand', value: '"Quicksand", sans-serif' },
  { name: 'Nunito', value: '"Nunito", sans-serif' },
]

export const FontFamilyMenu: React.FC<FontFamilyMenuProps> = (props) => {
  const { editor } = useCurrentEditor()
  const [selectedFont, setSelectedFont] = React.useState(fonts[0])
  const [open, setOpen] = React.useState(false)

  if (!editor) {
    return null
  }

  const handleFontSelect = (font: any) => {
    setSelectedFont(font)
    editor.chain().focus().setFontFamily(font.value).run()
    setOpen(false)
  }

  return (
    <Popover
      isOpen={open}
      onOpenChange={setOpen}
      placement="bottom"
      classNames={{
        content:
          'rounded-none pb-8 bg-gradient-to-b from-color-8 via-color-3/30 to-color-3 px-0',
      }}
    >
      <PopoverTrigger asChild>
        <button className="group flex h-8 cursor-pointer items-center justify-between px-1 max-w-28">
          <span
            className="text-sm font-bold group-aria-expanded:text-color-2 line-clamp-1"
            style={{ fontFamily: selectedFont.value }}
          >
            {selectedFont.name}
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
          {fonts.map((font) => (
            <button
              key={font.name}
              onClick={() => handleFontSelect(font)}
              className="focus:ring-ring w-full font-bold rounded-none px-4 py-1.5 text-left hover:text-color-1 hover:bg-color-7 focus:outline-none focus:ring-2 focus:ring-offset-2 text-color-2"
            >
              <span style={{ fontFamily: font.value }} className="block">
                {font.name}
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface FontFamilyMenuProps {}
