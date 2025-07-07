import React, { useMemo } from 'react'
import { Button } from '@/components/atoms/button'
import { ImageBlock, QuoteBlock, WellgorithmBlock, WellgorithmBlockType } from './types'
import { BlockIcon } from '../icons'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { EditJournal } from './journal/edit-journal'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { EditQuote } from './quote/edit-quote'
import { EditImage } from './image/edit-image'

const blocks = [
  { type: 'journal', label: 'journal' },
  { type: 'quote', label: 'quote' },
  { type: 'image', label: 'image' },
] as const

const BlockChooser: React.FC<BlockChooserProps> = ({ block, onSelected }) => {
  return (
    <DesignContextProvider stroke="#DFBEDD">
      <div className="flex gap-[90px]">
        {blocks.map((b) => (
          <div className="flex flex-col items-center gap-4" key={b.type}>
            <Button
              key={b.type}
              isIconOnly
              polygon={RegularPolygon}
              sides={8}
              style={{
                background:
                  block === b.type
                    ? 'radial-gradient(50% 50% at 50% 50%, #7D6D9E 0%, #2C2738 100%)'
                    : 'linear-gradient(0deg, #8561B1, #8561B1)',
                color: block === b.type ? '#FFF200' : '#5B4883',
              }}
              onClick={() => onSelected(b.type)}
              className="size-[80px]"
            >
              <BlockIcon className="size-[36px]" />
            </Button>
            <span className="text-[20px] font-bold">{b.label}</span>
          </div>
        ))}
      </div>
    </DesignContextProvider>
  )
}

interface BlockChooserProps {
  block?: WellgorithmBlockType
  onSelected: (block: WellgorithmBlockType) => void
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ block, onBlockChanged, onSaved }) => {
  const editor = useMemo(() => {
    switch (block.type) {
      case 'journal':
        return (
          <EditJournal
            content={block.content}
            onContentChange={(content) => onBlockChanged({ content })}
          />
        )
      case 'quote':
        return (
          <EditQuote
            quote={block as QuoteBlock}
            onQuoteChanged={(quote) => onBlockChanged(quote)}
          />
        )
      case 'image':
        return (
          <EditImage
            image={block as ImageBlock}
            onImageChanged={(image) => onBlockChanged(image)}
          />
        )
    }
  }, [block])

  return (
    <div className="my-[80px] flex flex-col items-center gap-[40px]">
      <BlockChooser block={block.type} onSelected={(block) => onBlockChanged({ type: block })} />
      <div className="relative">
        {block.type && (
          <React.Fragment>
            {editor}
            <Button
              className="absolute bottom-0 left-1/2 h-[61px] w-[260px] -translate-x-1/2 translate-y-1/2 bg-color-2"
              polygon={Rexagon}
              strokeWidth={0}
              onPress={onSaved}
            >
              <span className="text-[24px] font-bold text-black">save</span>
            </Button>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

interface BlockEditorProps {
  block: Partial<WellgorithmBlock> & { id: string }
  onBlockChanged: (block: Partial<WellgorithmBlock>) => void
  onSaved: () => void
}
