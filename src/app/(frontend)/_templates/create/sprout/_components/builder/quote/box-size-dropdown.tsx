import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { BoxSizeIcon } from '../../icons'
import { BoxSizeChooser, BoxSizeChooserProps } from '../common/box-size-chooser'

export const BoxSizeDropdown: React.FC<BoxSizeDropdownProps> = ({ layout, onLayoutChange }) => {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <button className="flex flex-col items-center justify-between gap-2">
          <BoxSizeIcon className="size-[36px] text-black" />
          <span className="font-bold text-black">box size</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <BoxSizeChooser layout={layout} onLayoutChange={onLayoutChange} />
      </PopoverContent>
    </Popover>
  )
}

interface BoxSizeDropdownProps extends BoxSizeChooserProps {}
