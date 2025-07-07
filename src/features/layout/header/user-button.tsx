import React from 'react'
import Link from 'next/link'
import { LeftBracketIcon, RightBracketIcon } from '@/components/atoms/icons'
import { Avatar } from '@/components/atoms/avatar'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { useAuth } from '@/features/providers/auth'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/dropdown-menu'
import useWindowWidth from '@/hooks/use-window-width'
import { twMerge } from 'tailwind-merge'

const UserButton = () => {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const width = useWindowWidth()

  async function handleLogout() {
    try {
      await logout()

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <div className="w-[150px]"></div>
  }

  if (!user) {
    return (
      <Link href={'/login'} className=" items-center gap-0.5 flex">
        <p className="text-center text-[20px] font-bold text-color-1">log</p>
        <LeftBracketIcon className="h-6 w-2" fill="rgb(var(--color-1))" strokeWidth={2} />
        <p className="text-center text-[20px] font-bold text-color-13">in</p>
        <RightBracketIcon className="h-6 w-2" fill="rgb(var(--color-1))" strokeWidth={2} />
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-[9px] items-center">
          <Avatar
            src={user?.avatar?.url ?? '/assets/home/avatar.png'}
            polygon={RegularPolygon}
            sides={8}
            stroke="rgb(var(--color-1))"
            strokeWidth={2}
            className="h-[40px] md:h-[40px] w-[40px] md:w-[40px]"
          />

          <p
            className={twMerge(
              'w-[120px] text-color-1 font-bold text-lg leading-[100%] truncate',
              width > 1244 ? 'block' : 'hidden',
            )}
          >
            {user.username}
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 px-4 py-2 bg-color-2">
        <DropdownMenuItem>
          <button className="font-bold text-lg leading-[100%]" onClick={handleLogout}>
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
