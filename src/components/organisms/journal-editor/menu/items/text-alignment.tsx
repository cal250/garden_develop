import {
  DropdownIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignmentIcon,
  TextAlignRightIcon,
} from '@/components/organisms/journal-editor/icons'
import React from 'react'
import { useCurrentEditor } from '@tiptap/react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'

export const textAlignment = [
  { icon: <TextAlignLeftIcon />, value: 'left', label: 'Left' },
  { icon: <TextAlignCenterIcon />, value: 'center', label: 'Center' },
  { icon: <TextAlignRightIcon />, value: 'right', label: 'Right' },
  { icon: <TextAlignJustifyIcon />, value: 'justify', label: 'Justify' },
]

export const TextAlignmentMenu: React.FC<TextAlignmentMenuProps> = (props) => {
  const { editor } = useCurrentEditor()
  const [open, setOpen] = React.useState(false)

  if (!editor) {
    return null
  }

  const handleTextAlignmentChange = (value: any) => {
    console.log(value);
    editor.chain().focus().setTextAlign(value).run()
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
        <button className="group flex h-8 cursor-pointer items-center justify-between px-1 max-w-28 gap-1">
          <span className="text-sm font-bold group-aria-expanded:text-color-2 line-clamp-1">
            <TextAlignmentIcon />
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
          {textAlignment.map((alignment) => (
            <button
              key={alignment.value}
              onClick={() => handleTextAlignmentChange(alignment.value)}
              className="focus:ring-ring w-full font-bold rounded-none px-4 py-1.5 text-left hover:text-color-1 hover:bg-color-7 focus:outline-none focus:ring-2 focus:ring-offset-2 text-color-2"
            >
              <span className="block">{alignment.icon}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface TextAlignmentMenuProps {}
