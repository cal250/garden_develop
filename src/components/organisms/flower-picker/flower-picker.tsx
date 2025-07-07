import React, { useState, useEffect, useMemo } from 'react'
import ItemPicker, { ItemPickerProps } from '@/components/molecules/item-picker/item-picker'
import ItemPickerSection from '@/components/molecules/item-picker/item-picker-section'
import ItemPickerItem from '@/components/molecules/item-picker/item-picker-item'
import {
  Flower,
  FlowerSection,
  useFlowerSections,
} from '@/components/organisms/flower-picker/useFlowerSections'
import { Trapezoid } from '@/components/atoms/polygon/trapezoid'
// import { Button } from '@/components/atoms/button'
import {
  MobileNextArrowIcon,
  MobilePreviousArrowIcon,
  NextArrowIcon,
  PreviousArrowIcon,
} from '@/components/organisms/flower-picker/arrow-button'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { useResponsiveValue } from '@/hooks/use-responsive-value'

export interface FlowerPickerProps
  extends Omit<ItemPickerProps<FlowerSection>, 'items' | 'children'> {
  /**
   * The flowers to display in the picker.
   */
  flowers: Array<Flower>

  /**
   * The selected flower in the picker.
   */
  selected?: Array<Flower>

  /**
   * The height of each item in the picker in pixels
   * @default 50
   */
  itemHeight?: number

  /**
   * The gap between the items in the picker in pixels
   */
  gap?: number
}

export const FlowerPicker: React.FC<FlowerPickerProps> = ({
  itemHeight = 50,
  selected,
  flowers,
  gap = 18,
  ...otherProps
}) => {
  const [page, setPage] = useState(0)
  const { sections, pages } = useFlowerSections(flowers)

  // Convert selected flowers to a Set of keys for ItemPicker
  const selectedKeys = useMemo(() => {
    if (!selected) return new Set<string | number>()
    return new Set<string | number>(selected.map((flower) => flower.id))
  }, [selected])

  const isMobile = useResponsiveValue({
    base: true,
    md: false,
  })

  return (
    <div className="relative">
      <button
        disabled={page === 0}
        onClick={() => setPage((page) => page - 1)}
        className="absolute disabled:opacity-40 left-[-30px] sm:left-[-40px] md:left-0 top-1/2 z-10 h-[57.46px] md:h-8 w-[18.5px] md:w-16 -translate-y-1/2 transform p-0"
      >
        {isMobile ? <MobilePreviousArrowIcon /> : <PreviousArrowIcon />}
      </button>
      <ItemPicker
        items={sections.filter((section) => section.page === page)}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        {...otherProps}
        className="grid w-[300px] sm:w-[550px] md:w-[898px] grid-flow-col grid-rows-2 justify-items-center"
        style={{
          gap: isMobile ? '6px' : `${gap}px`,
        }}
        itemClasses={{
          base: [
            'hover:bg-color-12/90 bg-color-12 text-sm sm:text-base md:text-lg font-bold text-color-1 transition-all -outline-offset-1',
            'data-[selected=true]:bg-color-1 data-[selected=true]:text-color-12 justify-center',
          ],
        }}
      >
        {(section: any) => (
          <ItemPickerSection
            key={`section-${section.id}`}
            items={section.items}
            polygon={isMobile ? Rectagon : Trapezoid}
            chamferLength={isMobile ? { x: 0, y: 0 } : undefined}
            overflow={false}
            strokeWidth={0}
            groupStyles={{
              gridTemplateColumns: isMobile
                ? 'repeat(3, 1fr)'
                : 'repeat(' + (Number(section.id) % 2 === 0 ? 3 : 4) + ', 1fr)',
              gap: isMobile ? '6px' : `${gap}px`,
              gridAutoFlow: 'row',
            }}
            style={{
              width: isMobile
                ? '100%'
                : Number(section.id) % 2 === 0
                  ? `calc(100% - ${(isMobile ? 43 : itemHeight) * 2 + gap * 2}px)`
                  : '100%',
            }}
            classNames={{
              group: ['w-full grid justify-center'],
            }}
            hideSelectedIcon
          >
            {(item: any) => (
              <ItemPickerItem
                polygon={isMobile ? Rectagon : undefined}
                chamferLength={isMobile ? { x: 15, y: 15 } : undefined}
                strokeWidth={isMobile ? 0 : undefined}
                key={item.id}
                style={{ height: isMobile ? 43 : itemHeight }}
                className="text-[13.62px] font-black leading-[100%] text-center"
              >
                {item.name}
              </ItemPickerItem>
            )}
          </ItemPickerSection>
        )}
      </ItemPicker>
      <button
        onClick={() => setPage((page) => page + 1)}
        disabled={page === pages - 1}
        className="absolute disabled:opacity-40 right-[-30px] sm:right-[-40px] md:right-0 top-1/2 z-10 h-[57.46px] md:h-8 w-[18.5px] md:w-16 -translate-y-1/2 transform p-0"
      >
        {isMobile ? <MobileNextArrowIcon /> : <NextArrowIcon />}
      </button>
    </div>
  )
}
