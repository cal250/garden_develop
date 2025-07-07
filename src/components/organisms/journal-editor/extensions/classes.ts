import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'

const classAttributes = {
  class: {
    default: null,
    parseHTML: (element: any) => element.getAttribute('class'),
    renderHTML: (attributes: any) => {
      return {
        class: attributes.class,
      }
    },
  },
}

export const ExtendedHeading = Heading.extend({
  addAttributes() {
    return {
      ...classAttributes,
    }
  },
})

export const ExtendedParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...classAttributes,
    }
  },
})
