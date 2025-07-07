'use client'

import { CarouselItem, CarouselNext } from '@/components/atoms/carousel'
import Carousel from '@/components/atoms/carousel/carousel'
import CarouselContent from '@/components/atoms/carousel/carousel-content'
import CarouselPrevious from '@/components/atoms/carousel/carousel-previous'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { Cocoon, ColorTemplate } from '@/payload-types'
import { ColorPalette } from '@/components/organisms/color-palette/color-palette'
import { cn } from '@nextui-org/theme'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import queryClient from '@/components/utils/react-query-client'
import { useTheme } from 'next-themes'
import CommonBodyCard from '@/components/common-body-card'
import { useAuth } from '@/features/providers/auth'

export interface ColorTemplatePickerProps {
  colorTemplate: ColorTemplate[]
  cocoon: Cocoon
}

export default function ColorTemplatePicker({ colorTemplate, cocoon }: ColorTemplatePickerProps) {
  const { setTheme } = useTheme()
  const { user } = useAuth()

  const headerCardHeight = useResponsiveValue({
    base: 51.42,
    sm: 70,
    md: 88.5,
  })

  const carouselControlGap = useResponsiveValue({
    base: 4,
    sm: 16,
    md: 32,
  })

  const cocoonColorTemplate = useMutation({
    mutationFn: async (templateId: string) => {
      if (!cocoon) {
        throw new Error('Cocoon not found')
      }
      setTheme(templateId)

      await axios.patch(`/api/cocoon/${cocoon.id}`, {
        colorTemplate: templateId,
      })
    },
    onError: () => {
      setTheme(
        typeof cocoon?.colorTemplate === 'string'
          ? cocoon.colorTemplate
          : (cocoon?.colorTemplate?.id ?? ''),
      )
    },
  })

  return (
    <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
      <CommonBodyCard
        title={user?.username ?? ''}
        style={{
          zIndex: 20,
        }}
        headerCardProps={{
          classNames: {
            outerTitle:
              'text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black text-color-1',
          },
        }}
        className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 h-full flex-grow w-full justify-start"
      >
        <div
          style={{
            position: 'relative',
            top: `-${headerCardHeight / 2}px`,
          }}
          className={`mt-[55px] sm:mt-[70px] md:mt-[80px] w-full flex flex-col items-center relative top-[-${headerCardHeight / 2}px]`}
        >
          <div className="pt-28 md:pt-12">
            <Carousel className="max-w-[300px] sm:max-w-[757px]">
              <CarouselContent
                className={cn(
                  colorTemplate.length === 1 && 'justify-center',
                  'justify-start grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-x-5 md:gap-y-6 md:flex',
                )}
              >
                {colorTemplate.map((template, i) => (
                  <CarouselItem
                    className="flex-initial min-w-fit px-0 hover:cursor-pointer"
                    onClick={() => {
                      cocoonColorTemplate.mutate(template.id)
                    }}
                    key={i}
                  >
                    <ColorPalette
                      className="block"
                      monochrome={template.default_monochrome === 'Yes'}
                      colors={template.colorGroup}
                      illustration={
                        typeof template.image === 'string'
                          ? template.image
                          : '/assets/onboarding/onboarding-bg.webp'
                      }
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                hideIcon
                polygon={RegularPolygon}
                sides={3}
                strokeWidth={0}
                gap={carouselControlGap}
                className="bg-transparent px-0 min-w-fit rotate-180"
              >
                <RegularPolygon
                  sides={3}
                  className="bg-color-2 h-[28px] w-[18px] md:h-[50px] md:w-[32px]"
                  strokeWidth={0}
                />
              </CarouselPrevious>
              <CarouselNext
                hideIcon
                polygon={RegularPolygon}
                sides={3}
                gap={carouselControlGap}
                strokeWidth={0}
                className="bg-transparent px-0 min-w-fit"
              >
                <RegularPolygon
                  sides={3}
                  className="bg-color-2 h-[28px] w-[18px] md:h-[50px] md:w-[32px]"
                  strokeWidth={0}
                />
              </CarouselNext>
            </Carousel>
          </div>
        </div>
      </CommonBodyCard>
    </DesignContextProvider>
  )
}
