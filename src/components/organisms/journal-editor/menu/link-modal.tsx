import React from 'react'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/components/atoms/modal'
import { Input } from '@/components/atoms/input'
import { Button } from '@/components/atoms/button'

export type LinkType = 'link' | 'audio' | 'video'

export const LinkModal: React.FC<LinkModalProps> = ({ isOpen, type = 'link', onClose }) => {
  const [url, setUrl] = React.useState('')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          {type === 'link' && 'Insert Link'}
          {type === 'audio' && 'Insert Audio'}
          {type === 'video' && 'Insert Video'}
        </ModalHeader>
        <ModalBody>
          <Input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => onClose()}>Cancel</Button>
          <Button
            onPress={() => {
              onClose(url)
            }}
          >
            Insert
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

interface LinkModalProps {
  type?: LinkType
  isOpen: boolean
  onClose: (url?: string) => void
}
