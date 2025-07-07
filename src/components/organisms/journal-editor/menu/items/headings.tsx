import React from 'react'
import { useCurrentEditor } from '@tiptap/react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { DropdownIcon } from '@/components/organisms/journal-editor/icons'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'

export const headingOptions = [
  { name: 'Body', value: 'body', className: 'text-base font-normal' },
  { name: 'Heading 1', value: 'h1', level: 1, className: 'text-4xl font-bold' },
  { name: 'Heading 2', value: 'h2', level: 2, className: 'text-3xl font-bold' },
  { name: 'Heading 3', value: 'h3', level: 3, className: 'text-2xl font-bold' },
  { name: 'Heading 4', value: 'h4', level: 4, className: 'text-xl font-bold' },
  { name: 'Heading 5', value: 'h5', level: 5, className: 'text-lg font-bold' },
  { name: 'Subheading 1', value: 'sub1', level: 1, className: 'text-lg font-medium' },
  { name: 'Subheading 2', value: 'sub2', level: 2, className: 'text-base font-medium' },
  { name: 'Subheading 3', value: 'sub3', level: 3, className: 'text-sm font-medium' },
]

export const HeadingsMenu: React.FC<HeadingsMenuProps> = (props) => {
  const [open, setOpen] = React.useState(false)
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const handleHeadingSelect = (heading: any) => {
    if (heading.value.startsWith('h')) {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: heading.level })
        .updateAttributes('heading', { class: heading.className })
        .run()
    } else if (heading.value.startsWith('sub')) {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: 6 })
        .updateAttributes('heading', { class: heading.className })
        .run()
    }
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
        <button className="group flex h-8 cursor-pointer items-center justify-between gap-1 px-1">
          <span className="font-bold text-[18px] group-aria-expanded:text-color-2">H</span>
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
          {headingOptions.map((heading) => (
            <button
              key={heading.value}
              onClick={() => handleHeadingSelect(heading)}
              className="focus:ring-ring w-full rounded-none px-4 py-1.5 text-left hover:text-color-1 hover:bg-color-7 focus:outline-none focus:ring-2 focus:ring-offset-2 text-color-2"
            >
              <span className={heading.className}>{heading.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface HeadingsMenuProps {}
