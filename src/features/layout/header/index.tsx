'use client'

import { Logo } from '@/components/atoms/logo/logo'
import { Navbar, NavbarContent } from '@/components/atoms/navbar'
import { Trapezoid } from '@/components/atoms/polygon/trapezoid'
// import BullshitIcon from '@/features/icons/bullshit-icon'
// import GardensIcon from '@/features/icons/gardens-icon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import DropletsIcon from '@/features/icons/droplets-icon'
// import FlowerIcon from '@/features/icons/flower-icon'
// import LeaveIcon from '@/features/icons/leave-icon'
// import MushroomIcon from '@/features/icons/mushroom-icon'
import useWindowWidth from '@/hooks/use-window-width'
// import { TopHeaderCard } from './top-header-card'
import { DoubleSearchIcon } from '@/features/icons/double-search-icon'
import { useEffect } from 'react'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import UserButton from './user-button'
import Link from 'next/link'
import { Specialeco } from '@/payload-types'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
// import SunshineIcon from '@/features/icons/sunshine-icon'
import PlantIcon from '@/features/icons/plant-icon'
import BloomIcon from '@/features/icons/bloom-icon'
import WeedIcon from '@/features/icons/weed-icon'
// import CoffeeCupIcon from '@/features/icons/coffee-cup-icon'
// import CoffeeWithLeaveIcon from '@/features/icons/coffee-with-leave-icon'
import DetoxBirdIcon from '@/features/icons/detox-bird-icon'
import { WellgorithmsMenu } from './wellgorithms-menu'
// import { SunIcon } from '@/components/atoms/icons'

export interface DashboardHeaderProps {
  specialEco: Specialeco[]
}

