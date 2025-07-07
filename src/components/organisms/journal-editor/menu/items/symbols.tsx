import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, IntegralIcon } from '@/components/atoms/icons'
import { useCurrentEditor } from '@tiptap/react'

export const SymbolsMenu: React.FC<SymbolsMenuProps> = (props) => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          editor.chain().focus().insertContent('∫').run()
        }}
      >
        <IntegralIcon className="h-[23px]" />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().insertContent('⟨').run()
        }}
      >
        <ChevronLeftIcon className="h-[23px]" />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().insertContent('⟩').run()
        }}
      >
        <ChevronRightIcon className="h-[23px]" />
      </button>
    </div>
  )
}

interface SymbolsMenuProps {}
