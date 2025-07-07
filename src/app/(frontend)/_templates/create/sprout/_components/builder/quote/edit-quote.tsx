import './editor.scss'
import React from 'react'
import { HouseHexagon } from '@/components/atoms/polygon/house-hexagon'
import { ColorChooser } from './color-chooser'
import Color from 'color'
import { BoxColorIcon, KatexIcon } from '../../icons'
import { BoxSizeDropdown } from './box-size-dropdown'
import { TextSizeSlider } from './text-size-slider'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextStyle } from '@tiptap/extension-text-style'
import { QuoteBlock } from '../types'

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: '| paste your text here.',
  }),
  TextStyle.extend({
    addGlobalAttributes() {
      return [
        {
          types: ['textStyle'],
          attributes: {
            fontSize: {
              default: '32px', // Set default font size
              renderHTML: (attributes) => {
                return attributes.fontSize ? { style: `font-size: ${attributes.fontSize}` } : {}
              },
              parseHTML: (element) => ({
                fontSize: element.style.fontSize,
              }),
            },
          },
        },
      ]
    },
  }),
]

export const EditQuote: React.FC<EditQuoteProps> = ({ quote, onQuoteChanged }) => {
  const editor = useEditor({
    extensions,
    content: quote.content,
    onUpdate: ({ editor }) => {
      onQuoteChanged({ content: editor.getHTML() })
    },
  })

  if (!editor) return null

  return (
    <HouseHexagon
      roofWidth={0.8}
      inverted
      className="min-h-[557px] w-[822px] flex-col justify-start gap-8 bg-[#AF8CD0] p-8 pb-32"
      strokeWidth={0}
    >
      <div className="flex items-stretch gap-8">
        <ColorChooser color="" onColorChange={() => {}}>
          <button className="flex flex-col items-center justify-between gap-2">
            <span className="text-[48px] font-black leading-8">w</span>
            <span className="font-bold text-black">word color</span>
          </button>
        </ColorChooser>
        <ColorChooser
          color={quote.background}
          onColorChange={(background) => onQuoteChanged({ background })}
          isRadial={quote.isRadialGradient}
          onRadialChange={(isRadialGradient) => onQuoteChanged({ isRadialGradient })}
        >
          <button className="flex flex-col items-center justify-between gap-2">
            <BoxColorIcon className="size-[36px] text-[#862C80]" />
            <span className="font-bold text-black">box color</span>
          </button>
        </ColorChooser>
        <BoxSizeDropdown
          layout={quote.layout}
          onLayoutChange={(layout) => onQuoteChanged({ layout })}
        />
        <button className="flex flex-col items-center justify-between gap-2">
          <KatexIcon className="h-[23px] w-[67px] text-black" />
          <span className="font-bold text-black">formula</span>
        </button>
      </div>
      <TextSizeSlider
        fontSize={quote.fontSize ?? 32}
        onFontSizeChange={(fontSize) => onQuoteChanged({ fontSize })}
      />
      <Rectagon
        chamferLength={quote.layout === 'bevel' ? { x: 100, angle: 37.5 } : 0}
        className="quote-editor h-full min-h-[238px] w-full"
        style={{
          background: quote.isRadialGradient
            ? `radial-gradient(circle, ${Color(quote.background).lighten(0.6)}, ${quote.background})`
            : quote.background,
          maxWidth: quote.layout === 'full' ? '100%' : '623px',
        }}
      >
        <EditorContent
          editor={editor}
          className="min-h-[100px] w-full py-[50px] outline-none"
          style={{
            fontSize: `${quote.fontSize ?? 32}px`,
          }}
        />
      </Rectagon>
    </HouseHexagon>
  )
}

interface EditQuoteProps {
  quote: QuoteBlock
  onQuoteChanged: (quote: Partial<QuoteBlock>) => void
}
