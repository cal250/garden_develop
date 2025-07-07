import { mergeAttributes, Node } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (src: string) => ReturnType
    }
  }
}

const Video = Node.create({
  name: 'video',

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
        tag: 'video',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes, { controls: true }), 0]
  },

  addCommands() {
    return {
      setVideo:
        (src: string) =>
        ({ chain, commands }) => {
          if (isYoutubeURL(src)) {
            return commands.setYoutubeVideo({ src, width: 200, height: 100 })
          }
          return chain().insertContent(`<video src="${src}" controls></video>`).run()
        },
    }
  },
})

const extractYouTubeID = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,
  )
  return match ? match[1] : null
}

export function isYoutubeURL(url: string) {
  return extractYouTubeID(url) !== null
}

export default Video
