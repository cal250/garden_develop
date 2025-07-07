'use client'

import React, { PropsWithChildren, useCallback, useState } from 'react'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { BodyCard } from '@/components/organisms/body-card/body-card'
import type { Layout } from '@/app/(frontend)/_templates/_context/layout'
import { LayoutProvider } from '@/app/(frontend)/_templates/_context/layout'
import { PageStepsProvider } from '@/app/(frontend)/_templates/_context/page-steps'
import { PageNavigationButtons } from '@/app/(frontend)/_templates/_components/page-navigation-buttons'
import { WordsProvider } from '@/app/(frontend)/_templates/_context/words'

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children, banner }) => {
  const [layout, setLayout] = useState<Layout>({
    background: '/assets/onboarding/onboarding-bg.webp',
    floatingBanner: false,
  })
  const [words, setWords] = useState<Array<string>>(['creativity', 'compost'])

  const updateLayout = useCallback((newLayout: Partial<Layout>) => {
    setLayout((layout) => ({ ...layout, ...newLayout }))
  }, [])

  return (
    <LayoutProvider value={{ layout, updateLayout }}>
      <PageStepsProvider>
        <WordsProvider
          value={{
            words,
            updateWords: (words) =>
              setWords(
                words.splice(words.length - 2).filter((word) => Boolean(word)) as [string, string],
              ),
          }}
        >
          <DesignContextProvider stroke="#5B4883" strokeWidth={4}>
            <div className="flex flex-col w-full min-h-screen h-full max-w-[1440px] mx-auto relative">
              <div
                className="z-0 absolute left-0 top-0 pointer-events-none  flex h-[810px] w-full flex-col bg-cover bg-top bg-no-repeat"
                style={{
                  backgroundImage: `url(${layout.background})`,
                }}
              ></div>
              {banner}
              <main
                className="mt-[505px] flex w-full h-full flex-col items-center"
                style={{
                  zIndex: layout.floatingBanner ? 10 : 30,
                  minHeight: `calc(100dvh - 505px)`,
                }}
              >
                <PageNavigationButtons />
                <BodyCard className="flex-grow w-full justify-start bg-[#100E1A] pb-20" roofWidth={0.65}>
                  {children}
                </BodyCard>
              </main>
            </div>
          </DesignContextProvider>
        </WordsProvider>
      </PageStepsProvider>
    </LayoutProvider>
  )
}

interface LayoutProps {
  banner: React.ReactNode
  children: React.ReactNode
}

export default Layout
