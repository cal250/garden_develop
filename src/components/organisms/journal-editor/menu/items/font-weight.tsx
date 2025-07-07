import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { useCurrentEditor } from '@tiptap/react'
import { DropdownIcon } from '@/components/organisms/journal-editor/icons'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'

const fontWeights = [
  { name: 'Black', value: '900', class: 'font-black' },
  { name: 'ExtraBold', value: '800', class: 'font-extrabold' },
  { name: 'Bold', value: '700', class: 'font-bold' },
  { name: 'Semibold', value: '600', class: 'font-semibold' },
  { name: 'Medium', value: '500', class: 'font-medium' },
  { name: 'Regular', value: '400', class: 'font-regular' },
  { name: 'Light', value: '300', class: 'font-light' },
  { name: 'ExtraLight', value: '200', class: 'font-extralight' },
  { name: 'Thin', value: '100', class: 'font-thin' },
]

export const FontWeightMenu: React.FC<FontWeightMenuProps> = ({}) => {
  const [selectedWeight, setSelectedWeight] = React.useState(fontWeights[5]) // Regular as default
  const [open, setOpen] = React.useState(false)
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const handleWeightSelect = (weight: any) => {
    setSelectedWeight(weight)
    editor.chain().focus().updateAttributes('paragraph', { class: weight.class }).run()
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
        <button className="group flex h-8 cursor-pointer items-center justify-between gap-2 px-1">
          <span className="text-sm font-bold group-aria-expanded:text-color-2">
            {selectedWeight.name}
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
          {fontWeights.map((weight) => (
            <button
              key={weight.name}
              onClick={() => handleWeightSelect(weight)}
              className="focus:ring-ring w-full font-bold rounded-none px-4 py-1.5 text-left hover:text-color-1 hover:bg-color-7 focus:outline-none focus:ring-2 focus:ring-offset-2 text-color-2"
            >
              <span className="block font-bold">{weight.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface FontWeightMenuProps {}
