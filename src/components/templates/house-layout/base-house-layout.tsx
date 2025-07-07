import React, { PropsWithChildren } from 'react'
import { BodyCard, BodyCardProps } from '@/components/organisms/body-card/body-card'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { MainNavbar, MainNavbarProps } from '@/components/organisms/main-navbar/main-navbar'
import { SlotClasses } from '@/components/utils/react/types'
import { twMerge } from 'tailwind-merge'

export interface BaseHouseLayoutProps extends Omit<MainNavbarProps, 'pageHasOctagon'> {
  /**
   * The title to display in the header card
   */
  title: string | [string, string]

  /**
   * The title to display inside the brackets
   */
  bracketTitle?: string

  /**
   * The octagon to display on the banner
   */
  Octagon?: React.ReactNode

  /**
   * The banner image to display in the background
   */
  bannerImage?: string

  classNames?: SlotClasses<'logo' | 'navWrapper'>

  bodyCardProps?: Omit<BodyCardProps, 'title' | 'bracketTitle'>

  secondaryNavbar?: React.ReactNode

  bannerContent?: React.ReactNode

  octagonSize?: string
}

export const BaseHouseLayout: React.FC<PropsWithChildren<BaseHouseLayoutProps>> = ({
  menuItems,
  navLeftItems,
  navRightItems,
  navEndItem,
  title,
  bracketTitle,
  Octagon,
  octagonSize: octagonSizeProp,
  bannerImage = '/assets/house-layout/banner.jpg',
  classNames,
  bodyCardProps,
  ...props
}) => {
  const octagonSize = useResponsiveValue({ base: '95%', sm: '552px' })
  return (
    <div className="relative m-auto flex h-full min-h-screen w-full max-w-[1440px] flex-col overflow-hidden">
      <div
        className="absolute left-0 top-0 pointer-events-none  flex h-full max-h-screen w-full flex-col bg-cover bg-bottom bg-repeat-x"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        {props.bannerContent}
      </div>
      <div className="relative flex flex-col">
        <div className="top-0 z-10 w-full">
          <div className="bg-black/20">
            <MainNavbar
              menuItems={menuItems}
              navEndItem={navEndItem}
              navLeftItems={navLeftItems}
              navRightItems={navRightItems}
              classNames={{ ...classNames, wrapper: classNames?.navWrapper }}
              pageHasOctagon={Boolean(Octagon)}
            />
          </div>
          {props.secondaryNavbar}
        </div>
        {Octagon && (
          <div
            className="absolute top-[120px] aspect-square self-center"
            style={{
              width: octagonSizeProp ?? octagonSize,
              marginTop: `-15px`,
            }}
          >
            {Octagon}
          </div>
        )}
      </div>
      <BodyCard
        title={title}
        bracketTitle={bracketTitle}
        strokeWidth={6}
        {...bodyCardProps}
        className={twMerge(
          'z-30 mt-[405px] h-full min-h-screen w-full flex-1',
          bodyCardProps?.className,
        )}
        headerCardProps={{
          className: 'text-[36px] h-[86px]',
          ...bodyCardProps?.headerCardProps,
        }}
      >
        {props.children}
      </BodyCard>
    </div>
  )
}
