'use client'
import { TutorialVideoCard } from '@/features/pages/onboarding/tutorial-video-card'

export default function LoginLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid w-full max-w-[1440px] grid-rows-[auto_1fr]">
      <header className="z-20 flex pb-3 fixed justify-between md:justify-start top-0 h-[calc(var(--navbar-height)+60px)] w-full items-end gap-6  bg-color-12/65 px-4 md:px-8 max-w-[1440px]">
        <div className="w-full md:w-fit flex gap-2 items-center justify-between md:justify-start">
          <TutorialVideoCard iconOnly />
        </div>
      </header>

      {children}
    </div>
  )
}
