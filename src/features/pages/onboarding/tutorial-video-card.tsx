import React, { useEffect } from 'react'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { YoutubeIcon } from '@/components/atoms/icons'
import useWindowWidth from '@/hooks/use-window-width'
import { TutorialVideoPlayer } from './tutorial-video-player'
import { useResponsiveValue } from '@/hooks/use-responsive-value'

export const TutorialVideoCard: React.FC<TutorialVideoCardProps> = ({
  strokeWidth,
  stroke,
  iconOnly,
}) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false)

  const height = useResponsiveValue({
    base: 233,
    sm: 280,
    md: 387,
  })

  const width = useWindowWidth()

  useEffect(() => {
    document.body.style.overflow = isVideoOpen ? 'hidden' : 'auto'
  }, [isVideoOpen])

  return (
    <div className="w-full relative px-2">
      {iconOnly ? (
        <button onClick={() => setIsVideoOpen(true)} className="w-fit bg-transparent">
          <YoutubeIcon className="h-auto w-8 md:w-10 opacity-80" />
        </button>
      ) : (
        <>
          <Rectagon
            className=" w-[calc(screen-16px)] max-w-[717px] cursor-pointer"
            chamferLength={width < 640 ? { x: 30, y: 30 } : { x: 50, y: 50 }}
            style={{ height: height }}
            overflow={false}
            stroke={stroke}
            strokeWidth={strokeWidth}
            onClick={() => setIsVideoOpen(true)}
          >
            <div className="w-full h-full bg-color-4">
              <img
                src="/assets/onboarding/how-it-works.webp"
                width={717}
                height={387}
                className="mix-blend-luminosity  opacity-50"
              />
            </div>
          </Rectagon>

          <div className="pointer-events-none absolute bottom-0 left-0 flex h-full w-full flex-col gap-4 md:gap-10 items-center justify-center">
            <p className="text-color-2 text-center text-[18px] md:text-[20px] leading-[100%] font-black">
              from words to worlds: <br /> how your ⟨inner⟩Garden grows
            </p>
            <YoutubeIcon className="h-[65px] w-[92px]" />
          </div>
        </>
      )}
      {isVideoOpen && (
        <TutorialVideoPlayer
          onClose={() => {
            setIsVideoOpen(false)
          }}
        />
      )}
    </div>
  )
}

interface TutorialVideoCardProps {
  strokeWidth?: number
  stroke?: string
  iconOnly?: boolean
}
