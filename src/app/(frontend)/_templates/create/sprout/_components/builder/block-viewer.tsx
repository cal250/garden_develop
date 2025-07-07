import React, { useMemo } from 'react'
import { ImageBlock, JournalBlock, QuoteBlock, WellgorithmBlock } from './types'
import { ViewJournal } from './journal/view-journal'
import { Button } from '@/components/atoms/button'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { ViewQuote } from './quote/view-quote'
import { ViewImage } from './image/view-image'

export const BlockViewer: React.FC<BlockViewerProps> = ({
  block,
  onAddBlock,
  onRemoveBlock,
  canRemove,
  canAdd,
  previousBlock,
  nextBlock,
}) => {
  const width = 822

  const viewer = useMemo(() => {
    switch (block.type) {
      case 'journal':
        return (
          <ViewJournal
            journal={block as JournalBlock}
            previousBlock={previousBlock}
            nextBlock={nextBlock}
            width={width}
          />
        )
      case 'quote':
        return <ViewQuote quote={block as QuoteBlock} width={width} />
      case 'image':
        return <ViewImage image={block as ImageBlock} width={width} />
    }
  }, [block, previousBlock, nextBlock])

  return (
    <div className="relative flex-1">
      <div className="flex flex-col items-center justify-stretch">{viewer}</div>
      {(canAdd || canRemove) && (
        <Button
          polygon={RegularPolygon}
          sides={8}
          stroke={'#FFF200'}
          strokeWidth={4}
          style={{
            transform: `translate(-50%, 50%) ${canRemove ? 'rotate(45deg)' : ''} `,
          }}
          onPress={canRemove ? onRemoveBlock : onAddBlock}
          className="absolute bottom-0 left-1/2 size-[85px] bg-[#8858B5] p-0"
        >
          <span className="text-[36px] font-bold text-[#FFF200]">+</span>
        </Button>
      )}
    </div>
  )
}

interface BlockViewerProps {
  block: WellgorithmBlock
  canRemove?: boolean
  canAdd?: boolean
  onAddBlock: () => void
  onRemoveBlock: () => void
  previousBlock?: Partial<WellgorithmBlock>
  nextBlock?: Partial<WellgorithmBlock>
}
