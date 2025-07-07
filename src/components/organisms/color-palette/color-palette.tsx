import React from 'react'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { forwardRef } from '@/components/utils/react/polymorphism'
import { ColorTemplate } from '@/payload-types'
import { cn } from '@nextui-org/theme'
import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import {HouseHexagon} from '@/components/atoms/polygon/house-hexagon';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/dropdown-menu';

export interface ColorPaletteProps {
  /**
   * The colors of the palette
   */
  colors: ColorTemplate['colorGroup']

  /**
   * Whether the palette is monochrome
   */
  monochrome: boolean

  /**
   * The illustration image of the palette
   */
  illustration: string

  /**
   * The title of the palette
   */
  title?: string

  /**
   * The width of the palette
   */
  wrapperClassName?: string
}

export const ColorPalette = forwardRef<ColorPaletteProps>(
  ({ monochrome, illustration, colors, title, wrapperClassName, className }, ref) => {
    const rectagonChamferY = useResponsiveValue({ base: 25, md: 40 })
    const rectagonChamferX = useResponsiveValue({ base: 30, md: 60 })
    const rectagonWidth = useResponsiveValue({ base: 115, md: 228 })
    const rectagonHeight = useResponsiveValue({ base: 77.5, md: 154 })
    const rectagonStrokeWidth = useResponsiveValue({ base: 3, md: 4 })
    const octagonSize = useResponsiveValue({ base: 24, md: 44 })

    return (
      <div className={cn('flex flex-col items-center gap-4', wrapperClassName)}>
        <Rectagon
          style={{
            width: rectagonWidth,
            height: rectagonHeight,
          }}
          className={cn('relative', className)}
          chamferLength={{ x: rectagonChamferX, y: rectagonChamferY }}
          strokeWidth={rectagonStrokeWidth}
          ref={ref}
          stroke="rgb(var(--color-5))"
        >
          <div className="flex h-full flex-col">
            <div className="flex-1 border-b-4 border-b-white h-[38px] lg:h-[76px]">
              <img
                src={illustration ?? ''}
                alt="Color Palette"
                className="h-full w-full object-cover select-none"
              />
            </div>
            <div className="flex flex-1">
              {colors?.slice(0, 6)?.map((color, index) => (
                <div
                  key={index}
                  className="h-full flex-1"
                  style={{ backgroundColor: `${typeof color === 'string' ? color : color.color}` }}
                />
              ))}
            </div>
          </div>
          <RegularOctagon
            style={{
              width: octagonSize,
              height: octagonSize,
            }}
            stroke={monochrome ? "rgb(var(--color-1))" : "rgb(var(--color-5))"}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-color-4"
            strokeWidth={2}
          >
            {monochrome && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2">
                    <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.97734 17.9996L4.27734 12.2996L5.70234 10.8746L9.97734 15.1496L19.1523 5.97461L20.5773 7.39961L9.97734 17.9996Z" fill="rgb(var(--color-1))"/>
              </svg>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[156px]'>
                  <HouseHexagon
              mirrored
              roofWidth={130}
              roofAngle={24}
              className="h-[30px] w-full bg-color-1 flex items-center justify-center"
              stroke="rgb(var(--color-1))"
              strokeWidth={0}
            >
                    <span className='text-color-6 text-sm font-extrabold'>
                      Monochrome
                </span>
            </HouseHexagon>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </RegularOctagon>
        </Rectagon>
        {title && <div className="text-center text-lg font-bold text-white">{title}</div>}
      </div>
    )
  },
)
