import React, { useEffect } from 'react'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { Image } from '@/components/atoms/image'
import { LeftBracketIcon, RightBracketIcon, YoutubeIcon } from '@/components/atoms/icons'
import BracketedText from '@/components/molecules/bracketed-text/bracketed-text'
import { NewVideoPlayer } from './new-video-player'
import useWindowWidth from '@/hooks/use-window-width'

export const NewVideoCard: React.FC<NewVideoCardProps> = ({ strokeWidth, stroke }) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false)

  const width = useWindowWidth()

  useEffect(() => {
    document.body.style.overflow = isVideoOpen ? 'hidden' : 'auto'
  }, [isVideoOpen])

  return (
    <div className="relative mt-[41px]">
      <Image
        polygon={Rectagon}
        className="relative h-auto w-full max-w-[1196px] cursor-pointer"
        stroke={stroke}
        strokeWidth={strokeWidth}
        onClick={() => setIsVideoOpen(true)}
        width={1196}
        height={703}
        isZoomed
        src="/assets/home/video-card-bg.png"
        chamferLength={{
          topLeft:
            width < 640
              ? { x: 70, angle: 30 }
              : width < 1024
                ? { x: 100, angle: 34 }
                : { x: 120, angle: 37.5 },
          topRight:
            width < 640
              ? { x: 70, angle: 30 }
              : width < 1024
                ? { x: 100, angle: 34 }
                : { x: 120, angle: 37.5 },
          bottomLeft:
            width < 640
              ? { x: 150, angle: 30 }
              : width < 1024
                ? { x: 300, angle: 34 }
                : { x: 400, angle: 37.5 },
          bottomRight:
            width < 640
              ? { x: 150, angle: 30 }
              : width < 1024
                ? { x: 300, angle: 34 }
                : { x: 400, angle: 37.5 },
        }}
      ></Image>
      <div className="pointer-events-none absolute bottom-0 left-0 flex h-full w-full flex-col gap-10 md:gap-[70px] items-center justify-center">
        <div className="flex flex-col gap-0 items-center">
          <BracketedText
            outerText="explore the"
            classNames={{
              outerText: 'text-color-2 text-[22px] md:text-[32px] font-semibold',
            }}
          />
          {/* <BracketedText
            outerText="Verse"
            className="text-white text-[30px] md:text-[42px] md:leading-[51.2px] font-black"
            classNames={{
              outerText: 'text-color-2 text-[30px] md:text-[42px] md:leading-[51.2px] font-black',
              brackets:
                'text-[33px] md:text-[45px] md:leading-[54.86px] text-color-2 tracking-[0.05em] font-black',
            }}
          >
            inner
          </BracketedText> */}

          {/* <h1 className="text-white text-[30px] md:text-[42px] md:leading-[51.2px] font-black">
            <span className="text-[33px] md:text-[45px] md:leading-[54.86px] text-color-2 tracking-[0.05em]">
              ⟨
            </span>
            inner
            <span className="text-[33px] md:text-[45px] md:leading-[54.86px] text-color-2 tracking-[0.05em]">
              ⟩
            </span>
            <span className="text-color-2">Verse</span>
          </h1> */}

          <div className=" items-center gap-0 flex">
            <LeftBracketIcon
              className="h-[30px] md:h-[40px] w-[14px] md:w-[18px]"
              fill="rgb(var(--color-2))"
              strokeWidth={2}
            />
            <p className="text-white text-[30px] md:text-[42px] md:leading-[51.2px] font-black">
              inner
            </p>
            <RightBracketIcon
              className="h-[30px] md:h-[40px] w-[14px] md:w-[18px]"
              fill="rgb(var(--color-2))"
              strokeWidth={2}
            />
            <p className="text-color-2 text-[30px] md:text-[42px] md:leading-[51.2px] font-black">
              Verse
            </p>
          </div>
        </div>
        <YoutubeIcon className="h-auto w-[157px]" />
        <p className="max-w-[533px] px-3 text-center text-[18px] sm:text-[20px] md:text-[22px] font-bold">
          We’re entering a new era of <span className="text-color-2">spatial psychology</span>,
          where dreams come alive in 3D landscapes. You can now see, spin, and sprout your thoughts,
          and even do XBT — Expanded Behavioral Therapy.
        </p>
      </div>
      {isVideoOpen && (
        <NewVideoPlayer
          onClose={() => {
            setIsVideoOpen(false)
          }}
        />
      )}
    </div>
  )
}

interface NewVideoCardProps {
  strokeWidth?: number
  stroke?: string
}
