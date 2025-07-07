'use client'

import { ComponentPropsWithRef } from 'react'
import YellowFlowerIcon from '@/features/icons/yellow-flower-icon'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'
import { cn } from '@nextui-org/theme'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Define a type for menu items
type SettingsMenuItem = {
  label: string
  href: string
}

interface SettingsMenuProps extends ComponentPropsWithRef<'div'> {}

export const SettingsMenu = ({ className, ...props }: SettingsMenuProps) => {
  const { specialEco } = useParams() as { specialEco: string | undefined }

  const MENU_ITEMS: SettingsMenuItem[] = [
    { label: 'configure your octagons', href: '/onboarding-action' },
    { label: 'change your colors', href: `/${specialEco}/settings/colors` },
    { label: 'set your inner boundaries', href: `/${specialEco}/settings/inner-boundaries` },
    { label: 'set your outer boundaries', href: `/${specialEco}/settings/outer-boundaries` },
    {label: 'create your north stars',href: `/${specialEco}/settings/north-stars`},
    {label: 'create your icons',href: `/${specialEco}/settings/icons`},
    {label: 'privacy settings',href: `/${specialEco}/settings/privacy`},
  ]

  return (
    <div className={cn('relative', className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus:border-0 focus-within:outline-none">
          <button
            aria-haspopup="true"
            className="cursor-pointer hover:opacity-80 transition-opacity text-color-1"
          >
            <YellowFlowerIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" alignOffset={-36} className="border-0">
          <div className="w-[300px]">
            <HouseHexagon
              mirrored
              roofWidth={279}
              roofAngle={32}
              className="h-[45px] w-full bg-color-1 flex items-center justify-center"
              stroke="rgb(var(--color-1))"
              strokeWidth={0}
            >
              <DropdownMenuLabel className="font-extrabold text-black text-base">
                advanced settings
              </DropdownMenuLabel>
            </HouseHexagon>
            <HouseHexagon
              strokeWidth={0}
              inverted
              roofWidth={260}
              roofAngle={30}
              className="flex items-start flex-col bg-[#00000082] backdrop-blur-sm mx-2"
            >
              {MENU_ITEMS.map((item, index) => (
                <DropdownMenuItem
                  asChild
                  key={index}
                  className="py-2.5 px-5 w-full hover:bg-color-4 font-semibold transition-colors duration-150 ease-in-out text-color-1 text-base"
                >
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </HouseHexagon>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
