import { StarterKit } from '@tiptap/starter-kit'
import { FontFamily } from '@tiptap/extension-font-family'
import { TextStyle } from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Link } from '@tiptap/extension-link'
import { Color } from '@tiptap/extension-color'
import FontSize from '@tiptap/extension-font-size'
import {
  ExtendedHeading,
  ExtendedParagraph,
} from '@/components/organisms/journal-editor/extensions/classes'
import Video from '@/components/organisms/journal-editor/extensions/video'
import Audio from '@/components/organisms/journal-editor/extensions/audio'
import { Youtube } from '@tiptap/extension-youtube'

export const extensions = [
  StarterKit.configure({
    heading: false,
  }),
  FontFamily,
  TextStyle,
  Underline,
  TextAlign,
  FontSize,
  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true,
  }),
  Color,
  ExtendedParagraph,
  ExtendedHeading,
  Youtube,
  Video,
  Audio,
]
