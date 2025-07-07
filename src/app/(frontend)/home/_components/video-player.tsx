import React from 'react'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { Button } from '@/components/atoms/button'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { CloseIcon } from '@/components/atoms/icons'
import { AnimatePresence, motion } from 'framer-motion'

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ onClose }) => {
  return (
    <DesignContextProvider stroke="#FFF200" strokeWidth={10}>
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
            className="absolute left-0 top-0 pointer-events-none  h-full w-full bg-black/50"
          ></motion.div>
          <Rectagon
            className="h-[728px] w-[1273px] bg-black p-[50px]"
            as={motion.div}
            chamferLength={{ x: 100, y: 100 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            overflow
          >
            <Button
              className="absolute right-[30px] top-0 aspect-square h-[80px] w-[80px] -translate-y-1/2 bg-[#FFF200]"
              onClick={onClose}
              strokeWidth={0}
              polygon={RegularPolygon}
              sides={8}
            >
              <CloseIcon className="h-[30px] w-[30px] text-[#9D68A0]" strokeWidth={5} />
            </Button>
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/piJkuavhV50`}
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

interface VideoPlayerProps {
  onClose: () => void
}
