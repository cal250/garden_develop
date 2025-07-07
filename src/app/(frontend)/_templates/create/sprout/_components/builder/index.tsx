import React from 'react'
import { BlockEditor } from './block-editor'
import { WellgorithmBlock } from './types'
import { useListData } from '@react-stately/data'
import { BlockViewer } from './block-viewer'
import { generateId } from '@/components/utils/string'
import { useUniqueId } from '@/hooks/use-unique-id'

const defaultBackground = '#862C80'

export const WellgorithmBuilder: React.FC<WellgorithmBuilderProps> = () => {
  const initialId = useUniqueId()
  const { items, update, selectedKeys, setSelectedKeys, append, remove } = useListData<
    Partial<WellgorithmBlock> & { id: string }
  >({
    initialItems: [
      { id: initialId, background: defaultBackground, layout: 'inline', type: 'journal' },
    ],
    initialSelectedKeys: new Set([initialId]),
  })

  return (
    <div className="flex w-full flex-1 flex-col">
      {items.map((item, index) => {
        const editing = selectedKeys === 'all' || selectedKeys.has(item.id) || !item.type
        return (
          <div key={item.id} className="w-full">
            {editing ? (
              <BlockEditor
                block={item}
                onSaved={() => setSelectedKeys(new Set())}
                onBlockChanged={(updates) => {
                  update(item.id, { ...item, ...updates })
                }}
              />
            ) : (
              <BlockViewer
                block={item as WellgorithmBlock}
                previousBlock={items[index - 1]}
                nextBlock={items[index + 1]}
                canRemove={
                  index === items.length - 2 && selectedKeys.has(items[items.length - 1].id)
                }
                canAdd={index === items.length - 1}
                onRemoveBlock={() => {
                  const last = items[items.length - 1]
                  remove(last.id)
                }}
                onAddBlock={() => {
                  const id = generateId()
                  setSelectedKeys(new Set([id]))
                  append({
                    id,
                    background: defaultBackground,
                    layout: 'inline',
                  })
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

interface WellgorithmBuilderProps {}
