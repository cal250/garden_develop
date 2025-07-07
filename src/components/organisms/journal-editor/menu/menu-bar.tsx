import React from 'react'
import { useCurrentEditor } from '@tiptap/react'
import { AudioIcon, LinkIcon, VideoIcon } from '@/components/organisms/journal-editor/icons'
import { LinkModal, LinkType } from '@/components/organisms/journal-editor/menu/link-modal'
import { ColorsMenu } from '@/components/organisms/journal-editor/menu/items/colors'
import { FontFamilyMenu } from '@/components/organisms/journal-editor/menu/items/font-family'
import { FontWeightMenu } from '@/components/organisms/journal-editor/menu/items/font-weight'
import { HeadingsMenu } from '@/components/organisms/journal-editor/menu/items/headings'
import { FontSizeMenu } from '@/components/organisms/journal-editor/menu/items/font-sizes'
import { SymbolsMenu } from '@/components/organisms/journal-editor/menu/items/symbols'
import { TextAlignmentMenu } from '@/components/organisms/journal-editor/menu/items/text-alignment'

export const MenuBar: React.FC<MenuBarProps> = (props) => {
  const { editor } = useCurrentEditor()
  const [isLinkModalOpen, setIsLinkModalOpen] = React.useState(false)
  const [linkType, setLinkType] = React.useState<LinkType>()

  if (!editor) {
    return null
  }

  return (
    <div
      style={{
        background: 'linear-gradient(0deg, rgb(var(--color-8)) 0%, rgb(var(--color-8)) 100%)',
      }}
      className="align-center flex h-12 w-full justify-between px-4 text-color-5"
    >
      {isLinkModalOpen && (
        <LinkModal
          isOpen={true}
          type={linkType}
          onClose={(url) => {
            if (url) {
              if (linkType === 'link') {
                editor.chain().focus().setLink({ href: url }).run()
              } else if (linkType === 'video') {
                editor?.commands.setVideo(url)
              } else if (linkType === 'audio') {
                editor?.commands.setAudio(url)
              }
            }
            setIsLinkModalOpen(false)
          }}
        />
      )}
      <div className="flex items-center justify-start gap-2">
        <HeadingsMenu />
        <FontFamilyMenu />
        <FontWeightMenu />
        <FontSizeMenu />
      </div>
      <div className="flex items-center justify-end gap-2">
        <SymbolsMenu />
        <TextAlignmentMenu />
        <ColorsMenu />
        <button
          className="px-1 text-[18px] font-bold"
          onClick={() => {
            editor.chain().focus().toggleBold().run()
          }}
        >
          B
        </button>
        <button
          className="px-1 text-[18px] font-bold italic"
          onClick={() => {
            editor.chain().focus().toggleItalic().run()
          }}
        >
          I
        </button>
        <button
          className="px-1 text-[18px] font-bold underline"
          onClick={() => {
            editor.chain().focus().toggleUnderline().run()
          }}
        >
          U
        </button>
        <button
          className="px-2 text-[18px]"
          onClick={() => {
            setLinkType('audio')
            setIsLinkModalOpen(true)
          }}
        >
          <AudioIcon />
        </button>
        <button
          className="px-2 text-[18px]"
          onClick={() => {
            setLinkType('video')
            setIsLinkModalOpen(true)
          }}
        >
          <VideoIcon />
        </button>
        <button
          className="px-2 text-[18px]"
          onClick={() => {
            if (
              editor.isActive('link') &&
              editor.isActive('link') === editor.isActive('link', { href: '' })
            ) {
              editor.chain().focus().unsetLink().run()
              return
            }
            setIsLinkModalOpen(true)
          }}
        >
          <LinkIcon />
        </button>
      </div>
    </div>
  )
}

interface MenuBarProps {}
