import React from 'react'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { CloseIcon } from '@/components/atoms/icons'
import { AnimatePresence, motion } from 'framer-motion'
import useWindowWidth from '@/hooks/use-window-width'
import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'

export const TutorialVideoPlayer: React.FC<TutorialVideoPlayerProps> = ({ onClose }) => {
  const width = useWindowWidth()
  return (
    <DesignContextProvider stroke="rgb(var(--color-4))" strokeWidth={10}>
      <div
        className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center"
        style={{ zIndex: 100000 }}
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute z-50 left-0 top-0 h-screen w-screen bg-black/50"
          ></motion.div>
          <Rectagon
            className="z-50 h-[500px] sm:h-[650px] md:h-[728px] w-[1273px] bg-color-12 p-[30px] sm:p-10 md:p-[50px]"
            as={motion.div}
            chamferLength={width < 640 ? { x: 50, y: 50 } : { x: 100, y: 100 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            overflow
          >
            <RegularOctagon
              strokeWidth={0}
              polygon={RegularPolygon}
              sides={8}
              className="absolute right-[15px] sm:right-[30px] top-0 aspect-square h-[50px] w-[50px] md:h-[80px] md:w-[80px] -translate-y-1/2 bg-color-2"
            >
              <button
                onClick={onClose}
                className="bg-transparent flex items-center justify-center w-full h-full"
              >
                <CloseIcon
                  className="h-5 md:h-[30px] w-5 md:w-[30px] text-color-2"
                  strokeWidth={5}
                />
              </button>
            </RegularOctagon>
            <iframe
              className="h-full w-full"
              src={'https://www.youtube.com/embed/PfYak0J8t1I'}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Rectagon>
        </AnimatePresence>
      </div>
    </DesignContextProvider>
  )
}

interface TutorialVideoPlayerProps {
  onClose: () => void
}
