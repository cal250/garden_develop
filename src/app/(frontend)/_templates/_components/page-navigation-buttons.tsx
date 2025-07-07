import React from 'react'
import { usePageStepsContext } from '@/app/(frontend)/_templates/_context/page-steps'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/atoms/icons'

export const PageNavigationButtons: React.FC<PageNavigationButtonsProps> = (props) => {
  const { steps, pageIndex } = usePageStepsContext()
  const router = useRouter()

  const handleNext = () => {
    if (pageIndex < steps.length - 1) {
      router.push(steps[pageIndex + 1].path)
    }
  }

  const handlePrevious = () => {
    if (pageIndex > 0) {
      router.push(steps[pageIndex - 1].path)
    }
  }

  if (!steps.length || pageIndex < 0) return null

  return (
    <div
      className="absolute m-auto w-full flex justify-between z-40"
      style={{ maxWidth: '820px', transform: `translateY(calc(-50% - 2px))` }}
    >
      <RegularPolygon
        as="button"
        sides={8}
        className="flex items-center gap-7 size-[85px] bg-[#413C59] group"
        stroke={'#825FA3'}
        onClick={handlePrevious}
        style={{
          transform: `translateX(calc(-50% - 8px))`,
          visibility: pageIndex === 0 ? 'hidden' : undefined,
        }}
      >
        <ArrowLeftIcon className="size-[28px] text-[#825FA3]" />
      </RegularPolygon>
      <RegularPolygon
        as="button"
        sides={8}
        className="flex items-center gap-7 size-[85px] bg-[#845BA4] group translate-x-1/2"
        stroke={'rgb(var(--color-2))'}
        onClick={handleNext}
        style={{
          transform: `translateX(calc(50% + 8px))`,
          visibility: pageIndex === steps.length - 1 ? 'hidden' : undefined,
        }}
      >
        <ArrowRightIcon className="size-[28px] text-color-2" />
      </RegularPolygon>
    </div>
  )
}

interface PageNavigationButtonsProps {}
