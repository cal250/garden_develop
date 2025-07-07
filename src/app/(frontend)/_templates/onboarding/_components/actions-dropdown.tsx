'use client'

import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/dropdown-menu'
import { YellowFlowerIcon } from '@/app/(frontend)/_templates/_icons/yellow-flower-icon'

export const ActionsDropdown: React.FC<ActionsDropdownProps> = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button>
          <YellowFlowerIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem key="colors">change your colors</DropdownMenuItem>
        <DropdownMenuItem key="inner-boundaries">set your inner boundaries</DropdownMenuItem>
        <DropdownMenuItem key="outer-boundaries">set your outer boundaries</DropdownMenuItem>
        <DropdownMenuItem key="north-stars">create your north stars</DropdownMenuItem>
        <DropdownMenuItem key="icons">create your icons</DropdownMenuItem>
        <DropdownMenuItem key="privacy">privacy settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ActionsDropdownProps {}
