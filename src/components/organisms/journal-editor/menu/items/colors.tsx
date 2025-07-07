import { useCurrentEditor } from '@tiptap/react'
import React from 'react'
import { DropdownIcon } from '@/components/organisms/journal-editor/icons'
import { colors } from '@/components/utils/wysiwyg'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'

export const ColorsMenu: React.FC<ColorsMenuProps> = (props) => {
  const { editor } = useCurrentEditor()
  const [selectedColor, setSelectedColor] = React.useState(colors[0])

  if (!editor) {
    return null
  }

  const handleColorSelect = (color: any) => {
    setSelectedColor(color)
    editor.chain().focus().setColor(color.value).run()
  }

  return (
    <Popover
      placement="bottom"
      showArrow={false}
      classNames={{
        content:
          'rounded-none pb-8 bg-gradient-to-b from-color-8 via-color-3/30 to-color-3 p-4',
      }}
    >
      <PopoverTrigger>
        <button className="group flex h-8 w-12 cursor-pointer items-center justify-between">
          <div
            className="h-6 w-6 rounded-md border-color-5 border-2"
            style={{ background: selectedColor.value }}
          />
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
        <div className="grid grid-cols-6 gap-2">
          {colors.map((color) => (
            <button
              key={color.label}
              onClick={() => handleColorSelect(color)}
              className="focus:ring-ring w-full font-bold rounded-none text-left hover:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 text-color-2"
            >
              <div
                style={{ background: color.value }}
                className="h-6 w-6 rounded-md"
                title={color.label}
              />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface ColorsMenuProps {}
