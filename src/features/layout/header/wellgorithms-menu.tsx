'use client'

import React, { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import {
  BloomsIcon,
  CreateIcon,
  SeedsIcon,
  SproutsIcon,
} from '@/app/(frontend)/_templates/_icons/wellgorithms'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { Menu, MenuItem } from '@/components/atoms/menu'
import { usePathname } from 'next/navigation'

export type Wellgorithm = 'seeds' | 'sprouts' | 'blooms' | 'create'

const menu = [
  { key: 'seeds', icon: SeedsIcon, label: 'seeds' },
  { key: 'sprouts', icon: SproutsIcon, label: 'sprouts' },
  { key: 'blooms', icon: BloomsIcon, label: 'blooms' },
  { key: 'create', icon: CreateIcon, label: 'create' },
]

export const WellgorithmsMenu: React.FC<WellgorithmsMenuProps> = (props) => {
  const pathname = usePathname()
  //   const selectedItem = menu.find((item) => item.key === props.wellgorithm)
  const selectedItem = { key: 'create', icon: CreateIcon, label: 'create' }
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    console.log(pathname)
  }, [pathname])

  return (
    <Popover
      showArrow
      isOpen={open}
      onOpenChange={setOpen}
      classNames={{
        base: '',
        content: 'bg-black rounded-none p-0',
      }}
    >
      <PopoverTrigger>
        {selectedItem ? (
          <button className="text-color-2 flex gap-2 items-center">
            <div className="flex flex-col justify-center gap-0">
              <span className="text-center text-base sm:text-[20px] font-black">wellgorithms</span>
              <span className="text-[12px] font-bold leading-[14px]">{selectedItem.label}</span>
            </div>
            <selectedItem.icon className="size-[20px]" />
          </button>
        ) : (
          <button className="text-center text-base sm:text-[20px] font-black">wellgorithms</button>
        )}
      </PopoverTrigger>
      
      <PopoverContent
        polygon={Rectagon}
        chamferLength={{ x: 20, y: 20 }}
        stroke="rgba(255,255,255,20%)"
      >
        <Menu
          className="flex flex-col px-0 py-6"
          selectedKeys={selectedItem ? [selectedItem.key] : []}
        >
          {menu.map((item) => (
            <MenuItem
              key={item.key}
              onPress={() => {
                setOpen(false)
              }}
              className="px-8 py-2 rounded-none data-[hover=true]:bg-color-2 text-[#FFFFFF88] data-[hover=true]:text-black
              data-[selected=true]:bg-color-2 data-[selected=true]:text-black"
            >
              <div className="flex gap-2 items-center">
                <item.icon className="h-[28px] w-[28px]" />
                <span className="font-bold text-[20px]">{item.label}</span>
              </div>
            </MenuItem>
          ))}
        </Menu>
      </PopoverContent>
    </Popover>
  )
}

interface WellgorithmsMenuProps {}