export default function DashboardHeader({ specialEco }: DashboardHeaderProps) {
  const { specialEco: currentSpecialEco } = useParams() as { specialEco: string | undefined }
  const width = useWindowWidth()

  // const { reset } = useLandscapeStore()

  const navbarHeight = useResponsiveValue({
    base: '80px',
    md: '60px',
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--navbar-height', navbarHeight)

    return () => {
      document.documentElement.style.removeProperty('--navbar-height')
    }
  }, [navbarHeight])

  // eslint-disable-next-line react/jsx-key
  const ecoIcon = [<DropletsIcon />, <WeedIcon />, <PlantIcon />, <BloomIcon />]

  return (
    <header className="fixed top-0 z-50 flex h-[var(--navbar-height)] w-full items-center justify-center bg-transparent">
      <Navbar
        className="hidden md:flex h-full w-full max-w-[1440px] items-center justify-center bg-color-3"
        isBlurred={false}
        classNames={{ wrapper: 'max-w-[unset] bg-transparent items-start' }}
      >
        <div className="relative w-full h-[60px] flex items-center justify-between">
          <nav className="h-full flex-1 flex items-center justify-start gap-8 md:gap-[55px]">
            <Link href={'/'}>
              <Logo className="h-[60px] w-[130px] overflow-hidden text-color-2" />
            </Link>

            <Link href={'/'} className="group text-color-2 hover:text-color-1 flex gap-2">
              {/* <div className="w-8 h-8">
                    <DropletsIcon />
                  </div> */}
              <span className="text-center text-base sm:text-[20px] font-black">wellgorithms</span>
              {/* <div className="w-8 h-8">
                <SunshineIcon />
              </div> */}
            </Link>

            {/* <WellgorithmsMenu /> */}
          </nav>

          <div className="hidden w-[460px] lg:w-[560px] md:relative md:flex md:items-center md:gap-14">
            <NavbarContent
              justify="center"
              polygon={Trapezoid}
              inverted
              slopeAngle={48}
              className="hidden h-[84px] w-[460px] lg:w-[560px] px-20 text-color-1 md:flex md:items-center md:justify-center md:gap-14"
              style={{
                background:
                  'linear-gradient(337.13deg, rgb(var(--color-8)) 38.26%, rgb(var(--color-9)) 126.7%)',
              }}
              stroke="rgb(var(--color-4))"
              borderWidths={[0, 4, 4, 4]}
            >
              <div className="flex w-full items-start justify-center gap-14 mt-1">
                {specialEco.length > 0 &&
                  specialEco.map((ecosystem, index) => (
                    <Link
                      key={ecosystem.id}
                      href={`/${encodeURIComponent(ecosystem.id)}`}
                      // onClick={() => reset()}
                      className={twMerge(
                        `w-[28px] hover:text-color-1 flex flex-col items-center gap-0.5`,
                        currentSpecialEco === ecosystem.id ? 'text-color-1' : 'text-color-2',
                      )}
                    >
                      {ecoIcon[index]}

                      {currentSpecialEco === ecosystem.id && (
                        <span className="text-[9px] font-semibold text-color-1">
                          {ecosystem.name}
                        </span>
                      )}
                    </Link>
                  ))}
              </div>
            </NavbarContent>

            <div className="absolute bottom-[-65px] left-1/2 mb-[50px] flex h-[34px] w-[250px] -translate-x-1/2 transform items-center">
              <div className="gap-0 flex items-center justify-around w-full">
                {/* <div className="mb-[-30px] flex items-center text-[#FFFFFF70] hover:text-color-1">
                    <SunshineIcon />
                  </div> */}
                {/* <DesignContextProvider stroke="rgb(var(--color-4))">
                  <TopHeaderCard
                    title={specialEco.find((ecosystem) => ecosystem.id === currentSpecialEco)?.name}
                    tipAngle={75}
                    className="h-[34px] w-[248px] before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgb(var(--color-2))_3%,rgb(var(--color-8))_100%)] before:z-0 after:absolute after:inset-0 after:bg-[#1E2C27] after:opacity-50 after:z-0 "
                  />
                </DesignContextProvider> */}

                <DesignContextProvider stroke="rgb(var(--color-4))" strokeWidth={3}>
                  <RegularPolygon
                    sides={8}
                    className="w-8 h-8 bg-color-3 flex items-center justify-center"
                  >
                    <div className="w-4 text-color-2/80">{/* <CoffeeCupIcon /> */}</div>
                  </RegularPolygon>

                  <RegularPolygon sides={8} className="w-11 h-11 bg-color-3">
                    <div className="w-4 text-color-2/80">{/* <CoffeeWithLeaveIcon /> */}</div>
                  </RegularPolygon>

                  <RegularPolygon sides={8} className="w-8 h-8 bg-color-3">
                    <div className="w-4 text-color-2/80">{/* <BullshitIcon /> */}</div>
                  </RegularPolygon>
                </DesignContextProvider>
              </div>
            </div>
          </div>

          <nav className="h-full flex-1 flex items-center justify-between gap-8">
            <div
              className={twMerge('flex items-center gap-[50px]', width > 1200 ? 'px-10' : 'px-0')}
            >
              <Link href={'/'} className="text-color-2 hover:text-color-1">
                <DetoxBirdIcon />
              </Link>

              <Link href={'/'} className="text-color-2 hover:text-color-1">
                <DoubleSearchIcon className="w-8 h-8" />
              </Link>
            </div>

            <div className="min-w-[120px]">
              <UserButton />
            </div>
          </nav>
        </div>
      </Navbar>

      <Navbar
        className="relative flex md:hidden w-full h-full bg-transparent"
        isBlurred={false}
        classNames={{ wrapper: 'max-w-[unset] bg-transparent px-0' }}
      >
        <div className="w-full h-[80px] relative flex flex-col items-center gap-14">
          <NavbarContent
            justify="center"
            polygon={Rectagon}
            chamferLength={{
              topLeft: { x: 0, angle: 0 },
              topRight: { x: 0, angle: 0 },
              bottomLeft: width < 640 ? { x: 50, angle: 35 } : { x: 140, angle: 45 },
              bottomRight: width < 640 ? { x: 50, angle: 35 } : { x: 140, angle: 45 },
            }}
            className="flex w-full px-5 pb-5 text-white md:hidden items-end justify-center bg-gradient-to-b from-color-8 via-color-8/70 via-70% to-color-9"
            stroke={'rgb(var(--color-4))'}
            borderWidths={[0, 0, 4, 4, 4, 0]}
            strokeWidth={4}
          >
            <div className="flex w-full items-center justify-center gap-20">
              {/* <Link
                href={'/'}
                className="w-[28px] shrink-0 sm:w-[36px] text-[#FFFFFF70] hover:text-color-1"
              >
                <FlowerIcon />
              </Link>
              <Link
                href={'/'}
                className="w-[28px] shrink-0 sm:w-[36px] text-[#FFFFFF70] hover:text-color-1"
              >
                <LeaveIcon />
              </Link>
              <Link
                href={'/'}
                className="w-[28px] shrink-0 sm:w-[36px] text-[#FFFFFF70] hover:text-color-1"
              >
                <MushroomIcon />
              </Link>
              <Link
                href={'/'}
                className="w-[28px] shrink-0 sm:w-[36px] text-[#FFFFFF70] hover:text-color-1"
              >
                <BullshitIcon />
              </Link> */}

              {specialEco.length > 0 &&
                specialEco.map((ecosystem, index) => (
                  <Link
                    key={ecosystem.id}
                    href={`/${encodeURIComponent(ecosystem.id)}`}
                    // onClick={() => reset()}
                    className={twMerge(
                      `w-[28px] hover:text-color-1 flex flex-col items-center gap-0.5`,
                      currentSpecialEco === ecosystem.id ? 'text-color-1' : 'text-color-2/80',
                    )}
                  >
                    {ecoIcon[index]}
                    {currentSpecialEco === ecosystem.id && (
                      <span className="text-[9px] font-semibold text-color-1">
                        {ecosystem.name}
                      </span>
                    )}
                  </Link>
                ))}
            </div>
          </NavbarContent>
          <div className="absolute bottom-[-65px] left-1/2 mb-[50px] flex h-[34px] w-[250px] -translate-x-1/2 transform items-center">
            <div className="gap-0 flex items-center justify-around w-full">
              <DesignContextProvider stroke="rgb(var(--color-4))" strokeWidth={3}>
                <RegularPolygon
                  sides={8}
                  className="w-8 h-8 bg-color-3 flex items-center justify-center"
                >
                  <div className="w-4 text-color-2/80">{/* <CoffeeCupIcon /> */}</div>
                </RegularPolygon>

                <RegularPolygon sides={8} className="w-11 h-11 bg-color-3">
                  <div className="w-4 text-color-2/80">{/* <CoffeeWithLeaveIcon /> */}</div>
                </RegularPolygon>

                <RegularPolygon sides={8} className="w-8 h-8 bg-color-3">
                  <div className="w-4 text-color-2/80">{/* <BullshitIcon /> */}</div>
                </RegularPolygon>
              </DesignContextProvider>
            </div>
          </div>
        </div>
      </Navbar>
    </header>
  )
}
