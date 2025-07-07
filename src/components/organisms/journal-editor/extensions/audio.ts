import { mergeAttributes, Node } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    audio: {
      setAudio: (src: string) => ReturnType
    }
  }
}

const Audio = Node.create({
  name: 'audio',

  group: 'block',

  atom: true, // Treat it as a single block element

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'audio',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['audio', mergeAttributes(HTMLAttributes, { controls: true }), 0]
  },

  addCommands() {
    return {
      setAudio:
        (src: string) =>
        ({ chain }) => {
          return chain().insertContent(`<audio src="${src}" controls></audio>`).run()
        },
    }
  },
})

export default Audio
