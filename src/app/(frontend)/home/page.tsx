'use client'

import React from 'react'
import { BaseHouseLayout } from '@/components/templates/house-layout/base-house-layout'
import { FlowerIcon } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/button'
import { BigBloomSection } from './_sections/big-bloom-section'
import { JournalsSection } from './_sections/journals-section'
import { WellgorithmsFeedSection } from './_sections/wellgorithms-feed-section'
import { AiWakeningSection } from './_sections/ai-wakening-section'
import { GreenLanguageSection } from './_sections/green-language-section'
import { GratitonsSection } from './_sections/gratitons-section'
import { InviteSection } from './_sections/invite-section'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { FooterSection } from './_sections/footer-section'
import Link from 'next/link'

const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <DesignContextProvider stroke="#D6ABF6">
      <BaseHouseLayout
        title="The Big Bloom"
        bannerImage="/assets/home/banner.png"
        menuItems={[
          { title: 'flowers', isActive: true },
          { title: 'shadows' },
          { title: 'seasons' },
        ]}
        classNames={{
          logo: 'text-color-2',
        }}
        bodyCardProps={{
          className: 'mt-[335px] bg-gradient-to-b from-[#8657B3] to-[#3E2A55]',
          headerCardProps: {
            strokeWidth: 3,
            className: ' bg-gradient-to-t from-[#38254D] to-[#926BC0]',
          },
        }}
        navRightItems={[
          <FlowerIcon
            className="h-6 w-6"
            fill="rgb(var(--color-10))"
            strokeWidth={2}
            key="icon-1"
          />,
          <FlowerIcon
            className="h-6 w-6"
            fill="rgb(var(--color-10))"
            strokeWidth={2}
            key="icon-2"
          />,
        ]}
        navLeftItems={[
          <FlowerIcon
            className="h-6 w-6"
            fill="rgb(var(--color-10))"
            strokeWidth={2}
            key="icon-1"
          />,
          <FlowerIcon
            className="h-6 w-6"
            fill="rgb(var(--color-10))"
            strokeWidth={2}
            key="icon-2"
          />,
        ]}
        navEndItem={
          <Link href="/login">
            <Button variant="bordered" className="text-accent font-bold text-color-2">
              join us
            </Button>
          </Link>
        }
      >
        <BigBloomSection />
        <JournalsSection />
        <WellgorithmsFeedSection />
        <AiWakeningSection />
        <GreenLanguageSection />
        <GratitonsSection />
        <InviteSection />
        <FooterSection />
      </BaseHouseLayout>
    </DesignContextProvider>
  )
}

interface HomePageProps {}

export default HomePage
