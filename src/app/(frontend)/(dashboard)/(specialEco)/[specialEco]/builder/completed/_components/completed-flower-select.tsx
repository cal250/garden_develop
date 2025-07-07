import React, { ComponentPropsWithRef, Dispatch, SetStateAction, useRef } from 'react'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/dropdown-menu'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { cn } from '@nextui-org/theme'
import ArrowUpDownFill from '@/features/icons/arrow-up-down-fill'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'
import { twMerge } from 'tailwind-merge'

interface CompletedFlowerSelectorProps extends ComponentPropsWithRef<'div'> {
  selectedFlower: string
  onFlowerChange: Dispatch<SetStateAction<string>>
}

const MENU_ITEMS = ['healing', 'joy', 'clarity', 'hope', 'love', 'freedom']

export const CompletedFlowerSelector = ({
  className,
  selectedFlower,
  onFlowerChange,
  ...props
}: CompletedFlowerSelectorProps) => {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredItems = MENU_ITEMS.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setOpen(false)
      }
    }, 100)
  }

  // return (
  //   <div className={cn('relative', className)} {...props}>
  //     <DropdownMenu open={open} onOpenChange={setOpen}>
  //       {selectedFlower ? (
  //         <DropdownMenuTrigger asChild className="focus:border-0 focus-within:outline-none z-50">
  //           <Rectagon
  //             as="button"
  //             onClick={() => setOpen(true)}
  //             chamferLength={{ x: 20, y: 15 }}
  //             stroke="rgb(var(--color-4))"
  //             strokeWidth={2}
  //             className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 h-12 w-[164px] bg-color-2 px-4"
  //           >
  //             <p className="flex-grow text-color-13 text-[14px] md:text-lg leading-[100%] font-black">
  //               | {selectedFlower}
  //             </p>

  //             <div
  //               className="text-color-1 w-4 h-[13px]"
  //               style={{
  //                 transform: `rotateZ(${open ? '180' : '0'}deg)`,
  //                 transition: 'transform ease 200ms',
  //               }}
  //             >
  //               <ArrowUpDownFill />
  //             </div>
  //           </Rectagon>
  //         </DropdownMenuTrigger>
  //       ) : (
  //         // <DropdownMenuTrigger asChild className="focus:border-0 focus-within:outline-none z-40">
  //         <Rectagon
  //           className="flex items-center gap-2 h-12 w-[164px] bg-color-2 px-4"
  //           chamferLength={{ x: 20, y: 15 }}
  //           stroke="rgb(var(--color-4))"
  //           strokeWidth={2}
  //         >
  //           <input
  //             type="text"
  //             placeholder="| search"
  //             value={searchQuery}
  //             onFocus={()=>}
  //             onChange={(e) => {
  //               setSearchQuery(e.target.value)
  //               // setOpen(true)
  //             }}
  //             className="w-[100px] bg-transparent text-color-13 text-[14px] md:text-lg leading-[100%] font-black placeholder:text-start placeholder:text-color-13 focus:bg-transparent focus:outline-none hover:bg-transparent"
  //           />

  //           <div
  //             className="text-color-1 w-4 h-[13px]"
  //             style={{
  //               transform: `rotateZ(${open ? '180' : '0'}deg)`,
  //               transition: 'transform ease 200ms',
  //             }}
  //           >
  //             <ArrowUpDownFill />
  //           </div>
  //         </Rectagon>
  //         // </DropdownMenuTrigger>
  //       )}

  //       <DropdownMenuContent align="start" alignOffset={-10} className="border-0 -mt-5 z-10">
  //         <div className="w-[164px]">
  //           <HouseHexagon
  //             strokeWidth={0}
  //             inverted
  //             roofWidth={140}
  //             roofAngle={40}
  //             className="w-full flex items-start flex-col bg-color-13 backdrop-blur-sm mx-2 pt-4"
  //           >
  //             {filteredItems.map((item, index) => (
  //               <DropdownMenuItem
  //                 asChild
  //                 key={index}
  //                 onSelect={() => {
  //                   onFlowerChange(item)
  //                   setOpen(false) // close dropdown
  //                 }}
  //                 className={twMerge(
  //                   'py-2.5 px-5 w-full cursor-pointer hover:bg-color-4 hover:text-color-13 transition-colors duration-150 ease-in-out',
  //                   item === selectedFlower
  //                     ? 'text-color-13 bg-color-4'
  //                     : 'text-color-4 bg-color-transparent',
  //                 )}
  //               >
  //                 <p className="text-[14px] md:text-lg leading-[100%] font-black">{item}</p>
  //               </DropdownMenuItem>
  //             ))}
  //           </HouseHexagon>
  //         </div>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   </div>
  // )

  return (
    <div ref={containerRef} className={cn('relative', className)} {...props}>
      {selectedFlower ? (
        <Rectagon
          as="button"
          onClick={() => setOpen((prev) => !prev)}
          chamferLength={{ x: 20, y: 15 }}
          stroke="rgb(var(--color-4))"
          strokeWidth={2}
          className="cursor-pointer flex items-center gap-2 h-12 w-[164px] bg-color-2 px-4 z-40"
        >
          <p className="flex-grow text-color-13 text-[14px] md:text-lg leading-[100%] font-black">
            | {selectedFlower}
          </p>

          <div
            className="text-color-1 w-4 h-[13px]"
            style={{
              transform: `rotateZ(${open ? '180' : '0'}deg)`,
              transition: 'transform ease 200ms',
            }}
          >
            <ArrowUpDownFill />
          </div>
        </Rectagon>
      ) : (
        <Rectagon
          className="flex items-center gap-2 h-12 w-[164px] bg-color-2 px-4 z-40"
          chamferLength={{ x: 20, y: 15 }}
          stroke="rgb(var(--color-4))"
          strokeWidth={2}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="| search"
            value={searchQuery}
            onFocus={() => setOpen(true)}
            onBlur={handleBlur}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              // setOpen(true)
            }}
            className="w-[100px] bg-transparent text-color-13 text-[14px] md:text-lg leading-[100%] font-black placeholder:text-start placeholder:text-color-13 focus:bg-transparent focus:outline-none hover:bg-transparent"
          />

          <div
            className="text-color-1 w-4 h-[13px]"
            style={{
              transform: `rotateZ(${open ? '180' : '0'}deg)`,
              transition: 'transform ease 200ms',
            }}
          >
            <ArrowUpDownFill />
          </div>
        </Rectagon>
      )}

      {open && (
        <div className="w-[164px] absolute top-7  -translate-x-[8px] z-10">
          <HouseHexagon
            stroke="rgb(var(--color-4))"
            strokeWidth={3}
            inverted
            roofWidth={140}
            roofAngle={40}
            className="w-full flex items-start flex-col bg-color-13 backdrop-blur-sm mx-2 pt-4"
          >
            {filteredItems.map((item, index) => (
              <button
                // asChild
                key={index}
                onClick={() => {
                  onFlowerChange(item)
                  setOpen(false)
                }}
                className={twMerge(
                  'py-2.5 px-5 w-full cursor-pointer hover:bg-color-4 hover:text-color-13 transition-colors duration-150 ease-in-out',
                  item === selectedFlower
                    ? 'text-color-13 bg-color-4'
                    : 'text-color-4 bg-color-transparent',
                )}
              >
                <p className="text-left text-[14px] md:text-lg leading-[100%] font-black">{item}</p>
              </button>
            ))}
          </HouseHexagon>
        </div>
      )}
    </div>
  )
}
