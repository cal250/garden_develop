'use client'
import React from 'react'
import RadialPolygon from '@/components/molecules/radial-polygon/radial-polygon'
import { DesignContextProvider, useDesignContext } from '@/hooks/use-design-context'
import { HeaderCard } from '@/components/molecules/header-card/header-card'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { capitalize } from 'lodash'

const octagonData = [
  {
    id: 'spring',
    title: 'new beginnings',
    subTitle: 'first steps and missteps',
    image: '/assets/seasons/spring.png',
    tint: 'purple',
  },
  {
    id: 'summer',
    title: 'rising momentum',
    subTitle: 'breakthroughs and burnout',
    image: '/assets/seasons/summer.png',
    tint: 'green',
  },
  {
    id: 'autumn',
    title: 'letting go',
    subTitle: 'serenity and surrender',
    image: '/assets/seasons/autumn.png',
    tint: 'orange',
  },
  {
    id: 'winter',
    title: 'deep reflection',
    subTitle: 'stillness and solitude',
    image: '/assets/seasons/winter.png',
    tint: 'blue',
  },
]

const Page: React.FC<PageProps> = () => {
  const { stroke, strokeWidth } = useDesignContext()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentSeason = searchParams?.get('season')

  return (
    <DesignContextProvider strokeWidth={3}>
      <div className="flex gap-16 justify-center w-full h-full pt-[40px]">
        {octagonData.map((season) => {
          return (
            <div
              key={season.id}
              className="flex items-center flex-col cursor-pointer"
              onClick={() => {
                router.push(pathname + '?season=' + season.id)
              }}
              style={{
                opacity: !currentSeason || season.id === currentSeason ? 1 : 0.5,
              }}
            >
              <div className="z-10 w-[222px] h-[170px] overflow-hidden">
                <div className="z-10 size-[222px] ">
                  <RadialPolygon
                    style={{
                      background: `conic-gradient(from 89.99deg at 50% 50%, #100E1A 0deg, #100E1A 212.4deg, ${currentSeason === season.id ? season.tint : '#825FA3'} 313.2deg, #100E1A 360deg)`,
                    }}
                    sides={8}
                    coreSize={0.5}
                    boundary={{
                      radii: { strokeWidth: 0 },
                      inner: {
                        stroke: currentSeason === season.id ? season.tint : 'rgb(var(--color-2))',
                        strokeWidth,
                      },
                      outer: {
                        stroke: currentSeason === season.id ? season.tint : stroke,
                        strokeWidth,
                      },
                    }}
                  >
                    <img src={season.image} alt={season.id} />
                  </RadialPolygon>
                </div>
              </div>
              <div className="z-40 flex flex-col items-center gap-1">
                <HeaderCard
                  tipAngle={80}
                  text={['inner', capitalize(season.id)]}
                  style={{
                    background: `radial-gradient(107.86% 128.39% at 88.14% 47.94%,  ${currentSeason === season.id ? season.tint : '#825FA3'}  3.4%, #100E1A 99.68%)`,
                  }}
                  stroke={currentSeason === season.id ? 'rgb(var(--color-2))' : undefined}
                  classNames={{
                    base: 'h-[39px] z-10 w-[210px]',
                    title: 'text-[18px]',
                  }}
                />
                <span className="text-color-2 text-[13px] font-bold">{season.title}</span>
                <span className="text-white text-[10px] font-bold">{season.subTitle}</span>
              </div>
            </div>
          )
        })}
      </div>
    </DesignContextProvider>
  )
}

interface PageProps {}

export default Page
