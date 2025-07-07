'use client'
import { Modal, ModalBody, ModalContent } from '@/components/atoms/modal'
import { Button } from '@/components/atoms/button'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { CloseIcon } from '@/components/atoms/icons'
import React from 'react'
import { useRouter } from 'next/navigation'

const BuilderPage: React.FC = (props) => {
  const [isOpen, setIsOpen] = React.useState(true)
  const router = useRouter()

  return (
    <div>
      <Modal
        classNames={{}}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        closeButton={
          <button style={{ top: -30, right: -30 }}>
            <RegularPolygon
              sides={8}
              className="bg-color-6 size-[65px] p-0 "
              stroke="rgb(var(--color-4))"
            >
              <CloseIcon className="text-white size-[30px]" />
            </RegularPolygon>
          </button>
        }
      >
        <ModalContent
          polygon={Rectagon}
          chamferLength={{ x: 30, y: 30 }}
          stroke="rgb(var(--color-2)) "
          className="bg-[#564A8D]  max-w-[606px]"
          overflow
        >
          <ModalBody className="p-6 h-[192px] gap-8">
            <p className="text-color-2 font-black">
              you need to be a sprouter to create a wellgorithm
            </p>

            <div className="flex items-center justify-center gap-6">
              <Button
                polygon={Rexagon}
                className="bg-color-2 px-4"
                strokeWidth={0}
                onPress={() => {
                  router.push('/templates/create/season')
                }}
              >
                <span className="font-bold text-black">invite me</span>
              </Button>
              <Button
                polygon={Rexagon}
                className="bg-color-2 px-4"
                strokeWidth={0}
                onPress={() => {
                  router.push('/templates/create/season')
                }}
              >
                <span className="font-bold text-black">login</span>
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default BuilderPage
